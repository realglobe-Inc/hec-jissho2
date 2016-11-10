#!/usr/bin/env node
/**
 * Build docker image.
 */

const { execSync } = require('child_process')
const pkg = require('../../package.json')

process.chdir(__dirname + '/../..')

execSync('npm run compile', { stdio: 'inherit' })
execSync(`docker build --force-rm=true --no-cache=true -t realglobe-docker-virtual.jfrog.io/${pkg.name}:latest .`, {stdio: 'inherit'})
