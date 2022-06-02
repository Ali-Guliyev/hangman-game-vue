import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://my-json-server.typicode.com/Ali-Guliyev/hangman-game-vue",
    //
    withCredentials: false,
    header: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default {
    getTopics() {
        return apiClient.get("/topics");
    },
    getTopicById(id) {
        return apiClient.get(`/topics/${id}`);
    },
};
