<template>
  <div class="file-inputs">
    <div class="file-input">
      <v-text-field label="Lyric File" variant="outlined" v-model="lyricPath"></v-text-field>
      <v-btn variant="tonal" :rounded="0" @click="selectLyricPath">Select</v-btn>
    </div>
    <div class="file-input">
      <v-text-field label="Osu File" variant="outlined" v-model="osuPath"></v-text-field>
      <v-btn variant="tonal" :rounded="0" @click="selectOsuPath">Select</v-btn>
    </div>
    <div class="file-input">
      <v-text-field label="Ass File" variant="outlined" v-model="assPath"></v-text-field>
      <v-btn variant="tonal" :rounded="0" @click="selectAssPath">Select</v-btn>
    </div>
  </div>

  <div class="process-btn">
    <v-row>
      <v-col>
        <v-btn>Load All</v-btn>
      </v-col>

      <v-col>
        <v-btn @click="getConvertedLyric">Load Lyric</v-btn>
      </v-col>

      <v-col>
        <v-btn @click="getConvertedOsu">Load Osu</v-btn>
      </v-col>
    </v-row>
  </div>


</template>

<script lang="ts" setup>
import {ref} from 'vue';

let test = ref("123123")
const testHandler = async () => {
  console.log(testApi);
  test.value = await testApi.test()
};

// Select file path
let lyricPath = ref("")
let osuPath = ref("")
let assPath = ref("")
const selectLyricPath = async () => {
  console.log("vue  selectLyricPath")
  let result = await myApi.selectLyricPath()
  lyricPath.value = result.filePaths[0]
}
const selectOsuPath = async () => {
  console.log("vue  selectOsuPath")
  let result = await myApi.selectOsuPath()
  osuPath.value = result.filePaths[0]
}
const selectAssPath = async () => {
  console.log("vue  selectAssPath")
  let result = await myApi.selectAssPath()
  assPath.value = result.filePaths[0]
}

// Process data
let convertedLyric = ref()
let convertedOsu = ref()
let convertedAss = ref()
const getConvertedLyric = async () => {
  console.log("vue  getConvertedLyric")
  let result = await myApi.processLyricFile(lyricPath.value);
}
const getConvertedOsu = async () => {
  console.log("vue getConvertedOsu")
  let result = await myApi.processOsuFile(osuPath.value);
  console.log(result)
}
const saveAssFile = async () => {
  console.log("vue getConvertedAss")
  let result = await myApi.processAssFile(assPath.value);
}

</script>

<style lang="scss" scoped>
.file-input {
  display: flex;
  .v-btn {
    height: 56px;
  }
}
.process-btn{
  text-align: center;
}
</style>
