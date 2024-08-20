#!/usr/bin/env node


const {program} = require('commander');
const pkg = require('../package.json');
const { default: axios } = require('axios');
const colors = require('colors')

program.version(pkg.version)



const getTop = async() =>{
    const response = await axios.get("https://api.coincap.io/v2/assets")
    let data = response.data.data;

    console.log("Top 5 Cryptocurrencies:");
    console.log("--------------------------------------------------");
    console.log("Name".padEnd(15) + "Symbol".padEnd(10) + "Price (USD)");
    console.log("--------------------------------------------------");

    data.slice(0,5).map(each=>{
        const name =colors.green( each.name.padEnd(15))
        const symbol = colors.blue( each.symbol.padEnd(10))
        const price = colors.cyan( each.priceUsd)
        console.log(`${name}${symbol}${price}`);
        
    })

    console.log("--------------------------------------------------");

    
    
}

program.command('get').description('gets the top 5 cryptocurrency infomation').action(async()=>getTop())







program.parse(process.argv)