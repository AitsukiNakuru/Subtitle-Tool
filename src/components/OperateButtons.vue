<template>
  <div class="process-btn">
    <v-row>
      <v-col v-if="false">
        <v-btn @click="loadAllFile">Load All</v-btn>
      </v-col>

      <v-col>
        <v-btn :disabled="lyricPath===''" @click="loadLyricFile">Load Lyric</v-btn>
      </v-col>

      <v-col>
        <v-btn :disabled="osuPath===''" @click="loadOsuFile">Load Osu</v-btn>
      </v-col>

      <v-col>
        <v-btn :disabled="assPath===''||editedLyricData===''||osuPath===''" @click="generateAssFile">Generate ASS File</v-btn>
      </v-col>

      <v-col>
        <v-btn @click="modifyRulerJa">Modify rule</v-btn>
      </v-col>

      <v-col v-if="false">
        <config-board ref="configBoardRef">
        </config-board>
      </v-col>

    </v-row>
  </div>

</template>

<script lang="ts" setup>
import {ref, toRaw, unref, watch} from 'vue';
import eventBus from "utils/EventBus";
import ConfigBoard from 'components/ConfigBoard.vue'
import {ipcRenderer} from "electron";

let isSnackbarVisible = ref(false)
let snackbarText = ref('')
const judgeLyricPath = () => {
  if (lyricPath.value === '') {
    isSnackbarVisible.value = true
  }
}
const judgeOsuPath = () => {
  if (osuPath.value === '') {
    isSnackbarVisible.value = true
  }
}
const judgeAssPath = () => {
  if (osuPath.value === '') {
    isSnackbarVisible.value = true
  }
}

// Process data
let lyricPath = ref("")
let osuPath = ref("")
let assPath = ref("")


const lyricPathHandler = (res: any) => {
  lyricPath.value = res;
}
const osuPathHandler = (res: any) => {
  osuPath.value = res;
}
const assPathHandler = (res: any) => {
  assPath.value = res;
}
eventBus.on('lyricPath', lyricPathHandler);
eventBus.on('osuPath', osuPathHandler);
eventBus.on('assPath', assPathHandler);




// Load file
const loadLyricFile = async () => {
  console.log("vue  loadLyric")
  let result = await myApi.loadLyricFile(lyricPath.value);
  eventBus.emit('lyricData', result)
  return result
}
watch(lyricPath, async (value, oldValue, onCleanup) => {
  let result = await loadLyricFile()
  eventBus.emit('lyricData', result)
})
const loadOsuFile = async () => {
  console.log("vue loadOsuFile")
  let result = await myApi.loadOsuFile(osuPath.value);
  eventBus.emit('osuData', result)
  return result
}
watch(osuPath, async (value, oldValue, onCleanup) => {
  let result = await loadOsuFile()
  eventBus.emit('osuData', result)
})
const loadAllFile = async () => {
  console.log("vue loadAllFile")
  let result = await myApi.loadAllFile(lyricPath.value, osuPath.value)
}

let editedLyricData: any
const saveAssFile = async () => {
  console.log("vue getConvertedAss")
  let result = await myApi.processAssFile(assPath.value);
}
const editedLyricDataHandler = (res: any) => {
  editedLyricData = JSON.stringify(res.value);
}
eventBus.on('editedLyricData', editedLyricDataHandler)
const generateAssFile = async () => {
  console.log(editedLyricData)
  let result = await myApi.generateAssFile(editedLyricData, osuPath.value, assPath.value);
}

// Modify config
let ruleJaData = ref([])
const modifyRulerJa = async () => {
  console.log("vue modifyRulerJa")
  let result = await myApi.modifyRulerJa()
  ruleJaData.value = result
  console.log(result)
  eventBus.emit('isRuleJaVisible', true)
  eventBus.emit('ruleJaData', ruleJaData)
}
</script>

<style scoped>

</style>
