<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" />
					<div class="back">
						<i class="back1" @click="back">返回</i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>

					<div class="cartcontrol-wrapper" v-show="food.count>0">
					<cartcontrol :food="food"></cartcontrol>
					</div><!-- addFirst(food,$envet) 可以不传，默认有$event-->
					<transition name="fade">
						<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">
							加入购物车
						</div>
					</transition>
				</div>
				
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split v-show="food.info"></split>

				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
				</div>

			</div>
		</div>
	</transition>
</template>
<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
	props:{
		food:Object
	},
	data(){
		return {
			showFlag : false,
			selectType:ALL,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'推荐',
				nogative:'吐槽'
			}
		}
	},
	created:function (){
		console.log(this.food);
	},
	components:{
		cartcontrol,
		split,
		ratingselect
	},
	methods :{
		show(){
			this.showFlag = true;
			this.selectType = ALL;
			this.onlyContent = true;

			this.$nextTick(() => {
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.food,{
						click : true
					})
				}else{
					this.scroll.refresh();
				}
			})
		},
		addFirst(event){
			console.log(123)
			if(!event._constructed){
				return;
			}
			console.log(456)
			this.$emit('add',event.target);
			Vue.set(this.food,'count',1);
		},
		back(){
			this.showFlag = false;
		}
	}
}
</script>
<style lang="scss" scoped>
	.food{
		position:fixed;
		top:0;
		width:100%;
		left:0;
		bottom:48px;
		z-index:9;
		background:#fff;
		/* 进入离开动画均有 */
		&.move-enter-active, &.move-leave-active {
			transition: all 0.2s linear
		}
		&.move-enter, &.move-leave-active {
			transform: translate3d(100%, 0, 0)
		}
		.food-content{
			position:relative;
			.image-header{
				position:relative;
				width:100%;
				height:0;
				padding-top:100%;
				img{
					position:absolute;
					top:0;
					left:0;
					width:100%;
					height:100%;
				}
				.back{
					position:absolute;
					top:16px;
					left:3px;
					.back1{
						font-size: 14px;
					    border: 1px solid #fff;
					    border-radius: 10px;
					    padding: 2px 6px;
					    color:#fff;
					}
				}
			}
			.content{
				position :relative;
				padding :18px;
				.title{
					font-size :14px;
					font-weight :700;
					line-height :14px;
					margin-bottom :8px;
					color :rgb(7,17,27);
				}
				.details{
					margin-bottom :18px;
					color :rgb(147,153,159);
					font-size :10px;
					line-height :10px;
					.sell-count,.rating{
						font-size:10px;
						color:rgb(147,153,159);
					}
					.sell-count{
						margin-right:12px;
					}
				}
				.price{
					font-weight :700;
					line-height: 24px;
					.now{
						margin-right :8px;
						font-size :14px;
						color :rgb(240,20,20);
					}
					.old{
						color :rgb(147,153,159);
						text-decoration :line-through;
						font-size :10px;
					}
				}
				.cartcontrol-wrapper{
					position :absolute;
					right: 12px;
					top: 50px;
				}
				.buy{
					position: absolute;
					right: 18px;
    				top: 50px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					border-radius: 12px;
					font-size: 10px;
					color: #fff;
					background: rgb(0, 160, 220);
					opacity: 1;
					&.fade-enter-active, &.fade-leave-active {
						transition: all 1s;
					}
					&.fade-enter, &.fade-leave-active {
						opacity: 0;
						z-index: -1;
					}
				}
			}
			.info{
				padding:18px;
				.title{
					line-height:14px;
					margin-bottom:6px;
					font-size:14px;
					color:rgba(7,27,37,.3)
				}
				.text{
					line-height:24px;
					padding:0 8px;
					font-size:12px;
					color:rgb(77,85,93);
				}
			}
			//评价样式
			.rating{
				padding-top :18px;
				.title{
					line-height: 14px;
					margin-left: 6px;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}
				.rating-wrapper{
					padding :0 18px;
					.rating-item{
						position :relative;
						padding :16px 0;
						border-top:rgba(7,17,27,0.1);
						.user{
							position: absolute;
							right: 0;
							line-height :12px;
							img {
								border-radius: 50%;
								margin-left: 6px;
							}
						}
						.time{
							margin-bottom :6px;
							font-size :10px;
							color :rgb(147,153,159);
							line-height :12px;
						}
						.text{
							color:rgb(7,17,27);
							font-size :12px;
							line-height :12px;
							vertical-align :top;
							.icon-thumb_up,.icon-thumb_down{
								margin-right :4px;
								font-size :12px;
								line-height :24px;
							}
							.icon-thumb_up{
								color :rgb(0,160,220);
							}
							.icon-thumb_down{
								color :rgb(147,153,159);
							}
						}
					}
					.no-ratings{
						color: rgb(147, 158, 159);
						font-size :16px;
						text-align :center;
						margin-top: 10px;;
					}
				}
			}
		}
	}


</style>