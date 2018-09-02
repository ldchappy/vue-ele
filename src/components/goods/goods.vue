<template>
    <div class="good">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="nemu-item">
                    <span class="text border-1px" >
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li class="food-list" v-for="item in goods">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="food in item.foods">
                            <div class="icon">
                                <img :src="food.icon" width="100" height="100">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">
                                    {{food.description}}
                                </p>
                                <div class="extra">
                                    <span>乐手{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span>￥{{food.price}}</span>
                                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
const ERR_OK = 0;
    export default{
        props:{
            seller : Object
        },
        data(){
            return {
                goods : []
            }
        },
        created(){
            this.classMap = ['jiang','man','shou','song','zhe'];

            this.$http.get('http://192.168.0.103:3000/api/goods').then(response =>{
                response = response.body;
                if(response.errno === ERR_OK){
                    this.goods = response.data;
                    console.log(this.goods)
                }
            })
        }
    }
</script>
<style lang="scss">
@import '../../../static/mixin.scss';
    .good{
        position:absolute;
        top:174px;
        width:100%;
        bottom:46px;
        display:flex;
        overflow:hidden;
        .menu-wrapper{
            flex: 0 0 80px;
            width:80px;
            background:#f3f5f7;
            .nemu-item{
                display:table;
                height:54px;
                width:80px;
                line-height:54px;
                text-align: center;
                position: relative;
                .icon{
                    display:inline-block;
                    width:12px;
                    height:12px;
                    margin-right:4px;
                    vertical-align: middle;
                    background-size:12px 12px;
                    background-repeat:no-repeat;
                    &.jiang{
                        @include bg-image('../../assets/png/jiang')
                    }
                    &.man{
                        @include bg-image('../../assets/png/man')
                    }
                    &.shou{
                        @include bg-image('../../assets/png/shou')
                    }
                    &.song{
                        @include bg-image('../../assets/png/song')
                    }
                    &.zhe{
                        @include bg-image('../../assets/png/zhe')
                    }
                }
                .text{
                    font-size:12px;
                    display:table-cell;
                    width:80px;
                    vertical-align:middle;
                    &:after{
                        display:block;
                        position:absolute;
                        left:0;
                        bottom:0;
                        width:100%;
                        border-top:1px solid rgba(7,27,37,.3);
                        content:' ';
                      }
                }
            }
        }
        .foods-wrapper{
            flex:1;
        }
    }
</style>