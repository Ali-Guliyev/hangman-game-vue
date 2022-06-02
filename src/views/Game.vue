<template>
    <p class="md:text-2xl sm:text-xl text-lg text-center">
        Topic: <span class="font-bold">{{ word.topic }}</span>
    </p>

    <div
        class="flex md:flex-row flex-col items-center justify-center md:gap-20 gap-5 mt-10"
    >
        <img
            class="md:w-60 w-40"
            :src="`/src/assets/img/${tries}.png`"
            alt=""
        />
        <p ref="wordEl" class="secretWord"></p>
    </div>

    <div ref="keyboard" class="keyboard"></div>
</template>

<script>
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import TopicService from "../services/TopicService";
import { randomItem, replaceAtIndex } from "../composables/utilityFunctions";
export default {
    setup() {
        const route = useRoute();
        const word = ref({ topic: "", title: "" });
        const tries = ref(0);
        const wordEl = ref(null);
        const keyboard = ref(null);

        const showResults = (isWon) => {
            if (isWon) {
                alert("WON");
            } else {
                alert("LOST");
            }
        };

        const checkAnswers = (btn) => {
            if (!btn.disabled) {
                // Correct
                if (word.value.title.includes(btn.id)) {
                    for (let i = 0; i < word.value.title.length; i++) {
                        if (word.value.title[i] == btn.id) {
                            wordEl.value.textContent = replaceAtIndex(
                                wordEl.value.textContent,
                                i,
                                btn.id
                            );
                            btn.classList.add("correct");
                        }
                    }
                }
                // WRONG
                else {
                    tries.value += 1;
                    btn.classList.add("wrong");
                    btn.disabled = true;

                    if (tries.value >= 6) {
                        showResults(false);
                    }
                }

                if (!wordEl.value.textContent.includes("_")) {
                    showResults(true);
                }
            }
        };

        onMounted(() => {
            // Getting keyvalues
            window.addEventListener("keypress", function (e) {
                let pressedKey = String.fromCharCode(e.keyCode);
                console.log(e.keyCode);
                keyboard.value.childNodes.forEach((btn) => {
                    if (btn.id == pressedKey) {
                        console.log("Key ", pressedKey);
                        checkAnswers(btn);
                    }
                });
            });

            // Getting all the data from an api
            let id = route.params.id;
            if (id == "random") {
                TopicService.getTopics().then((res) => {
                    let randomTopic = randomItem(res.data);
                    word.value.topic = randomTopic.name;
                    word.value.title = randomItem(randomTopic.words);
                });
            } else {
                TopicService.getTopicById(id).then((res) => {
                    word.value.topic = res.data.name;
                    word.value.title = randomItem(res.data.words);
                });
            }

            // Generating the letters in keyboard
            let alphabet = "abcdefghijklmnopqrstuvwxyz";
            for (let i = 0; i < alphabet.length; i++) {
                let letter = alphabet[i];
                let el = document.createElement("button");
                el.classList.add("keyboardButton");
                el.id = letter;
                el.textContent = letter;
                keyboard.value.appendChild(el);
            }

            keyboard.value.childNodes.forEach((btn) => {
                btn.addEventListener("click", () => {
                    checkAnswers(btn);
                });
            });
        });

        // Creating a secret word when page loads
        watch(() => {
            for (let i = 0; i < word.value.title.length; i++) {
                let letter = word.value.title[i];
                if (letter == " ") {
                    wordEl.value.innerHTML += " ";
                } else {
                    wordEl.value.innerHTML += "_";
                }
            }
        }, word);

        return { word, keyboard, tries, wordEl };
    },
};
</script>

<style>
.secretWord {
    @apply md:text-4xl text-xl tracking-widest;
}

.keyboard {
    @apply max-w-2xl flex flex-wrap justify-center gap-3 mx-auto mt-10;
}

.keyboardButton {
    @apply cursor-pointer flex items-center justify-center rounded-full md:w-10 md:h-10 w-7 h-7 border-2 border-primary text-primary text-xl font-medium hover:bg-primary hover:scale-110 hover:text-white transition duration-100;
}

.keyboardButton.correct {
    @apply bg-primary;
}

.keyboardButton.wrong {
    @apply bg-wrong border-wrong;
}

.keyboardButton.correct,
.keyboardButton.wrong {
    @apply hover:scale-100 text-white;
}
</style>
