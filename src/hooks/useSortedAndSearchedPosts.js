import {computed, ref} from "vue";

export default function sortedAndSearchedPosts(sortedPosts){
    const searchQuery = ref('')
    const sortedAndSearchedPosts = computed(()=>{
        return sortedPosts.value.filter(post => {
            return post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                post.body.toLowerCase().includes(searchQuery.value.toLowerCase())
        })
    })
    return{
        searchQuery,
        sortedAndSearchedPosts
    }
}

