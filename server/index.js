const { App,Deta } = require('deta');
const express = require('express');
const axios=require("axios")
const app = App(express());
const deta = Deta('c08piu78_Ho49cFbttrmc1vHW59rM89F6duMjCjh2');

// This how to connect to or create a database.
const collectionList = deta.Base('collection_list');
const royalty = deta.Base('royalty');
app.post('/coral', async(req, res) => {
    const {updateAuthority,symbol,mintAddress}=req.body;
    await collectionList.put({updateAuthority,symbol},updateAuthority);
    let ress = await royalty.fetch({mint:mintAddress,collectionName:symbol});
    let allItems = ress.items;

    // continue fetching until last is not seen
    while (ress.last){
        ress = await royalty.fetch({mint:mintAddress,collectionName:symbol}, {last: ress.last});
        allItems = allItems.concat(ress.items);
    }
    let ter;
    if(ress.length===0){
        ter=await getData(updateAuthority,symbol)
        ter=ter.length>0?ter.filter(({mint})=>mint===mintAddress):[];
    }else{
        ter=ress;
    }

    res.json(ter);
});
async function getData(updateAuthority,symbol,before){
    const {data}=await axios.get(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?update_authority=${updateAuthority}&collection_symbol=${symbol}${before?"&before="+before:""}`);
    return data;
}
app.lib.cron(async () => {
    let ress = await collectionList.fetch({});
    let allItems = ress.items;

    // continue fetching until last is not seen
    while (ress.last){
        ress = await collectionList.fetch({}, {last: ress.last});
        allItems = allItems.concat(ress.items);
    }
    return 'Hello Deta, I am a cron job';
});

module.exports = app;