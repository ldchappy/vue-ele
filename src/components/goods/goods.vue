<template>
    <div class="good">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="item in goods" class="nemu-item">
                    <span class="text border-1px" >
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
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
                                    <span class="count">乐手{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
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
import BScroll from 'better-scroll';

const ERR_OK = 0;
    export default{
        props:{
            seller : Object
        },
        components: { BScroll },
        data(){
            return {
                goods : []
            }
        },
        created(){
            this.classMap = ['jiang','man','shou','song','zhe'];

            this.$http.get('http://192.168.10.234:3000/api/goods').then(response =>{
                response = response.body;
                if(response.errno === ERR_OK){
                    this.goods = response.data;
                    console.log(this.goods);
                    this.$nextTick( () =>{
                        this._initScroll();
                    });
                }
            })
        },
        methods:{
            _initScroll(){
                this.meunScroll = new BScroll(this.$refs.menuWrapper,{});
                this.meunScroll = new BScroll(this.$refs.foodWrapper,{});
            }
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
            .title{
                padding-lift:14px;
                height:26px;
                line-height:26px;
                border-left:2px solid #d9ddde;
                font-size:12px;
                color:rgb(147,153,159);
                background:#f3f5f7;
            }
            .food-item{
                display:flex;
                margin:18px;
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
                  &:last-child{
                    &:after{
                        display:none;
                      }
                  }
                .icon{
                    flex: 0 0 57px;
                    margin-right:10px;
                }
                .content{
                    flex:1;
                    .name{
                        margin:2px 0 8px 0;
                        height:14px;
                        line-height:14px;
                        color:rgb(7,17,27);

                    }
                    .desc,.extra{
                        line-height:10px;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                    .desc{
                        margin-bottom:8px;
                    }
                    .extra{
                        .count{
                            margin-right:12px;
                        }
                    }
                    .price{
                        font-weight:700;
                        line-height:24px;
                        .now{
                            margin-right:8px;
                            font-size:14px;
                            color:rgb(240,20,20);
                        }
                        .old{
                            text-decoration:line-through;
                            font-size:10px;
                            color:rgb(7,27,37);
                        }
                    }
                }
            }
        }
    }
</style>