<template>

  <path-board></path-board>

  <operate-buttons></operate-buttons>

  <div class="config-board">
  </div>

  <edit-board></edit-board>

  <div class="text">{{test}}</div>
  <img class="image" src="../../assets/images/AitsukiNakuru.jpg" height="300" alt="Aitsuki Nakuru" @click="testHandler">
</template>

<script lang="ts" setup >
import {ref} from 'vue';
import PathBoard from 'components/PathBoard.vue'
import OperateButtons from 'components/OperateButtons.vue'
import eventBus from 'utils/EventBus'
import EditBoard from 'components/EditBoard.vue'

let test = ref("Aitsuki Nakuru")
const testHandler =  async () => {
  let result = await myApi.test()
  console.log(result)
  test.value = result
};

let isRuleJaVisible = ref(false)
const ruleJaHandler = (res: boolean) => {
  isRuleJaVisible.value = res
}
eventBus.on('isRuleJaVisible', ruleJaHandler)




let configBoardRef = ref()



</script>

<style lang="scss" scoped>

.process-btn{
  text-align: center;
}
.image{
  $scaleRate: 1.1;
  &:hover{
    transform: scale($scaleRate);
  }
}
.text{
  &:hover{
    font: 20px/24px{
      weight: bold;
    }
  }
}
</style>
