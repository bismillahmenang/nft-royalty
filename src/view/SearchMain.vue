<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                            v-model="NFTId"
                            clearable
                            label="Input Solana Mint Address Here"
                            type="text"
                            variant="outlined"
                    >


                        <template v-slot:append-inner>
                            <v-fade-transition leave-absolute>
                                <v-progress-circular
                                        v-if="loading"
                                        color="info"
                                        indeterminate
                                        size="24"
                                ></v-progress-circular>


                            </v-fade-transition>
                        </template>

                        <template v-slot:append>
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" class="mt-n2" @click="searchNFT">

                                        SEARCH
                                    </v-btn>
                                </template>


                            </v-menu>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <div class="text-center">NFT not Found</div>
            <v-card>
                <template v-slot:title>
                    NFT Detail
                </template>
                <template v-slot:text>
                    <v-row align="center" justify="center">
                        <v-col cols="5">
                            <v-img

                                    width="500"
                                    height="300"
                                    :src="`https://picsum.photos/500/300?image=8`"
                                    :lazy-src="`https://picsum.photos/10/6?image=8`"
                                    aspect-ratio="1"
                                    cover
                                    class="bg-grey-lighten-2 justify-center"
                            >
                                <template v-slot:placeholder>
                                    <v-row
                                            class="fill-height ma-0"
                                            align="center"
                                            justify="center"
                                    >
                                        <v-progress-circular
                                                indeterminate
                                                color="grey-lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>

                        </v-col>
                    </v-row>

                    <div class="font-weight-bold text-h6">Name</div>
                    <div>Name</div>
                    <div class="font-weight-bold text-h6">Mint Address</div>
                    <div><a href="https://solscan.io/token/5UD6RutHFmp6BsEe1JN8gmNnQxizQasYYuQYTYPaHDEv"
                            target="_blank">5UD6RutHFmp6BsEe1JN8gmNnQxizQasYYuQYTYPaHDEv</a></div>
                    <div class="font-weight-bold text-h6">Collection Name</div>
                    <div><a target="_blank"
                            :href="`https://solscan.io/collection/${collectionId}`">{{ collectionName }}</a>
                    </div>
                    <div class="font-weight-bold text-h6">Update Authority</div>
                    <div><a href="https://solscan.io/account/yootn8Kf22CQczC732psp7qEqxwPGSDQCFZHkzoXp25"
                            target="_blank">yootn8Kf22CQczC732psp7qEqxwPGSDQCFZHkzoXp25</a></div>
                </template>
            </v-card>
            <v-card class="my-2">
                <template v-slot:title>
                    List All Sales Transaction
                </template>

                <template v-slot:text>
                    <DataTable :value="royaltyData" :paginator="true" :rows="5"
                               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                               :rowsPerPageOptions="[5,10]" responsiveLayout="scroll"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                    <Column field="mint" header="Mint"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column field="market_fee" header="Market Fee"></Column>
                    <Column field="time" header="Time"></Column>
                    <Column field="royalty_fee" header="Royalty Fee"></Column>
                    <Column field="buyer" header="Buyer"></Column>
                    <Column field="seller" header="Seller"></Column>
                    <Column field="marketplace" header="Marketplace"></Column>
                    <Column field="signature" header="Signature"></Column>

                    </DataTable>
                </template>
            </v-card>
        </v-container>
    </v-form>
</template>
<script setup>
import {ref} from 'vue'
import {
  getNFTCollectionId,
  getNFTMetadataSolscan,
  getNFTRoyalty,
  getNFTUpdateAuthorityAndCollectionName
} from '../../services'
import {lamportsToSol, ISOdateToReadable} from "../../utils"

const loading = ref(false)
const NFTid = ref("")
const collectionName = ref("")
const collectionId = ref("")
const royaltyData = ref([])
const NFTMetadata = ref({})

async function searchNFT() {
  loading.value = true
  try {
    const {collectionId: CI, collectionName: CN} = await getNFTCollectionId(NFTid.value)
    collectionName.value = CN
    collectionId.value = CI
    const {updateAuthority, collectionName} = await getNFTUpdateAuthorityAndCollectionName(NFTid.value)
    const _NFTMetadata = await getNFTMetadataSolscan(NFTid.value)
    NFTMetadata.value = _NFTMetadata
    const _royaltyData = await getNFTRoyalty(updateAuthority, collectionName)
    royaltyData.value = _royaltyData.map(({
      mint,
      price,
      buyer,
      seller,
      marketplace,
      signature,
      market_fee,
      royalty_fee,
      time
    }) => {
      return {
        mint,
        price: `${lamportsToSol(price)} SOL`,
        buyer,
        seller,
        marketplace,
        signature,
        market_fee: `${lamportsToSol(market_fee)} SOL`,
        royalty_fee: `${lamportsToSol(royalty_fee)} SOL`,
        time: ISOdateToReadable(time)
      }
    })
    loading.value = false
  } catch (e) {
    console.log(e.message)
    loading.value = false
  }


}


</script>
