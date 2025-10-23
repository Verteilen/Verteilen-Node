#!/usr/bin/env node
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const verteilen_core_1 = require("verteilen-core");
const worker_download_1 = require("./worker_download");
let client = undefined;
if ((_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.npm_lifecycle_script) === null || _b === void 0 ? void 0 : _b.includes('ts-node')) {
    process.env.NODE_ENV = 'development';
}
const messager = (msg, tag) => {
    const str = tag != undefined ? `[${tag}] ${msg}` : `[Node Info] ${msg}`;
    console.log(str);
};
const messager_log = (msg, tag, meta) => {
    const str = tag != undefined ? `[${tag}] ${msg}` : `[Node Info] ${msg}`;
    console.log(str);
    if (client == undefined)
        return;
    if (client.clients.length > 0) {
        const h = { data: msg };
        const d = { name: 'feedback_message', data: h, meta: meta };
        client.clients.forEach(x => x.send(JSON.stringify(d)));
    }
};
(0, worker_download_1.checker)().then(() => {
    console.log("dir: " + process.cwd());
    client = new verteilen_core_1.Client.Client(messager, messager_log);
    client.Init();
});
