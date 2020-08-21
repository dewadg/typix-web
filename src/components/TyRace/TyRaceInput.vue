<template>
  <div class="word-input">
    <input
      type="text"
      :value="value"
      @input="handleInputChange"
      @keydown.space="handleInputSubmit"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  setup (props, context) {
    function handleInputChange (event) {
      context.emit('update:value', event.target.value.trim())
    }

    function handleInputSubmit () {
      context.emit('update:value', '')
    }

    return {
      handleInputChange,
      handleInputSubmit
    }
  }
}
</script>
