<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="navbar__main">Vue</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/composition')">Composition</my-button>
    </div>

  </div>
</template>

<script>
import router from "@/router/router.js";

export default {
  methods: {
    router() {
      return router
    }
  }

}
</script>

<style scoped>
  .navbar{
    height: 50px;
    background-color: lightgray ;
    box-shadow: 10px 10px 15px #a5a3a3;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 0 15px;
  }
  .navbar__main:hover{
    color: teal;
  }
</style>