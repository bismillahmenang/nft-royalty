<template>
  <v-container class="d-flex align-center flex-column">
    <div class="text-subtitle-2">With props</div>
  <v-progress-circular
  indeterminate
  color="primary"
  ></v-progress-circular>
    <v-card
    class="my-2"
      width="400"
    
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



  <v-card width="400" class="my-2">
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



    <v-card width="400" class="my-2">
      <v-card-item>
        <v-card-title>This is a title</v-card-title>

        <v-card-subtitle>This is a subtitle</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        This is content
      </v-card-text>
    </v-card>
  <v-btn class="mt-2" color="secondary"  rounded="lg">
  More Detail
  </v-btn>
  </v-container>
</template>
<script setup></script>