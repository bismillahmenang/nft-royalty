const {App, Deta} = require('deta')
const express = require('express')
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




module.exports = app