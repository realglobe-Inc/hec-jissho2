#!/bin/sh

cd `dirname $0`/..

cat ci/config/externals.txt | xargs -Ixxx cp node_modules/xxx/dist/xxx.min.js public/js/
