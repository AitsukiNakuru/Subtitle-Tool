<template>
  <div>
    <v-table>
      <thead >
      <tr class="table-header">
        <th class="text-left" style="width: 5%; " >
          Time
        </th>
        <th class="text-left" style="width: 85%;">
          Lyric
        </th>
        <th class="text-left" style="width: 5%;">
          Objects
        </th>
        <th class="text-left" style="width: 5%;">
          Status
        </th>
      </tr>
      </thead>
      <tbody v-if="osuData != null || lyricData != null">
        <tr v-for="(item, index) in lyricData.segmentLyric">
          <td class="label-time">
            <div v-if="osuData != null && osuData.timeLineArray.length > index" style="margin-top: 5px">
              <div>{{osuData.timeLineArray[index].startTime}}</div>
              <div>{{osuData.timeLineArray[index].endTime}}</div>
            </div>
          </td>
          <td>
            <v-text-field hide-details variant="outlined" v-model="lyricData.segmentLyric[index]"
                          style="font-size: 100px"
            >
              <template v-slot:append-inner>
                {{computedLyricData.segmentLyricLengthArray[index]}}
              </template>
            </v-text-field>
          </td>

          <td>
            <div v-if="osuData != null && osuData.timeLineArray.length > index">{{osuData.timeLineArray[index].objectCount}}</div>
          </td>

          <td>

            <v-chip
              v-if="osuData != null && osuData.timeLineArray.length > index && osuData.timeLineArray[index].objectCount - computedLyricData.segmentLyricLengthArray[index] ===0"
              color="info"
              text-color="white"
              close-icon="mdi-delete"
              prepend-icon="mdi-check-circle-outline"
              size="large"
              style="width: 100px"
            >
              Correct
            </v-chip>
            <v-chip
              v-else
              color="error"
              text-color="white"
              close-icon="mdi-delete"
              prepend-icon="mdi-close-circle-outline "
              size="large"
              style="width: 100px"
            >
              Wrong
            </v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import {computed, Ref, ref, watch} from 'vue';
import eventBus from "utils/EventBus";

type OsuData = {
  timeLineArray: [{
    startTime: String
    endTime: String
    objectCount: number
  }]

}

type LyricData = {
  lyricPath: String
  originalLyric: String
  segmentLyric: []
  okuriganaLyric: []
}

let lyricData = ref()
const lyricDataHandler = (res: any) => {
  lyricData.value = res
}
eventBus.on('lyricData', lyricDataHandler)
let computedLyricData = computed(() => {
  let segmentLyricLengthArray = []
  let okuriganaLyricLengthArray = []
  for (let i = 0; i < lyricData.value.segmentLyric.length; i++) {
    let segmentLyricCount = 0
    let okuriganaLyricCount = 0
    for (const item of lyricData.value.segmentLyric[i]) {
      if (item === '|') segmentLyricCount++;
    }
    for (const item of lyricData.value.okuriganaLyric[i]) {
      if (item === '|') okuriganaLyricCount++;
    }
    segmentLyricLengthArray[i] = segmentLyricCount + 2;
    okuriganaLyricLengthArray[i] = okuriganaLyricCount + 2;
  }
  return {
    segmentLyricLengthArray,
    okuriganaLyricLengthArray,
    segmentLyric: lyricData.value.segmentLyric,
    okuriganaLyric: lyricData.value.okuriganaLyric
  }
})
const lyricEdited = () => {
  console.log('send')
  eventBus.emit('editedLyricData', computedLyricData)
}
watch(lyricData, (value, oldValue, onCleanup) => {
  lyricEdited()
})

let osuData = ref<OsuData>()
const osuDataHandler = (res: any) => {
  osuData.value = res
}
eventBus.on('osuData', osuDataHandler)

</script>

<style scoped lang="scss">

.table-header {
  .text-left {
    font-size: 18px
  }
}

</style>
