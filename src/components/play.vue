<template>
  <div class="play">
    <div class="bgc"></div>
    <p>{{songList[index].name}}</p>
    <p>{{songList[index].singer}}</p>
    <div class="progress-box">
        <span>{{currentTime | format}}</span>
      <div class="progress"  ref="progress" @click="changeProgress($event)">
        <div class="true-progress" ref="progressPink" :style="truth" ></div>
        <div class="slide" ref="slider" :style="progressSlide"></div>
      </div>
        <span>{{duration | format}}</span>
    </div>
    <div class="btn">
      <button @click="prev">上一首</button>
      <button @click="play">{{flag?"暂停":"播放"}}</button>
      <button @click="next">下一首</button>
    </div>
    <audio  :src="songList[index].src" ref="audio" @timeupdate="update" @canplaythrough="getDuration"></audio>
  </div>
</template>

<script>
    export default {
        name: "play",

      data() {
        return {
          duration:0,
          currentTime:0,
          left:0,
          index:1,
          flag:false,
          songList: [
            {
              name:"好嗨哟",
              singer:"AAA",
              src:require('../assets/好嗨哟.mp3')
            },
            {
              name:"猫姐姐",
              singer: "毛不易",
              src:require('../assets/毛姐姐.mp3')
            },
            {
              name:"沙漠骆驼",
              singer: "BBB",
              src:require('../assets/沙漠骆驼.mp3')
            }
          ]
        }
      },
      computed: {
        truth() {
          return `width:${this.left}px`
        },
        progressSlide(){
          return `left:${this.left}px`
        }
      },
      mounted() {
           const  progressSlider=this.$refs.slider;
           const  progressMain=this.$refs.progress;
           const progressPink=this.$refs.progressPink;
           const audio=this.$refs.audio;
        progressSlider.addEventListener("mousedown", function (ev) {
          ev.preventDefault();
          this.eX = ev.offsetX;
          //鼠标移动
          document.addEventListener("mousemove", mousemoveFn);
        });

        // 鼠标抬起
        document.addEventListener("mouseup", function () {
          // 移除 移动事件
          this.removeEventListener("mousemove", mousemoveFn);
        });
        function mousemoveFn(ev) {
          //获取left值
         this.left = ev.clientX - progressMain.offsetLeft - progressSlider.eX;
          let maxValue = progressMain.clientWidth - progressSlider.offsetWidth;
          // 边界判断
          if (this.left <= 0) {
            this.left = 0;
          } else if (this.left >= maxValue) {
            this.left= maxValue;
          }
          // 设置滑块  和  进度条
          progressSlider.style=this.left+'px'
         progressPink.style=this.left+'px'

          // 比例
         let scal = this.left / maxValue;

          //当前时间更新
          audio.currentTime = audio.duration * scal;
        }

      },
      methods: {
        play() {
          if(this.$refs.audio.paused){
            this.$refs.audio.play()
            this.flag=true
          }else{
            this.$refs.audio.pause()
            this.flag=false
          }
        },
        update(){
          this.currentTime = parseInt(this.$refs.audio.currentTime)
          let cur = this.$refs.audio.currentTime;
          let  dur=this.$refs.audio.duration;
          let rangeValue=cur / dur;
         this.left=(this.$refs.progress.clientWidth-this.$refs.slider.offsetWidth)*rangeValue


        },
        getDuration() {
          console.log(this.$refs.audio.duration)
          this.duration = parseInt(this.$refs.audio.duration)
        },
        // changeSlide(ev){
        //
        //  this.left =((ev.pageX-60)/this.$refs.progress.offsetWidth) *100;
        //   console.log(this.left)
        //   var maxValue = this.$refs.progress.clientWidth - this.$refs.slide.offsetWidth;
        //   // 边界判断
        //   if (this.left <= 0) {
        //     this.left = 0;
        //   } else if (this.left >= maxValue) {
        //     this.left= maxValue;
        //   }
        //   // 设置滑块  和  进度条
        //   this.$refs.slide.style=this.left+'px'
        //   this.$refs.truth.style=this.left+'px'
        //
        //   // 比例
        //   var scal = this.left / maxValue;
        //
        //   //当前时间更新
        //   this.$refs.audio.currentTime = this.$refs.audio.duration * scal;
        //
        //
        // },
        changeProgress(ev){
          this.left = ev.clientX - this.$refs.progress.offsetLeft;
          let maxValue = this.$refs.progress.clientWidth - this.$refs.slider.offsetWidth;
          // 边界判断
          if (this.left <= 0) {
            this.left = 0;
          } else if (this.left >= maxValue) {
            this.left= maxValue;
          }
          // 设置滑块  和  进度条
          this.$refs.slider.style=this.left+'px'
          this.$refs.progressPink.style=this.left+'px'

          // 比例
          let scal = this.left / maxValue;

          //当前时间更新
          this.$refs.audio.currentTime = this.$refs.audio.duration * scal;
        },
        prev(){
              this.index--;
        },
        next(){
              this.index++;
        }
      },
    }
</script>

<style scoped>
.play{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  left: 0;
   top: 0;
}
  .bgc{
    width: 200px;
    height: 200px;
    margin: 50px auto;
    background-color: #fadaef;

  }
  .progress-box{
    display: flex;
    margin-top: 20px;
    align-items: center;
  }
  .progress-box span{
    width: 80px;
    text-align: center;
  }
  .progress{
    flex: 1;
    height: 6px;
    background-color: #cccccc;
    position: relative;
  }
  .true-progress{
    width: 0;
    height: 6px;
    border-radius: 6px;
    background-color: #333;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  }
  .slide{
    width: 16px;
    height: 10px;
    border-radius: 7px;
    background-color: lightskyblue;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  }
  .btn{
    margin: 50px 20px;
    display: flex;
    justify-content: space-between;
  }
  .btn button{
    width: 80px;
  }
</style>
