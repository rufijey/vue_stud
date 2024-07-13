<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'

}
</script>

<style scoped>
.button{
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
.button:hover{
  color: blue;
  border: 2px solid blue;
  padding: 9px 14px;
}
</style>