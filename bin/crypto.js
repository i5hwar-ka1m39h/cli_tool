#!/usr/bin/env node


const {program} = require('commander');
const pkg = require('../package.json');
const { default: axios } = require('axios');
const colors = require('colors');
const  coinData  = require('../constant');

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

const getCoin = async(coin) =>{
    const coinId = coinData[coin.toUpperCase()]

    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinId}`)
    let data = response.data.data;

    console.log("--------------------------------------------------");
    console.log(`${coinId} `.yellow + 'info');
    console.log("--------------------------------------------------");

    console.log('symbol:'.padEnd(15)+`${data.symbol}`.blue + '\n' +
        'rank:'.padEnd(15) + `${data.rank}`.red + '\n' +
        'price:'.padEnd(15) + `$ `.green+ `${data.priceUsd}` + '\n' 



    );

    
    
    
    
}

program
    .command('get')
    .description('gets the top 5 cryptocurrency infomation')
    .option('--coin <symbol>', 'get individual coin info')
    .action(async(cmd)=>{
        if(cmd.coin){
            await getCoin(cmd.coin)
        }else{
            await getTop()
        }
    })









program.parse(process.argv)