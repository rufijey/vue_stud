<template>
  <div>
    <form>
      <h4>Создание поста</h4>
      <my-input v-focus v-model.trim="post.title" type="text" placeholder="Название"/>
      <my-input v-model.trim="post.body" type="text" placeholder="Описание"/>
      <my-button class="button" style="margin-top: 10px;" @click.prevent = "CreatePost">Создать</my-button>
    </form>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        post:{
          id:null,
          title:'',
          body:''
        }
      }
    },
    methods:{
      CreatePost(){
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.post = {
          title: '',
          body: ''
        }
      }
    },
    emits:[
        'create'
    ]
  }
</script>

<style scoped>
form{
  display: flex;
  flex-direction: column;
}

</style>