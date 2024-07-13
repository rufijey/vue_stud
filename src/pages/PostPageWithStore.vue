<template>
  <div>
    <h2>Страница с постами</h2>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск постов"
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >Создать пост
      </my-button>

      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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
      <div v-intersection="{ loadMore: loadMorePosts, page: page, totalPages: totalPages}" class="observer"></div>
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
import {mapState, mapMutations, mapActions, mapGetters} from "vuex"

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

  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setPosts: 'post/setPosts',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.setPosts(this.posts.filter(p => p.id !== post.id))
    },
    showDialog() {
      this.dialogVisible = true
    },

  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      sortOptions: state => state.post.sortOptions,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      isDataLoaded: state => state.post.isDataLoaded

    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
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
