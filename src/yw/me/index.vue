<template>
  <view class="container">
    我的

    <Tabbar current="我的"></Tabbar>
  </view>
</template>
<script>
import Tabbar from "@/components/Tabbar.vue";
import Card from '@/components/Card.vue'
export default {
  components: {
    Card,
    Tabbar
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;

}
