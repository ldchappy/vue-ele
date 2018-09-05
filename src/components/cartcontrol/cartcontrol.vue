<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
				<span class="inner"> - </span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
		<!-- 阻止事件冒泡，防止点击事件穿透(使用.stop.prevent)，进入商品详情页 -->
		<div class="cart-add" @click.stop.prevent="addCart"> + </div>
	</div>
</template>
<script>
import Vue from 'vue';
	export default {
		//当给一个不存在的字段去赋值是无效的，因为 Vue 无法探测普通的新增属性,需要重新引入vue，使用vue.set()
		
		props:{
			food:Object
		},
		/*created (){ 这里只是测试加载后是否有数据
			console.log(this.food)
		},*/
		methods:{
			addCart(event){
				if(!event._constructed){//解决在pc和移动中点击的次数相同
					return;
				}
				if(!this.food.count){//是否存在
					/*this.food.count = 1  无效*/
					Vue.set(this.food,'count',1)
				}else{
					this.food.count ++;
				}

				//向父组件派发事件，并传递当前dom元素
				//add为父组件的事件名
				this.$emit('add',event.target);
			},
			decreaseCart(event){
				if(!event._constructed){//解决在pc和移动中点击的次数相同
					return;
				}
				if(this.food.count > 0){
					this.food.count --;
				}
			}
		}
	}
</script>
<style lang="scss">
	.cartcontrol{
		font-size:0;
		.cart-decrease{
			display:inline-block;
			padding:6px;
			line-height:24px;
			vertical-align:top;
			font-size:24px;
			color:rgb(0,160,220);

			transform:translate3d(0,0,0);
			opacity:1;

			.inner{
				display:inline-block;
				text-align:center;
				font-size:24px;
				line-height:24px;
				color:rgb(0,160,220);
				transition:all .4s linear;
				transform:rotate(0deg);
			}
			&.move-enter,&.move-leave{
				opacity:0;
				transform:translate3d(24px,0,0);
				.inner{
					transform:rotate(180deg);
				}
			}
			/* &.move-leave-active{
				transition:all .4s linear;
				opacity:0;
				transform:translate3d(24px,0,0);
				.inner{
					transform:rotate(180deg);
				}
			}
			&.move-enter-active{
				transition:all .4s linear;
				opacity:1;
				transform:translate3d(24px,0,0);
				.inner{
					transform:rotate(180deg);
				}
			} */
		}
		.cart-count{
			display:inline-block;
			vertical-align:top;
			width:12px;
			padding-top:6px;
			line-height:24px;
			text-align:center;
			font-size:10px;
			color:rgb(147,153,159)
		}
		.cart-add{
			display:inline-block;
			line-height:24px;
			font-size:24px;
			vertical-align:top;
			padding:6px;
			color:rgb(0,160,220);
		}
	}
</style>
