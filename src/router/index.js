import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "Home",
            path: "/",
            component: Home,
        },
        {
            name: "Game",
            path: "/play/:id",
            component: Game,
        },
    ],
});
