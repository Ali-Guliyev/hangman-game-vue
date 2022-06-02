<template>
    <nav class="py-4 px-10 bg-white border-b-2 border-primary">
        <ul class="flex justify-between max-w-7xl mx-auto">
            <router-link :to="{ name: 'Home' }">
                <li>
                    <img src="../assets/img/icon.png" alt="" />
                    <p>Hangman</p>
                </li>
            </router-link>

            <router-link :to="{ name: '' }">
                <li>
                    <img src="../assets/img/user.png" alt="" />
                    <p>Ali Guliyev</p>
                </li>
            </router-link>
        </ul>
    </nav>
</template>

<style scoped>
li {
    @apply flex items-center md:gap-3 sm:gap-2 gap-1;
}

li p {
    @apply md:text-lg sm:text-base text-sm;
}

li img {
    @apply md:w-10 sm:w-8 w-7;
}
</style>
