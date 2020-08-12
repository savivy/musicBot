<template>
      <div>
        <h3>官方歌单</h3>
        <div class="box">
          <Song v-for="(item,index) in offList" :key="index" :bgc="item.bgc" :title="item.title"></Song>
        </div>
        <h3>达人歌单</h3>
        <div class="box">
          <Song v-for="(item,index) in fashionList" :key="index" :bgc="item.bgc" :title="item.title"></Song>
        </div>
      </div>
</template>

<script>
  import Song from './song'
    export default {
        name: "recommend",
      components:{Song},
      data() {
        return {
          offList:[
            {
              bgc:'#bfc',
              title:'流行节奏控'
            },
            {
              bgc:'#f20',
              title: "古风音乐"
            },
            {
              bgc:'#333',
              title: "动漫主题曲"
            }
          ],
          fashionList:[
            {
              bgc:'#FFC0CB',
              title:'经典咏流传'
            },
            {
              bgc:'#DDA0DD',
              title: "电视主题曲"
            },
            {
              bgc:'#7B68EE',
              title: "舒缓抑郁情绪"
            }
          ]
        }
      },
    }
</script>

<style scoped>
  .box{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  h3{
    margin: 20px 0;
  }
</style>
