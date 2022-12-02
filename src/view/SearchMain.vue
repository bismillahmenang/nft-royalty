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
                                    :src="image"
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
                    <div>{{ NFTMetadata?.data?.name }}</div>
                    <div class="font-weight-bold text-h6">Mint Address</div>
                    <div><a :href="`https://solscan.io/token/${NFTId}`"
                            target="_blank">{{ NFTId }}</a></div>
                    <div class="font-weight-bold text-h6">Collection Name</div>
                    <div><a target="_blank"
                            :href="`https://solscan.io/collection/${collectionId}`">{{ collectionName }}</a>
                    </div>
                    <div class="font-weight-bold text-h6">Update Authority</div>
                    <div><a :href="`https://solscan.io/account/${updateAuthority}`"
                            target="_blank">{{ updateAuthority }}</a></div>
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
                        <Column field="mint" header="Mint">
                            <template #body="{data}">
                            <a :href="`https://solscan.io/token/${data.mint}`" target="_blank">{{ truncateInTheMiddle(data.mint,10) }}</a>
                            </template>
                        </Column>
                        <Column field="price" header="Price">
                            <template #body="{data}">
                                {{ lamportsToSol(data.price) }} SOL
                            </template>
                        </Column>
                        <Column field="market_fee" header="Market Fee">
                            <template #body="{data}">
                                {{ lamportsToSol(data.market_fee) }} SOL
                            </template>
                        </Column>
                        <Column field="time" header="Time">
                            <template #body="{data}">
                                {{ ISOdateToReadable(data.time) }}
                            </template>
                        </Column>
                        <Column field="royalty_fee" header="Royalty Fee">
                            <template #body="{data}">
                                {{ lamportsToSol(data.royalty_fee) }} SOL
                            </template>
                        </Column>
                        <Column field="buyer" header="Buyer">
                            <template #body="{data}">
                            <a :href="`https://solscan.io/account/${data.buyer}`" target="_blank">{{ truncateInTheMiddle(data.buyer,10) }}</a>

                            </template>
                        </Column>
                        <Column field="seller" header="Seller">
                            <template #body="{data}">
                            <a :href="`https://solscan.io/account/${data.seller}`" target="_blank">{{ truncateInTheMiddle(data.seller,10) }}</a>
                            </template>
                        </Column>
                        <Column field="marketplace" header="Marketplace"></Column>
                        <Column field="signature" header="Signature">
                            <template #body="{data}">
                            <a :href="`https://solscan.io/tx/${data.signature}`" target="_blank">{{ truncateInTheMiddle(data.signature,10) }}</a>

                            </template>
                        </Column>

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
  getNFTUpdateAuthorityAndCollectionName,
  getImageFromURI
} from '../../services'
import {lamportsToSol, ISOdateToReadable, truncateInTheMiddle} from "../../utils"

const loading = ref(false)
const NFTId = ref("")
const collectionName = ref("")
const collectionId = ref("")
const royaltyData = ref([])
const NFTMetadata = ref({})
const updateAuthority = ref("")
const image = ref("")

async function searchNFT() {
  loading.value = true
  try {
    const {collectionId: CI} = await getNFTCollectionId(NFTId.value)

    collectionId.value = CI
    const {
      updateAuthority: _updateAuthority,
      collectionName: _collectionName,
      image: _image
    } = await getNFTUpdateAuthorityAndCollectionName(NFTId.value)
    updateAuthority.value = _updateAuthority
    collectionName.value = _collectionName
    image.value = await getImageFromURI(_image)
    const _NFTMetadata = await getNFTMetadataSolscan(NFTId.value)
    NFTMetadata.value = _NFTMetadata
    const _royaltyData = await getNFTRoyalty(_updateAuthority, _collectionName)
  royaltyData.value = _royaltyData
    loading.value = false
  } catch (e) {
    console.log(e.message)
    loading.value = false
  }


}


</script>
