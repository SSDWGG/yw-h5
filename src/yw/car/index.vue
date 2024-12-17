<template>
  <view class="container">
    购物车

    <Tabbar current="购物车"></Tabbar>
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
