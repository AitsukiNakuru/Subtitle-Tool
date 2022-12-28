<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          Path Select
        </template>
        <template v-slot:actions>
          <v-icon :color="lyricPath === '' ? 'teal' : ''" :icon="lyricPath === '' ? 'mdi-pencil' : 'mdi-check'"></v-icon>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="file-input">
          <v-text-field v-model="lyricPath" label="Lyric File" variant="outlined" @update:modelValue="emitLyricPath"></v-text-field>
          <v-btn :rounded="0" variant="tonal" @click="selectLyricPath">Select</v-btn>
        </div>
        <div class="file-input">
          <v-text-field v-model="osuPath" label="Osu File" variant="outlined" @update:modelValue="emitOsuPath"></v-text-field>
          <v-btn :rounded="0" variant="tonal" @click="selectOsuPath">Select</v-btn>
        </div>
        <div class="file-input">
          <v-text-field v-model="assPath" label="Ass File" variant="outlined" @update:modelValue="emitAssPath"></v-text-field>
          <v-btn :rounded="0" variant="tonal" @click="selectAssPath">Select</v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts" >
import {getCurrentInstance, ref} from 'vue';
import eventBus from 'utils/EventBus'
// Select file path
let lyricPath = ref("")
let osuPath = ref("")
let assPath = ref("")

function emitLyricPath() {
  eventBus.emit('lyricPath', lyricPath.value)
}
function emitAssPath() {
  eventBus.emit('assPath', assPath.value)
}
function emitOsuPath() {
  eventBus.emit('osuPath', osuPath.value)
}


const selectLyricPath = async () => {
  console.log("vue  selectLyricPath")
  let result = myApi.selectLyricPath()
  result.then((res: { filePaths: string[]; }) => {
    lyricPath.value = res.filePaths[0]
    emitLyricPath();
  }, (err: any) => {

  })

}
const selectOsuPath = async () => {
  console.log("vue  selectOsuPath")
  let result = myApi.selectOsuPath()
  result.then((res: { filePaths: string[]; }) => {
    osuPath.value = res.filePaths[0]
    emitOsuPath();
  }, (err: any) => {

  })

}
const selectAssPath = async () => {
  console.log("vue  selectAssPath")
  let result = myApi.selectAssPath()
  result.then((res: { filePath: string; }) => {
    assPath.value = res.filePath
    console.log(assPath.value)
    emitAssPath();
  }, (err: any) => {

  })
}

</script>

<style lang="scss" scoped>
.file-input {
  display: flex;

  .v-btn {
    height: 56px;
  }
}
</style>
