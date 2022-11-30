<template>
    <v-container class="d-flex align-center flex-column">
        <v-progress-circular
                indeterminate
                color="primary"
        v-if="loading && NFTId.trim().length <= 0"
        ></v-progress-circular>
    <div class="text-subtitle-2" v-if="NFTId.trim().length > 0">NFT ID:</div>
    <div class="text-subtitle-2" v-if="NFTId.trim().length > 0">{{ NFTId }}</div>
    <div class="text-subtitle-2" v-if="NFTId.trim().length <= 0 && loading === false">No NFT Found</div>
    <v-btn class="mt-2" color="secondary" @click="openTab" rounded="lg" v-if="NFTId.trim().length <= 0 && loading === false">
    Search NFT
    </v-btn>
        <v-card
                class="my-2"
                width="400"
        v-if="NFTId.trim().length > 0"
        >
            <template v-slot:title>
                This is a title
            </template>

            <template v-slot:subtitle>
                This is a subtitle
            </template>

            <template v-slot:text>
                This is content
            </template>
        </v-card>


    <v-card width="400" class="my-2" v-if="NFTId.trim().length > 0">
            <template v-slot:title>
                This is a title
            </template>

            <template v-slot:subtitle>
                This is a subtitle
            </template>

            <template v-slot:text>
                This is content
            </template>
        </v-card>


    <v-card width="400" class="my-2" v-if="NFTId.trim().length > 0">
            <v-card-item>
                <v-card-title>This is a title</v-card-title>

                <v-card-subtitle>This is a subtitle</v-card-subtitle>
            </v-card-item>

            <v-card-text>
                This is content
            </v-card-text>
        </v-card>
    <v-btn class="mt-2" color="secondary" @click="openTab" rounded="lg" v-if="NFTId.trim().length > 0">
            More Detail
        </v-btn>

    </v-container>
</template>
<script setup>
import {onMounted, ref} from "vue"
import {getNFTDetailFromHelius} from "../../services"
import {getNFTIdFromURL} from "../../utils"

const NFTId = ref("");
const loading = ref(true);
onMounted(async () => {
  let queryOptions = {active: true, currentWindow: true}
  let [tab] = await chrome.tabs.query(queryOptions)

  chrome.tabs.sendMessage(
    tab.id,
    {color: "#00FF00"},
    async function (response) {
    try{
    const tempNFTId = getNFTIdFromURL(response.domain)
    const NFTDetail = await getNFTDetailFromHelius(tempNFTId)
    NFTId.value = tempNFTId
    console.log(NFTDetail)
    }catch(e){
    console.log(e.message)
    loading.value=false;
    }

    }
  )


})

function openTab() {
  chrome.tabs.create({
    active: true,
    url: 'solana_main.html?pa=mo'
  }, null)
}
</script>