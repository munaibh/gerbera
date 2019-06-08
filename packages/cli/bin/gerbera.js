#!/usr/bin/env node

const rawArgs = process.argv
const splicedArgs = rawArgs.slice(2)
const initService = require('../commands/index.js')

initService(splicedArgs, rawArgs)