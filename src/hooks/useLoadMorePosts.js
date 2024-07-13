import axios from "axios";
import {onMounted, ref} from "vue";

export function useLoadMorePosts(limit, page, posts){
    const updatedPosts = ref([])
    const isPostLoading = ref(true)
    const isDataLoaded = ref(false)

    const loadMorePosts = async () =>{
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            updatedPosts.value = [...posts, ...response.data]
            isDataLoaded.value = true
        } catch (e) {
            alert(e.message)
        } finally {
            isPostLoading.value = false
        }
    }

    return{
        updatedPosts, isPostLoading, isDataLoaded, loadMorePosts
    }
}