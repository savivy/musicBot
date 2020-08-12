<template>
  <div id="app">
    <header>
        <div class="recommend" @click="comNa='Recommend'" :class="{'active':comNa=='Recommend'}">推荐</div>
        <div class="sort" @click="comNa='Sort'" :class="{'active':comNa=='Sort'}">排行</div>

    </header>
    <main>
      <div :is="comNa"></div>
    </main>
    <footer></footer>
      <Play v-show="flag"></Play>
  </div>
</template>

<script>
import Recommend from './components/recommend'
import Sort from  './components/sort'
import  Play from './components/play'
export default {
  name: 'App',
  components: {
    Recommend,
    Sort,
    Play
  },
  data() {
    return {
      comNa:"Recommend",
      flag:false


    }
  },
  mounted() {
    this.$pub.$on('link',(bool)=>{
      this.flag=bool
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding:0 ;
}
 html,body,#app{
   width: 100%;
   height: 100%;
   overflow: hidden;
 }
#app {
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
  overflow-y: auto;
}
header {
  height: 44px;
  width: 100%;
  background-color:#eee;
  display: flex;
}
  header div{
    flex:1;
    text-align: center;
     line-height: 44px;
  }
  .active{
    color: #42b983;
  }
  /*.sort{*/
  /*  color: #42b983;*/
  /*}*/

</style>
