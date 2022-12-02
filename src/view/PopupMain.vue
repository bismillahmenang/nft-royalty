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
                {{ NFTMetadata.name }}
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
        <v-btn :disabled="loading" class="mt-2" color="secondary" @click="openTab" rounded="lg"
               v-if="NFTId.trim().length > 0">
            More Detail
        </v-btn>
        <v-btn :disabled="loading" class="mt-2" color="secondary" v-if="isNFT" rounded="lg" @click="checkNFT">
            Check NFT
        </v-btn>
        <div>
            <v-btn :disabled="loading" class="mt-2 w-full" color="secondary" @click="openSearchTab" rounded="lg"
            >
                Search NFT
            </v-btn>
        </div>

    </v-container>
</template>
<script setup>
import {onMounted, ref} from "vue"
import {getNFTMetadataSolscan, getNFTRoyalty,  getNFTUpdateAuthorityAndCollectionName} from "../../services"
import {getNFTIdFromURL,lamportsToSol} from "../../utils"

const NFTId = ref("")
const NFTMetadata = ref({})
const loading = ref(false)
const royalty = ref({})
const isNFT = ref(false)
const lastSalesRoyalty=ref(0)
onMounted(async () => {
  let queryOptions = {active: true, currentWindow: true}
  let [tab] = await chrome.tabs.query(queryOptions)
  chrome.tabs.sendMessage(
    tab.id,
    {domain: "check"},
    async function (response) {
      try {
        const tempNFTId = getNFTIdFromURL(response.domain)
        if (tempNFTId.trim().length > 0) {
          isNFT.value = true
        }

      } catch (e) {
        isNFT.value = false
      }
    }
  )
})

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
      const {updateAuthority, collectionName} = await getNFTUpdateAuthorityAndCollectionName(tempNFTId)
        const NFTMetadata2 = await getNFTMetadataSolscan(tempNFTId)
        const royaltyData = await getNFTRoyalty(updateAuthority, collectionName)
        NFTId.value = tempNFTId
        NFTMetadata.value = NFTMetadata2
        royalty.value = royaltyData.length > 0 ? royaltyData[0] : {}
      lastSalesRoyalty.value=lamportsToSol(royalty.value.royalty_fee);
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
  url: `solana_main.html?pa=${NFTId.value}`
  }, null)
}

function openSearchTab() {
  chrome.tabs.create({
    active: true,
    url: 'search.html'
  }, null)
}
</script>