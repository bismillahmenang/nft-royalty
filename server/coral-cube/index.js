const {App, Deta} = require('deta')
const express = require('express')
const axios = require("axios")
const app = App(express())
const deta = Deta('c08piu78_Ho49cFbttrmc1vHW59rM89F6duMjCjh2')
const cors = require("cors")
app.use(cors())
app.use(express.json())
// This how to connect to or create a database.
const collectionList = deta.Base('collection_list')
const royalty = deta.Base('royalty')
app.post('/coral', async (req, res) => {
  try {
    const {updateAuthority, symbol, mintAddress} = req.body
    await collectionList.put({updateAuthority, symbol}, updateAuthority)
    let ress = await royalty.fetch({mint: mintAddress, collectionName: symbol})
    let allItems = ress.items

    // continue fetching until last is not seen
    while (ress.last) {
      ress = await royalty.fetch({mint: mintAddress, collectionName: symbol}, {last: ress.last})
      allItems = allItems.concat(ress.items)
    }
    return res.json(allItems)
  } catch (e) {
    return res.json(e.message)
  }

})

function setTimeToZero(timestamp) {
    // Parse the timestamp string using the Date object
    var date = new Date(timestamp);

    // Set the hours, minutes, and seconds to 0 using the setUTCHours, setUTCMinutes, and setUTCSeconds methods
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);

    // Convert the date back to a string in ISO format using the toISOString method
    return encodeURIComponent(date.toISOString().replace(".000Z", ""));
}
async function getData(updateAuthority, symbol, before) {
    //    console.log(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?limit=10&update_authority=${updateAuthority}&collection_symbol=${symbol}${before ? "&before=" + before : ""}`)
    const {data} = await axios.get(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?update_authority=${updateAuthority}&collection_symbol=${symbol}${before ? "&before=" + setTimeToZero(before) : ""}`)
    //    console.log(data)
    return data
}
async function cobaCron(){
    let ress = await collectionList.fetch({})
    let allItems = ress.items


    // continue fetching until last is not seen
    while (ress.last) {
        ress = await collectionList.fetch({}, {last: ress.last})
        allItems = allItems.concat(ress.items)

    }
    allItems=allItems.filter(({updateAuthority,symbol})=>updateAuthority&&symbol)

    if (allItems.length === 0) return
    for (let i = 0; i < allItems.length; i++) {
         let data = await getData(allItems[i].updateAuthority, allItems[i].symbol)
        let data2 = data



            while (data2.length > 0) {
                const date = data2[data2.length - 1].time
                console.log(setTimeToZero(date))

                data2 = await getData(allItems[i].updateAuthority, allItems[i].symbol, date)

                if (data2.length > 0) {
                    data=data.concat(data2)

                }else{
                    break;
                }
            }

            data.forEach(async (item) => {
                const {signature} = item
                await royalty.put({...item, collectionName: allItems[i].symbol}, signature)
            })


    }
    return ress.length
}
app.lib.cron(async () => {
await cobaCron()
})

module.exports = app