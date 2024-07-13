<template>
  <div>
    <h2>Страница с постами</h2>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск постов"
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >Создать пост
      </my-button>

      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      ></my-select>
    </div>

    <my-dialog
        v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
    ></post-list>

    <div v-else>Идет загрузка</div>
    <!--    <my-wrapper v-model="page" :total-pages="totalPages"/>-->
    <div v-if="isDataLoaded">
      <div v-intersection="{ loadMore: loadMorePosts, page: page, totalPages: totalPages }" class="observer"></div>
    </div>
  </div>
</template>

<script>
import PostList from "@/Components/PostList.vue";
import PostForm from "@/Components/PostForm.vue";
import axios from "axios";
import MyButton from "@/Components/UI/MyButton.vue";
import MySelect from "@/Components/UI/MySelect.vue";
import MyInput from "@/Components/UI/MyInput.vue";
import MyWrapper from "@/Components/UI/MyWrapper.vue";

export default {
  components: {
    MyWrapper,
    MyInput,
    MySelect,
    MyButton,
    PostForm,
    PostList
  },
  mounted() {
    this.fetchPosts()
    //
    // let options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // let callback = (entries, observer)=>{
    //   if(entries[0].isIntersecting && this.page < this.totalPages){
    //     this.loadMorePosts()
    //   }
    // }
    // let observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer);
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ],
      page: 1,
      limit: 10,
      totalPages: 0,
      isDataLoaded: false
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      this.isPostLoading = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
        this.isDataLoaded = true
      } catch (e) {
        alert('ошибка')
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePosts() {
      this.page+=1
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('ошибка')
      } finally {
      }
    },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => {
        return post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  },
  watch:{
    // page(){
    //   this.fetchPosts()
    // }
  }

}
</script>

<style>

.app__btns {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.page__wrapper{
  display: flex;
  margin-top: 15px;
}
.page{
  border: 1px solid black;
  padding: 10px;
}
.current__page{
  border: 2px solid teal;
}
.observer{
}
</style>
