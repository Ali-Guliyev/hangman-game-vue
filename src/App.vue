<template>
    <Navbar class="mb-4" />
    <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
    components: { Navbar },
};
</script>
