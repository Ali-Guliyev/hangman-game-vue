<template>
    <div
        v-if="topics.length"
        class="flex flex-wrap justify-center sm:flex-row flex-col gap-4 max-w-7xl mx-auto sm:px-10 px-20"
    >
        <router-link
            class="topicContainer"
            :to="{ name: 'Game', params: { id: 'random' } }"
        >
            <div class="imgContainer">
                <img src="../assets/img/random.png" alt="" />
            </div>
            <p class="topicName">Random</p>
        </router-link>

        <router-link
            class="topicContainer"
            v-for="topic in topics"
            :key="topic.id"
            :to="{ name: 'Game', params: { id: topic.id } }"
        >
            <div class="imgContainer">
                <img :src="topic.image" alt="" />
            </div>
            <p class="topicName">
                {{ topic.name }}
            </p>
        </router-link>
    </div>
    <Spinner v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import TopicService from "../services/TopicService";
import Spinner from "../components/Spinner.vue";
export default {
    components: { Spinner },
    setup() {
        const topics = ref([]);

        TopicService.getTopics().then((res) => {
            topics.value = res.data;
        });

        return { topics };
    },
};
</script>

<style scoped>
.topicContainer {
    @apply flex flex-col items-center border-2 border-primary rounded-xl cursor-pointer hover:scale-110 transition duration-100;
}

.imgContainer {
    @apply p-8;
}

.imgContainer img {
    @apply md:w-28 sm:w-20 w-14;
}

.topicName {
    @apply w-full text-center md:text-lg sm:text-base text-sm py-1 px-4 border-t-2 border-primary;
}
</style>
