<script setup>
const router = useRouter()
</script>

<template>
  <div class="container center-flex">
    <van-button type="primary" @click="router.push('/test')"> 我是一个h5的button222 </van-button>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: relative;
  font-size: 30px;
  height: 100vh;
}
</style>
