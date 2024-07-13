import Main from "@/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage.vue";
import About from "@/pages/About.vue";
import PostItemPage from "@/pages/PostItemPage.vue";
import PostPageWithStore from "@/pages/PostPageWithStore.vue";
import PostPageComposition from "@/pages/PostPageComposition.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostItemPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageComposition
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router