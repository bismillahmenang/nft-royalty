import axios from 'axios'

export async function getNFTDetailFromHelius(nftAddress) {
  const url = "https://api.helius.xyz/v0/tokens/metadata?api-key=6fd66ba2-d834-4604-a08d-03163629a599"
  const nftAddresses = [
    nftAddress
  ]
  const {data} = await axios.post(url, {mintAccounts: nftAddresses})
  return data
}


export async function getNFTDetailSolscan(nftAddress){
    const res=await fetch(`https://public-api.solscan.io/nft/detail?mint=${nftAddress}`)
    return res.json()
}
export async function getNFTMetadataSolscan(nftAddress){
    const res=await fetch(`https://api.solscan.io/token/meta?token=${nftAddress}`)
    return res.json()

}
export async function getNFTRoyalty(updateAuthority, symbol) {
  const res = await fetch(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?update_authority=${updateAuthority}&collection_symbol=${symbol.toLowerCase()}`)
  return res.json()
}

export async function getNFTRoyaltyFromDeta(updateAuthority, symbol,mintAddress){
    const res = await fetch('https://clggjw.deta.dev/coral', {
        method: 'POST',
        body: JSON.stringify({
            updateAuthority, symbol:symbol.toLowerCase().split(" ").join(" ","_"),mintAddress
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return res.json()
}
export async function getNFTUpdateAuthorityAndCollectionName(nftAddress) {
    const res = await fetch(`https://api.solscan.io/account?address=${nftAddress}`)
    const data=await res.json();
    const res2 = await fetch(`https://api.solscan.io/account?address=${data.data.metadata.collection.key}`)
    const data2=await res2.json();
    return {updateAuthority:data.data.metadata.updateAuthority,collectionName:data2.data.metadata.data.name,image:data.data.metadata.data.uri}
}
export async function getNFTCollectionId(collectionAddress) {
    const res = await fetch(`https://api.solscan.io/nft/detail?mint=${collectionAddress}`)
    const data=await res.json();

    return {collectionId:data.data.collectionId,collectionName:data.data.collection}
}

export async function getImageFromURI(uri){
    const res = await fetch(uri)
    const data=await res.json();
    return data.image
}

