//	6fd66ba2-d834-4604-a08d-03163629a599
// https://rpc.helius.xyz/?api-key=6fd66ba2-d834-4604-a08d-03163629a599
//0dec5037-f67d-4da8-9eb6-97e2a09ffe9a
//https://api.coralcube.cc/><API_KEY>/inspector/getMintActivities

//Key Id: 3LPWKhLjfpbK2XH
//Secret Key: K7q7grMBsMhC4v3
import axios from 'axios'


export async function getNFTDetailFromHelius(nftAddress) {
  const url = "https://api.helius.xyz/v0/tokens/metadata?api-key=6fd66ba2-d834-4604-a08d-03163629a599"
  const nftAddresses = [
    nftAddress
  ]
  const {data} = await axios.post(url, {mintAccounts: nftAddresses})
  return data
}
export async function getNFTCollectionName(nftAddress) {
    const url = `https://api.blockchainapi.com/third-party-apis/2d9UPbepdAmCwqJ5cExy/v0.0.1/utility/getNFTCollection`

    const {data} = await axios.post(url,{mint_address:   nftAddress},{headers: {
        'APIKeyID': "3LPWKhLjfpbK2XH",
        'APISecretKey': "K7q7grMBsMhC4v3"
    }})
    return data
}

export async function getNFTDetailSolscan(nftAddress){
    const res=await fetch(`https://api.solscan.io/nft/detail?mint=${nftAddress}`)
    return res.json()
}
export async function getNFTMetadataSolscan(nftAddress){
    const res=await fetch(`https://public-api.solscan.io/token/meta?tokenAddress=${nftAddress}`)
    return res.json()

}
export async function getNFTRoyalty(updateAuthority, symbol) {
  const res = await fetch(`https://api.coralcube.cc/0dec5037-f67d-4da8-9eb6-97e2a09ffe9a/inspector/getMintActivities?update_authority=${updateAuthority}&collection_symbol=${symbol.toLowerCase()}&limit=1`)
  return res.json()
}

