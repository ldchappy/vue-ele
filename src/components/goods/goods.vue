<template>
    <div class="good">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="nemu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
                    <span class="text border-1px" >
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list food-list-hook" v-for="item in goods">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item" @click="selectFood(food,$event)" v-for="food in item.foods">
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
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food='food' @add="addFood"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods"  :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>

        <food :food="selectedFood"></food>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import food from 'components/food/food';
import cartcontrol from 'components/cartcontrol/cartcontrol';

const ERR_OK = 0;
    export default{
        props:{
            seller : Object
        },
        data(){
            return {
                goods : [],
                listHeight : [],
                scrollY:0,
                selectedFood : {}
            }
        },
        created(){

            this.classMap = ['jiang','man','shou','song','zhe'];

            this.$http.get('http://192.168.10.234:3000/api/goods').then(response =>{
                response = response.body;
                if(response.errno === ERR_OK){
                    this.goods = response.data;
                    this.$nextTick( () =>{//$nextTick表明元素已经渲染好
                        this._initScroll();
                        this._calulateHeight();
                    });
                }
            })
        },
        computed:{
            currentIndex(){
                for(let i=0;i<this.listHeight.length;i++){
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                        return i;
                    }
                }
                return 0;
            },
            selectFoods(){
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count){
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        methods:{
            _initScroll(){
                this.meunScroll = new BScroll(this.$refs.menuWrapper,{
                    click:true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                    probeType:3,
                    click:true
                });
                this.foodsScroll.on('scroll',(pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calulateHeight(){
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for(let i = 0;i < foodList.length; i++){
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu(index,event){
                if(!event._constructed){//派发事件
                    return;
                }
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el,300);
            },
            //子组件$emit派发而来的事件
            addFood(target){
                this._drop(target);
            },
            _drop(target){
                //调用shopcar组件中的drop方法，向其传入当前点击的dom对象
                //this.$refs.shopcart.drop(target);
                //体验优化，异步执行下落动画
                this.$nextTick(() =>{
                    this.$refs.shopcart.drop(target);//这样可以调用到子组件的方法
                })
            },
            selectFood(food,event){
                if(!event._constructed){
                    return;
                }
                this.selectedFood = food;
            }
        },
        components:{
            shopcart,
            cartcontrol,
            food
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
                &.current{
                    font-size:24px;
                    position:relative;
                    margin-top:-1px;
                    z-index:10;
                    background:#fff;
                    font-weight:700;
                }
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
                    .cartcontrol-wrapper{
                        position:absolute;
                        right:0;
                        bottom:12px;
                    }
                }
            }
        }
    }
</style>