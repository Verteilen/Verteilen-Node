import Chalk from 'chalk'
import { existsSync } from 'fs';
import { rmdir, mkdir } from 'fs/promises'
import * as Path from 'path'
import * as pkg from 'pkg'
import * as util from './utility';

async function Clean_Node_Build(){
    if(existsSync(Path.join(__dirname, '..', 'build', 'node-build'))){
        await rmdir(Path.join(__dirname, '..', 'build', 'node-build'), {recursive: true})
    }
    return mkdir(Path.join(__dirname, '..', 'build', 'node-build'))
}

async function PKG_Node(){
    const exePath = Path.join(__dirname, '..', 'build', 'node-build', 'app.exe');
    const programPath = Path.join(__dirname, '..', 'build', 'node', 'index.js');
    return pkg.exec(["-d", "-t", "node16-x64", "-o", exePath, "--public-packages", "*", programPath])
}

async function main(){
    let arg: undefined | 'docker' | 'package' = undefined
    process.argv.forEach(element => {
        if(element == "docker") arg = 'docker'
        if(element == "package") arg = 'package'
    });

    util.Clean_Node()

    await util.Share_Call()

    await util.Build_Program()
    if(arg != 'package'){
        await util.PKG_Program(arg == 'docker' ? 'linux' : '')
    }
    console.log(Chalk.greenBright('Program successfully transpiled!'));

    await util.Build_Node()
    if(arg != 'package'){
        await util.Copy_Worker2Node()
    }
    await util.Copy_PackageJson2Node()

    if(process.argv.includes('--pkg')){
        await Clean_Node_Build()
        await PKG_Node()
        await util.Copy_Worker2NodeBuild()
        await util.Copy_PackageJson2NodeBuild()
    }
}

if (require.main === module) {
    main();
}