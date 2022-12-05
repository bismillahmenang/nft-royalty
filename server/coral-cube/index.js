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
    const {updateAuthority, symbol, last} = req.body
    await collectionList.put({updateAuthority, symbol}, updateAuthority)
      let ress={items:[]}
      if(!last){
          ress = await royalty.fetch({ collectionName: symbol})
      }else{
          ress = await royalty.fetch({ collectionName: symbol}, {last})
      }


    return res.json(ress)
  } catch (e) {
      return res.json({items:[]})
  }

})




module.exports = app