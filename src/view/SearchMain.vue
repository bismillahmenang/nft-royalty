<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                            v-model="message"
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
                                    <v-btn v-bind="props" class="mt-n2">

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
                            href="https://solscan.io/collection/d88a31f54913503c7714022f24c55108c7893f2e67c38516d796102cd759b4f2">yoots</a>
                    </div>
                    <div class="font-weight-bold text-h6">Update Authority</div>
                    <div><a href="https://solscan.io/account/yootn8Kf22CQczC732psp7qEqxwPGSDQCFZHkzoXp25"
                            target="_blank">yootn8Kf22CQczC732psp7qEqxwPGSDQCFZHkzoXp25</a></div>
                </template>
            </v-card>
        <v-card class="my-2" >
        <template v-slot:title>
        List Royalty Transaction
        </template>

        <template v-slot:text>
        This is content
        </template>
        </v-card>
        </v-container>
    </v-form>
</template>
