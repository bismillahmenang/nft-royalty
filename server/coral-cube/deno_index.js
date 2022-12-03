import {App, Deta} from 'npm:deta@latest'
import express from 'npm:express@latest'
import axios from "npm:axios@latest"
import cors from "npm:cors@latest"
const app = express()
const deta = Deta('c08piu78_Ho49cFbttrmc1vHW59rM89F6duMjCjh2')

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
    let ter
    if (allItems.length === 0) {
      const po = await getData(updateAuthority, symbol)
      ter = po.length > 0 ? po.filter(({mint}) => mint === mintAddress) : []
    } else {
      ter = allItems
    }

    return res.json(ter)
  } catch (e) {
    return res.json(e.message)
  }

})

async function getData(updateAuthority, symbol, before) {
  const {data} = await axios.get(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?update_authority=${updateAuthority}&collection_symbol=${symbol}${before ? "&before=" + before : ""}`)
  return data
}

//app.lib.cron(async () => {
//  let ress = await collectionList.fetch({})
//  let allItems = ress.items
//
//  // continue fetching until last is not seen
//  while (ress.last) {
//    ress = await collectionList.fetch({}, {last: ress.last})
//    allItems = allItems.concat(ress.items)
//
//  }
//  if (ress.length === 0) return
//  for (let i = 0; i < allItems.length; i++) {
//    let check = await royalty.fetch({collectionName: allItems[i].symbol})
//    const data = await getData(allItems[i].updateAuthority, allItems[i].symbol)
//    let data2 = data
//    if (check.length === 0) {
//      while (data2.length > 0) {
//        const date = data[data.length - 1].time
//        data2 = await getData(allItems[i].updateAuthority, allItems[i].symbol, date)
//        if (data2.length > 0) {
//          data.concat(data2)
//          break
//        }
//      }
//      data.forEach(async (item) => {
//        const {signature} = item
//        await royalty.put({...item, collectionName: allItems[i].symbol}, signature)
//      })
//    } else {
//      data.forEach(async (item) => {
//        const {signature} = item
//        await royalty.put({...item, collectionName: allItems[i].symbol}, signature)
//      })
//    }
//
//  }
//  return ress.length
//})
app.listen(3000);
console.log("listening on http://localhost:3000/");
//module.exports = app