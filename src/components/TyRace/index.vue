<template>
  <div class="race">
    <TyRaceWordBox
      :words="wordsToDisplay"
      :start-cursor="startCursor"
      :current-cursor="currentWordIndex"
      :input-map="inputMap"
      :is-current-input-wrong="isCurrentInputWrong"
    />
    <TyRaceInput
      v-model="currentInput"
      @submit="handleInputSubmit"
    />
  </div>
</template>

<script>
import { computed, ref, watch, reactive } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import TyRaceWordBox from './TyRaceWordBox'
import TyRaceInput from './TyRaceInput'
import { FIND_RACE_BY_ID } from '@/gql/queries/raceQueries'

const MAX_WORDS = 14

export default {
  components: {
    TyRaceWordBox,
    TyRaceInput
  },

  setup () {
    const {
      result,
      onResult
    } = useQuery(FIND_RACE_BY_ID, { id: '5f3f55ef6c0a16dd944e15e4' })

    // Initial states
    const currentInput = ref('')
    const currentWordIndex = ref(0)
    const inputMap = reactive(new Map())

    // Pagination
    const startCursor = ref(0)
    const currentPage = ref(1)

    const wordsToDisplay = computed(() => !result.value
      ? []
      : result.value.race.words.slice(startCursor.value, startCursor.value + MAX_WORDS)
    )

    const currentWord = computed(() => result.value.race.words
      ? result.value.race.words[currentWordIndex.value]
      : ''
    )

    const isCurrentInputWrong = computed(() => {
      // False when still pristine
      if (!currentInput.value.length) return false

      // If input is longer than designated word, it's clearly wrong
      if (currentInput.value.length > currentWord.value.length) return true

      for (let i = 0; i < currentInput.value.length; i++) {
        if (currentInput.value.charAt(i) != currentWord.value.charAt(i)) {
          return true
        }
      }

      return false
    })

    // Watch for page changes
    watch(currentWordIndex, (value) => {
      if (value === MAX_WORDS * currentPage.value) {
        startCursor.value = value
        currentPage.value++
      }
    })

    // Populate input map
    onResult((result) => {
      result.data.race.words.forEach((item, index) => {
        inputMap.set(index, null)
      })
    })

    function handleInputSubmit (event) {
      inputMap.set(currentWordIndex.value, event.target.value === currentWord.value)

      currentWordIndex.value++
    }

    return {
      startCursor,

      wordsToDisplay,
      currentWordIndex,
      currentWord,

      inputMap,
      currentInput,
      isCurrentInputWrong,

      handleInputSubmit
    }
  }
}
</script>

<style lang="scss">
.race {
  .word-input {
    @apply rounded;

    input[type="text"] {
      @apply w-full p-4;
      @apply text-2xl font-serif;
    }
  }
}
</style>
