import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        sortOptions: [{value: 'title', name: 'По названию'}, {value: 'body', name: 'По содержимому'},],
        page: 1,
        limit: 10,
        totalPages: 0,
        isDataLoaded: false
    }), getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        }, sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => {
                return post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || post.body.toLowerCase().includes(state.searchQuery.toLowerCase())
            })
        }
    }, mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostLoading = bool
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setIsDataLoaded(state, isDataLoaded) {
            state.isDataLoaded = isDataLoaded
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            commit('setLoading', true)
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit, _page: state.page
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
                commit('setIsDataLoaded', true)
                commit('setLoading', false)
            } catch (e) {
                alert('ошибка')
            } finally {
                this.isPostLoading = false
            }
        },
        async loadMorePosts({state, commit}) {
            commit('setPage', state.page + 1)
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit, _page: state.page
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e) {
                alert(e.message)
            } finally {
            }
        },
    },
    namespaced: true

}