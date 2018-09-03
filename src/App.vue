<template>
  <div id="app">
    <myHeader :seller="seller"></myHeader>
    <div class="tab border-1px">
      <div class="tab-item">
       <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import myHeader from "./components/header/header"

const ERR_OK = 0;

export default {
  data() {
    return {
      seller :{}
    }
  },
  created(){
    this.$http.get('http://192.168.10.234:3000/api/seller').then(response => {
      response = response.body;
      if(response.errno === ERR_OK){
        this.seller = response.data;
        /*需要把seller对象传给header组件   在上面加上 :seller*/
      }
    },response => {
        console.log('出错了')
    })
  },
  components:{
    myHeader
  }
}
</script>

<style lang="scss" type="text/css" scoped>

  #app{
    .tab{
      display: flex;
      width: 100%;
      height:40px;
      line-height:40px;
      position:relative;
      &:after{
        display:block;
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        border-top:1px solid rgba(7,27,37,.3);
        content:' ';
      }
      .tab-item{
        flex: 1;
        text-align: center;
        a{
          display:block;
          color:rgb(77,85,93);
          font-size:14px;
          &.active{
            color:rgb(240,20,20)
          }
        }
      }
    }
  }
</style>
