//	6fd66ba2-d834-4604-a08d-03163629a599
// https://rpc.helius.xyz/?api-key=6fd66ba2-d834-4604-a08d-03163629a599
//0dec5037-f67d-4da8-9eb6-97e2a09ffe9a
//https://api.coralcube.cc/><API_KEY>/inspector/getMintActivities
import axios from 'axios';
export async function getNFTDetailFromHelius(nftAddress){
    const url = "https://api.helius.xyz/v0/tokens/metadata?api-key=6fd66ba2-d834-4604-a08d-03163629a599"
    const nftAddresses = [
        nftAddress
    ]
    const { data } = await axios.post(url, { mintAccounts: nftAddresses})
    return data;
}