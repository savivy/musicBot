<template>
  <div >
      <div :style="{background:bgc}" class="off"></div>
      <p>{{title}}</p>
  </div>
</template>

<script>
    export default {
        name: "song",
      props:["bgc","title"]
    }
</script>

<style scoped>

  .off {
    width: 100px;
    height: 100px;
  }
  p{
    margin-bottom: 20px;
  }
</style>
