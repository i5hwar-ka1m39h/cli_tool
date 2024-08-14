#!/usr/bin/env node


const {program} = require('commander');
const pkg = require('../package.json');
const { default: axios } = require('axios');

program.version(pkg.version)

const main = async() =>{
    const response = await axios.get("https://api.coincap.io/v2/assets")
    console.log(response.data.data[0]);
    
    
}

program.command('set').description('sets the command for something').action(async()=>main())







program.parse(process.argv)