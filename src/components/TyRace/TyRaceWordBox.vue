<template>
  <div class="word-box">
    <ul>
      <li
        v-for="(word, index) in words"
        :key="word"
      >
        <span :class="{
          selected: index + startCursor == currentCursor,
          wrong: (index + startCursor == currentCursor && isCurrentInputWrong) || inputMap.get(index + startCursor) === false,
          correct: inputMap.get(index + startCursor) === true
        }">{{ word }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true
    },
    inputMap: {
      type: Map,
      required: true
    },
    startCursor: {
      type: Number,
      required: true
    },
    currentCursor: {
      type: Number,
      required: true
    },
    isCurrentInputWrong: {
      Type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
.word-box {
  @apply bg-white rounded pt-4 pr-4 pl-4 mb-4;
  @apply font-serif text-2xl;

  ul {
    @apply list-none;

    & > li {
      @apply inline-block mr-3 mb-3;

      span {
        @apply p-2 rounded;

        &.selected {
          @apply bg-gray-400;
        }

        &.wrong {
          @apply text-red-600;
        }

        &.correct {
          @apply text-green-600;
        }
      }
    }
  }
}
</style>
