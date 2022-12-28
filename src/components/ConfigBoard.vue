<template>
  <v-dialog
    v-model="isConfigVisible"
    persistent
  >
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props" @click="openConfig">Open config</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">config.json</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" lg>
              <v-text-field label="Excel file name" required variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" lg>
              <v-text-field label="Nothing" required variant="outlined"></v-text-field>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isConfigVisible = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="isConfigVisible = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue';



let isConfigVisible = ref(false)
let configData = ref({})
const openConfig = async () => {
  console.log("vue modifyConfig")
  configData.value = await myApi.openConfig()
}

</script>

<style scoped>

</style>
