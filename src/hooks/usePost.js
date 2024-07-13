import axios from "axios";
import { onMounted, ref } from "vue";

export function usePost(limit) {
    const posts = ref([]);
    const totalPages = ref(0);
    const page = ref(1);
    const isPostLoading = ref(true);
    const isDataLoaded = ref(false);
    const dialogVisible  = ref(false);
    const fetchingPosts = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _limit: limit,
                    _page: page.value,
                },
            });
            totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
            posts.value = response.data;
            page.value += 1;
            isDataLoaded.value = true;
        } catch (e) {
            alert(e.message);
        } finally {
            isPostLoading.value = false;
        }
    };

    const loadMorePosts = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _limit: limit,
                    _page: page.value,
                },
            });
            posts.value = [...posts.value, ...response.data];
            page.value += 1;
            isDataLoaded.value = true;
        } catch (e) {
            alert(e.message);
        } finally {
        }
    };

    const removePost = (post) => {
        posts.value = posts.value.filter(p => p.id !== post.id)
    };

    const createPost = (post) => {
        posts.value.push(post)
        dialogVisible.value = false
    };

    const showDialog = ()  => {
        dialogVisible.value = true
    };
    onMounted(fetchingPosts);
    return {
        posts,
        isPostLoading,
        totalPages,
        isDataLoaded,
        page,
        dialogVisible,
        loadMorePosts,
        removePost,
        createPost,
        showDialog
    };
}
