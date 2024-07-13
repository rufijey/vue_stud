<template>
  <div>
    <h2>Страница с постами</h2>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск постов"
    />

    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>

      <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost"></post-form>
      </my-dialog>

      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>

    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"></post-list>

    <div v-else>Идет загрузка</div>
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
import { ref } from "vue";
import { usePost } from "@/hooks/usePost.js";
import useSortedPosts from "@/hooks/useSortedPosts.js";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.js";

export default {
  components: {
    MyWrapper,
    MyInput,
    MySelect,
    MyButton,
    PostForm,
    PostList,
  },
  data() {
    return {
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostLoading, isDataLoaded, page, dialogVisible, loadMorePosts, removePost,createPost,showDialog  } = usePost(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostLoading,
      isDataLoaded,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
      page,
      dialogVisible,
      loadMorePosts,
      removePost,
      createPost,
      showDialog
    };
  },
};
</script>

<style>
.app__btns {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current__page {
  border: 2px solid teal;
}
.observer {
}
</style>
