import { Deta} from 'npm:deta@latest'
import axios from "npm:axios@latest"

const deta = Deta('c08piu78_Ho49cFbttrmc1vHW59rM89F6duMjCjh2')


// This how to connect to or create a database.
const collectionList = deta.Base('collection_list')
const royalty = deta.Base('royalty')
async function cobaCron(){
    let ress = await collectionList.fetch({})
    let allItems = ress.items


    // continue fetching until last is not seen
    while (ress.last) {
        ress = await collectionList.fetch({}, {last: ress.last})
        allItems = allItems.concat(ress.items)

    }
    allItems=allItems.filter(({updateAuthority,symbol})=>updateAuthority&&symbol)
    console.log(allItems)
    if (allItems.length === 0) return
    for (let i = 0; i < allItems.length; i++) {
        let check = await royalty.fetch({collectionName: allItems[i].symbol})
        const data = await getData(allItems[i].updateAuthority, allItems[i].symbol)
        let data2 = data
        if (check.items.length === 0) {

            while (data2.length > 0) {
                const date = data[data.length - 1].time
                console.log(date)
                data2 = await getData(allItems[i].updateAuthority, allItems[i].symbol, date)
                if (data2.length > 0) {
                    data.concat(data2)

                }else{
                    break;
                }
            }

            data.forEach(async (item) => {
                const {signature} = item
                await royalty.put({...item, collectionName: allItems[i].symbol}, signature)
            })
        } else {
            console.log(data.length)
            data.forEach(async (item) => {
                const {signature} = item
                await royalty.put({...item, collectionName: allItems[i].symbol}, signature)
            })
        }

    }
    return ress.length
}
//cobaCron()
async function getData(updateAuthority, symbol, before) {
    console.log(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?limit=10&update_authority=${updateAuthority}&collection_symbol=${symbol}${before ? "&before=" + before : ""}`)
    const {data} = await axios.get(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?limit=10&update_authority=${updateAuthority}&collection_symbol=${symbol}${before ? "&before=" + before : ""}`)
    
    return data
}
getData("yootn8Kf22CQczC732psp7qEqxwPGSDQCFZHkzoXp25", "y00ts", "2022-12-02T20:36:01+00:00")
