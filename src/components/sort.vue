<template>
  <div>
    <button @click="show">播放</button>
  </div>
</template>

<script>
    export default {
        name: "sort",
      methods: {
        show() {
              this.$pub.$emit('link',"true")
        }
      },
    }
</script>

<style scoped>

</style>
