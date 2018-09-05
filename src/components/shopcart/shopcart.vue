<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount > 0}">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice > 0 }">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>

			<div class="ball-container">
				<div v-for="ball in balls">
					<transition @:befor-enter="beforEnter" @enter="Enter" @after-enter="afterEnter">
						<div v-show="ball.show" class="ball">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			/*deliveryPrice : Number*/
			deliveryPrice:{
				type : Number,
				default:0
			},
			minPrice:{
				type : Number,
				default:0
			},
			selectFoods:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		data(){
			return {
				//创建5个小球用于动画
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					}
				],
				/*下落小球*/
				dropBalls:[]
			}
		},
		computed:{
			totalPrice(){//总价
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				})
				return total;
			},
			totalCount(){//商品个数总和
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return `还差￥{diff}起送`;
				}else{
					return '去结算';
				}
			},
			payClass(){
				if(this.minPrice > this.totalPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
			}
		},
		methods:{
			drop(el){
				console.log(el);//这个el是cart-add元素
				for(let i = 0;i < this.balls.length;i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforEnter(el){
					let count = this.balls.length;
					while(count--){
						let ball = this.balls[count];
						if(ball.show){
							//getBoundingClientRect --> 获取元素位置
							//元素相对于视口的距离
							let rect = ball.el.getBoundingClientRect();

							//x,y为初始点 与 目标点的差值
							let x = rect.left - 32;
							let y = -(window.innerHeight - rect.top - 22);
							console.log(x,y)
							// el （初始位置为 0，0，0）和购物车icon在一起，将小球（el）  放到加号位置去
							el.style.display = '';

							//纵向动画
							el.style.webkitTransform = `translate3d(0,${y}px,0)`;
							el.style.transform = `translate3d(0,${y}px,0)`;

							//横向动画  inner-hook->仅定义类dom选择器，不作样式
							let inner = el.getElementsByClassName('inner-hook')[0];
							inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
							inner.style.transform = `translate3d(${x}px,0,0)`;
						}
					}
				},
				Enter(el,done){
					//手动触发浏览器重绘，便于translate3d，--rf 变量不会使用
					let rf = el.offsetHeight;
					this.$nextTick(() => {
						el.style.display = '';
						el.style.webkitTransform = 'translate3d(0,0,0)';
						el.style.transform = 'translate3d(0,0,0)';

						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = 'translate3d(0,0,0)';
						inner.style.transform = 'translate3d(0,0,0)';

						el.addEventListener("transitionend",done);
					})

				},
				afterEnter(el){
					//此轮动画结束后，将此次的 ball 取出 ，ball状态重置，，el display:none
					let ball = this.dropBalls.shift();
					if(ball){
						ball.show = false;
						el.style.display = 'none';
					}
				}
		}
	}
</script>
<style lang="scss">
	.shopcart{
		position:fixed;
		left:0;
		bottom:0;
		z-index:10;
		width:100%;
		height:48px;
		background:#002658;
		.content{
			display:flex;
			background:#141d27;
			font-size:0;
			.content-left{
				flex:1;
				.logo-wrapper{
					display:inline-block;
					position:relative;
					top:-10px;
					margin:0 12px;
					padding:6px;
					width:56px;
					height:56px;
					box-sizing:border-box;
					vertical-align:top;
					border-radius:50%;
					background:#141d27;
					.logo{
						width:100%;
						height:100%;
						border-radius:50%;
						background:#2b3a3c;
						text-align:center;
						.icon-shopping_cart{
							font-size:24px;
							line-height:44px;
							color:#80b58a;
						}
					}
				}
				&.highlight{
					background:rgb(0,160,220);
				}
				.num{
					position:absolute;
					top:0;
					right:0;
					width:24px;
					height:16px;
					line-height:16px;
					text-align:center;
					font-size:9px;
					border-radius:16px;
					font-weight:700;
					color:#fff;
					background:rgb(240,20,20);
					box-shadow:0 4px 8px rgba(0,0,0,.4);

				}
				.price{
					display:inline-block;
					vertical-align:top;
					margin-top:12px;
					line-height:24px;
					padding-right:12px;
					box-sizing:border-box;
					border-right:1px solid rgba(255,255,255,.2);
					font-size:16px;
					font-weight:700;
					color:rgba(255,255,255,.2);
					&.highlight{
						color:rgb(0,160,220);
					}
				}
				.desc{
					display:inline-block;
					vertical-align:top;
					margin:12px 0 0 12px;
					line-height:24px;
					padding-right:12px;
					color:rgba(255,255,255,.3);
					width: 40%;
    				font-size: 14px;
				}
			}
			.content-right{
				flex:0 0 105px;
				width:105px;
				.pay{
					height:48px;
					line-height:48px;
					text-align:center;
					font-size:12px;
					color:rgba(255,255,255,.4);
					font-weight:700;
					&.not-enough{
						background:#2b333c;
					}
					&.enough{
						background:#006688;
					}
				}
			}
		}
		.ball-container{
			.ball{
				position:fixed;
				left:32px;
				bottom:22px;
				z-index:200;
				&.drop-transition{
					transition:all .4s cubic-bezier(0.49,-0.29,0.75,0.41);
					.inner{
						width:16px;
						height:16px;
						border-radius:50%;
						background:rgb(0,160,220);
						transition:all .4s;
					}
				}
				
			}
		}
	}
</style>
