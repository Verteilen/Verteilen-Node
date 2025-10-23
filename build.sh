#!/bin/bash

if [ "$1" = "--publish" ]; then

echo "publish mode"
version=$(ts-node scripts/getversion.ts)
echo "version:" ${version}
docker tag e87870823/verteilen-node ghcr.io/verteilen/verteilen-node:${version}
docker push ghcr.io/verteilen/verteilen-node:${version}

else

echo "build mode"

docker build -t e87870823/verteilen-node -f ./deploy.Dockerfile . --progress=plain
read -p "Press enter to continue"

fi;