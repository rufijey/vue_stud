<template>
  <div class="page__wrapper">
    <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
            'current__page' : modelValue === pageNumber
          }"
        @click="changePage(pageNumber)"
    >{{pageNumber}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-wrapper',
  props:{
    modelValue: {
      Number
    },
    totalPages: {
      Number
    }
  },
  methods: {
    changePage(pageNumber){
      this.$emit('update:modelValue', pageNumber)
    }
  }
}
</script>

<style scoped>

</style>