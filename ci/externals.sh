#!/bin/sh

cd `dirname $0`/..

mkdir -p server/public/js
cat ci/config/externals.txt | xargs -Ixxx cp node_modules/xxx/dist/xxx.min.js server/public/js/
