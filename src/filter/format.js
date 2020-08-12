import Vue  from 'vue'
Vue.filter("format",(time)=>{
    let m=parseInt(time/60)
   let s=time%60
    m=m<10?"0"+m:m;
    s=s<10?"0"+s:s;
    return m+":"+s
})
