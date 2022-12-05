<template>
    <v-container class="d-flex align-center flex-column w-auto mx-lg-n16">
        <v-progress-circular
                indeterminate
                color="primary"
                v-if="loading && NFTId.trim().length <= 0"
        ></v-progress-circular>
        <div class="text-subtitle-2" v-if="NFTId.trim().length <= 0 && loading === false">No NFT Found</div>

        <v-card
                class="my-2"
                width="400"
                v-if="NFTId.trim().length > 0"
        >
            <template v-slot:title>
                NFT ID
            </template>
            <template v-slot:text>
                <a :href="`https://solscan.io/account/${ NFTId }`" target="_blank">{{ NFTId }}</a>
            </template>

        </v-card>
        <v-card
                class="my-2"
                width="400"
                v-if="NFTId.trim().length > 0"
        >
            <template v-slot:title>
                NFT Name
            </template>
            <template v-slot:text>
                {{ NFTMetadata.data.name }}
            </template>

        </v-card>
        <v-card
                class="my-2"
                width="400"
                v-if="NFTId.trim().length > 0"
        >
            <template v-slot:title>
                Last Buyer
            </template>
            <template v-slot:text>
                <a :href="`https://solscan.io/account/${ royalty.buyer }`" target="_blank">{{ royalty.buyer }}</a>
            </template>

        </v-card>
        <v-card
                class="my-2"
                width="400"
                v-if="NFTId.trim().length > 0"
        >
            <template v-slot:title>
                Last Sales Royalty
            </template>
            <template v-slot:text>
            {{ lastSalesRoyalty }} SOL
            </template>

        </v-card>
    <v-card
    class="my-2"
    width="400"
    v-if="NFTId.trim().length > 0"
    >
    <template v-slot:title>
    Last Sales Date
    </template>
    <template v-slot:text>
    {{date}}
    </template>

    </v-card>

        <v-btn :disabled="loading" class="mt-2" color="secondary" rounded="lg" @click="checkNFT">
            Check NFT
        </v-btn>
        <div>
            <v-btn class="mt-2 w-full" color="secondary" @click="openTab" rounded="lg"
            >
                Search NFT
            </v-btn>
        </div>

    </v-container>
</template>
<script setup>
import { ref} from "vue"
import {getNFTMetadataSolscan, getNFTRoyalty,  getNFTUpdateAuthorityAndCollectionName,getNFTRoyaltyFromDeta} from "../../services"
import {getNFTIdFromURL,lamportsToSol,sortDate,ISOdateToReadable} from "../../utils"

const NFTId = ref("")
const NFTMetadata = ref({})
const loading = ref(false)
const royalty = ref({})
const lastSalesRoyalty=ref(0)
const date=ref("")


async function checkNFT() {
  loading.value = true
  let queryOptions = {active: true, currentWindow: true}
  let [tab] = await chrome.tabs.query(queryOptions)

  chrome.tabs.sendMessage(
    tab.id,
    {color: "#00FF00"},
    async function (response) {
      try {

        const tempNFTId = getNFTIdFromURL(response.domain)
      if(localStorage.getItem(tempNFTId)){
      const {NFTId:a,NFTMetadata:b,royalty:c,lastSalesRoyalty:d}=JSON.parse(localStorage.getItem(tempNFTId))
      NFTId.value = a
      NFTMetadata.value = b
      royalty.value = c
      lastSalesRoyalty.value=d
      }
      const {updateAuthority, collectionName} = await getNFTUpdateAuthorityAndCollectionName(tempNFTId)
        const NFTMetadata2 = await getNFTMetadataSolscan(tempNFTId)

        NFTId.value = tempNFTId
        NFTMetadata.value = NFTMetadata2

      let _royaltyData = await getNFTRoyaltyFromDeta(updateAuthority, collectionName, NFTId.value)
      if (_royaltyData.items.length === 0) {
      _royaltyData = {}
      _royaltyData.items = []
      _royaltyData.items = await getNFTRoyalty(updateAuthority, collectionName)
      } else {
      while (_royaltyData.last) {
      let royal = await getNFTRoyaltyFromDeta(updateAuthority, collectionName, NFTId.value, _royaltyData.last)
      _royaltyData.items = _royaltyData.items.concat(royal.items)
      _royaltyData.last = royal.last
      }
      }
      const a=sortDate(_royaltyData.items);

      royalty.value = _royaltyData.items.length > 0 ? a[a.length-1] : {}

//      console.log(sortDate(_royaltyData.items)[_royaltyData.items.length-1])
      lastSalesRoyalty.value=lamportsToSol(royalty.value.royalty_fee);
      date.value=ISOdateToReadable(a[a.length-1].time)
      console.log(ISOdateToReadable(a[a.length-1].time))
      console.log(ISOdateToReadable(a[0].time))
      localStorage.setItem(tempNFTId, JSON.stringify({NFTId:NFTId.value,NFTMetadata:NFTMetadata.value,royalty:royalty.value,lastSalesRoyalty:lastSalesRoyalty.value,date:date.value}));
        loading.value = false
      } catch (e) {
        console.log(e.message)
        loading.value = false
      }
    }
  )
}

function openTab() {
  chrome.tabs.create({
    active: true,
  url: `search.html?nft_id=${NFTId.value}`
  }, null)
}

</script>