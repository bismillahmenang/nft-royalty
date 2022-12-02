<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                            v-model="NFTId"
                            clearable
                            label="Search NFT"
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
                        <Column field="name" header="Name"></Column>
                        <Column field="country.name" header="Country"></Column>
                        <Column field="company" header="Company"></Column>
                        <Column field="representative.name" header="Representative"></Column>

                    </DataTable>
                </template>
            </v-card>
        </v-container>
    </v-form>
</template>
<script setup>
import {ref} from 'vue'
import {getNFTCollectionId} from '../../services'

const loading = ref(false)
const NFTid = ref("")
const collectionName = ref("")
const collectionId = ref("")
const royaltyData = ref([])

async function searchNFT() {
  loading.value = true
  try {
    const {collectionId: CI, collectionName: CN} = await getNFTCollectionId(NFTid.value)
    collectionName.value = CN;
    collectionId.value = CI;
    loading.value = false
  } catch (e) {
    console.log(e.message)
    loading.value = false
  }


}

const customers = ref([
  {
    "id": 1000,
    "name": "James Butt",
    "country": {
      "name": "Algeria",
      "code": "dz"
    },
    "company": "Benton, John B Jr",
    "date": "2015-09-13",
    "status": "unqualified",
    "verified": true,
    "activity": 17,
    "representative": {
      "name": "Ioni Bowcher",
      "image": "ionibowcher.png"
    },
    "balance": 70663
  },
  {
    "id": 1001,
    "name": "Josephine Darakjy",
    "country": {
      "name": "Egypt",
      "code": "eg"
    },
    "company": "Chanay, Jeffrey A Esq",
    "date": "2019-02-09",
    "status": "proposal",
    "verified": true,
    "activity": 0,
    "representative": {
      "name": "Amy Elsner",
      "image": "amyelsner.png"
    },
    "balance": 82429
  },
  {
    "id": 1002,
    "name": "Art Venere",
    "country": {
      "name": "Panama",
      "code": "pa"
    },
    "company": "Chemel, James L Cpa",
    "date": "2017-05-13",
    "status": "qualified",
    "verified": false,
    "activity": 63,
    "representative": {
      "name": "Asiya Javayant",
      "image": "asiyajavayant.png"
    },
    "balance": 28334
  },
  {
    "id": 1003,
    "name": "Lenna Paprocki",
    "country": {
      "name": "Slovenia",
      "code": "si"
    },
    "company": "Feltz Printing Service",
    "date": "2020-09-15",
    "status": "new",
    "verified": false,
    "activity": 37,
    "representative": {
      "name": "Xuxue Feng",
      "image": "xuxuefeng.png"
    },
    "balance": 88521
  },
  {
    "id": 1004,
    "name": "Donette Foller",
    "country": {
      "name": "South Africa",
      "code": "za"
    },
    "company": "Printing Dimensions",
    "date": "2016-05-20",
    "status": "proposal",
    "verified": true,
    "activity": 33,
    "representative": {
      "name": "Asiya Javayant",
      "image": "asiyajavayant.png"
    },
    "balance": 93905
  },
  {
    "id": 1005,
    "name": "Simona Morasca",
    "country": {
      "name": "Egypt",
      "code": "eg"
    },
    "company": "Chapman, Ross E Esq",
    "date": "2018-02-16",
    "status": "qualified",
    "verified": false,
    "activity": 68,
    "representative": {
      "name": "Ivan Magalhaes",
      "image": "ivanmagalhaes.png"
    },
    "balance": 50041
  },
  {
    "id": 1006,
    "name": "Mitsue Tollner",
    "country": {
      "name": "Paraguay",
      "code": "py"
    },
    "company": "Morlong Associates",
    "date": "2018-02-19",
    "status": "renewal",
    "verified": true,
    "activity": 54,
    "representative": {
      "name": "Ivan Magalhaes",
      "image": "ivanmagalhaes.png"
    },
    "balance": 58706
  },
  {
    "id": 1007,
    "name": "Leota Dilliard",
    "country": {
      "name": "Serbia",
      "code": "rs"
    },
    "company": "Commercial Press",
    "date": "2019-08-13",
    "status": "renewal",
    "verified": true,
    "activity": 69,
    "representative": {
      "name": "Onyama Limba",
      "image": "onyamalimba.png"
    },
    "balance": 26640
  },
  {
    "id": 1008,
    "name": "Sage Wieser",
    "country": {
      "name": "Egypt",
      "code": "eg"
    },
    "company": "Truhlar And Truhlar Attys",
    "date": "2018-11-21",
    "status": "unqualified",
    "verified": true,
    "activity": 76,
    "representative": {
      "name": "Ivan Magalhaes",
      "image": "ivanmagalhaes.png"
    },
    "balance": 65369
  },
  {
    "id": 1009,
    "name": "Kris Marrier",
    "country": {
      "name": "Mexico",
      "code": "mx"
    },
    "company": "King, Christopher A Esq",
    "date": "2015-07-07",
    "status": "proposal",
    "verified": false,
    "activity": 3,
    "representative": {
      "name": "Onyama Limba",
      "image": "onyamalimba.png"
    },
    "balance": 63451
  },
  {
    "id": 1010,
    "name": "Minna Amigon",
    "country": {
      "name": "Romania",
      "code": "ro"
    },
    "company": "Dorl, James J Esq",
    "date": "2018-11-07",
    "status": "qualified",
    "verified": false,
    "activity": 38,
    "representative": {
      "name": "Anna Fali",
      "image": "annafali.png"
    },
    "balance": 71169
  },
  {
    "id": 1011,
    "name": "Abel Maclead",
    "country": {
      "name": "Singapore",
      "code": "sg"
    },
    "company": "Rangoni Of Florence",
    "date": "2017-03-11",
    "status": "qualified",
    "verified": true,
    "activity": 87,
    "representative": {
      "name": "Bernardo Dominic",
      "image": "bernardodominic.png"
    },
    "balance": 96842
  },
  {
    "id": 1012,
    "name": "Kiley Caldarera",
    "country": {
      "name": "Serbia",
      "code": "rs"
    },
    "company": "Feiner Bros",
    "date": "2015-10-20",
    "status": "unqualified",
    "verified": false,
    "activity": 80,
    "representative": {
      "name": "Onyama Limba",
      "image": "onyamalimba.png"
    },
    "balance": 92734
  },
  {
    "id": 1013,
    "name": "Graciela Ruta",
    "country": {
      "name": "Chile",
      "code": "cl"
    },
    "company": "Buckley Miller & Wright",
    "date": "2016-07-25",
    "status": "negotiation",
    "verified": false,
    "activity": 59,
    "representative": {
      "name": "Amy Elsner",
      "image": "amyelsner.png"
    },
    "balance": 45250
  },
  {
    "id": 1014,
    "name": "Cammy Albares",
    "country": {
      "name": "Philippines",
      "code": "ph"
    },
    "company": "Rousseaux, Michael Esq",
    "date": "2019-06-25",
    "status": "new",
    "verified": true,
    "activity": 90,
    "representative": {
      "name": "Asiya Javayant",
      "image": "asiyajavayant.png"
    },
    "balance": 30236
  },
  {
    "id": 1015,
    "name": "Mattie Poquette",
    "country": {
      "name": "Venezuela",
      "code": "ve"
    },
    "company": "Century Communications",
    "date": "2017-12-12",
    "status": "negotiation",
    "verified": false,
    "activity": 52,
    "representative": {
      "name": "Anna Fali",
      "image": "annafali.png"
    },
    "balance": 64533
  },
  {
    "id": 1016,
    "name": "Meaghan Garufi",
    "country": {
      "name": "Malaysia",
      "code": "my"
    },
    "company": "Bolton, Wilbur Esq",
    "date": "2018-07-04",
    "status": "unqualified",
    "verified": false,
    "activity": 31,
    "representative": {
      "name": "Ivan Magalhaes",
      "image": "ivanmagalhaes.png"
    },
    "balance": 37279
  }])
</script>
