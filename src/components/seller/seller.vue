<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
        	<!-- 概述 -->
        	<div class="overview">
        		<h1 class="title">{{seller.name}}</h1>
        		<div class="desc">
        			<!-- <star :size="36" :score="seller.score"></star> -->
        			<div class="text">{{seller.ratingCount}}</div>
        			<div class="text">{{seller.sellCount}}</div>
        		</div>
        		<ul class="remark">
        			<li class="block">
        				<h1 class="title">起送价</h1>
        				<div class="content">
        					<span class="stress">{{seller.minPrice}}</span>元
        				</div>
        			</li>
        			<li class="block">
        				<h1 class="title">商家配送</h1>
        				<div class="content">
        					<span class="stress">{{seller.deliveryPrice}}</span>元
        				</div>
        			</li>
        			<li class="block">
        				<h1 class="title">平均配送时间</h1>
        				<div class="content">
        					<span class="stress">{{seller.deliveryTime}}</span>分钟
        				</div>
        			</li>
        		</ul>
        		<!-- 收藏 -->
        		<div class="favorite" @click="toggleFavorite">
        			<span class="icon-favorite" :class="{'active':favorite}"></span>
        			<span class="text">{{favoriteText}}</span>
        		</div>
        	</div>
        	<split></split>
			<!-- 商家公告 -->
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p>{{seller.bulletin}}</p>
				</div>
				<!-- supports内容 -->
				<ul class="support" v-if="seller.supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<!-- 商家实景 -->
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="picwrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img width="120" height="90" :src="pic" alt="">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<!-- 商家信息 -->
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>

        </div>
    </div>
</template>
<script>

import split from '../../components/split/split';
import BScroll from 'better-scroll';
import {saveToLocal,loadFromLocal} from '../../common/js/date';


export default{
	props:{
		seller : Object
	},
	data(){
		return {
			favorite:(() => {
				return loadFromLocal(this.seller.id,'favorite',false);
			}) 
		}
	},
	created(){
		this.classMap = ['jiang','man','shou','song','zhe'];
	},
	mounted(){
		this._initScroll();
		this._initPicScroll();
	},
	updated(){
		this.scroll.refresh();
	},
	watch:{
		seller(){
			this.$nextTick(() => {
				this._initPicScroll();
			})
		}
	},
	methods:{
		_initScroll(){
			console.log(123)
			this.scroll = new BScroll(this.$refs.seller,{click:true});
		},
		_initPicScroll(){
			if(this.seller.pics){
				let picWidth = 120;
				let margin = 6;
				let width = this.seller.pics.length * (picWidth + margin) -margin;
				this.$refs.picList.style.width = width + 'px';
				this.picScroll = new BScroll(this.$refs.picWrapper,{
					scrollX : true,
					eventPassthrough:'vertical'
				})
			}
		},
		toggleFavorite(event){
			if(!event._constructed) return;
			this.favorite = !this.favorite;
			saveToLocal(this.seller.id,'favorite',this.favorite);
		}
	},
	computed:{
		favoriteText(){
			return this.favorite ? '收藏' : '未收藏'
		}
	},
	components:{
		split
	}
}
</script>
<style lang="scss" scoped>
@import '../../../static/mixin.scss';
	.seller{
		position:absolute;
		left:0;
		right:0;
		top:174px;
		bottom :0;
		width:100%;
		overflow :hidden;
		.seller-content{
			.overview{
				padding :18px;
				position :relative;
				.title{
					color :rgb(7,17,27);
					font-size :14px;
					line-height :14px;
					font-weight :800;
					margin-bottom :8px;
				}
				.desc{
					font-size :0;
					padding : 8px 0  18px 0;
					border-top:1px solid rgba(7, 17, 27, 0.1);
					.star{
						display :inline-block;
						margin-right :8px;
					}
					.text{
						display :inline-block;
						color :rgb(77,85,93);
						font-size :10px;
						line-height :18px;
						margin-right :12px;
						vertical-align: top;
					}
				}
				.remark{
					display :flex;
					margin-top :18px;
					.block{
						flex:1;
						text-align: center;
						border-right :1px solid #eee;
						&:last-child{
							border :none;
						}
						.title{
							margin-bottom :4px;
							font-size :10px;
							color :rgb(147,153,159);
							line-height :12px;
						}
						.content{
							font-size :10px;
							.stress{
								font-size :24px;
								font-weight :200;
								color: rgb(7, 17, 27);
								line-height :24px;
							}
						}
					}
				}
				.favorite{
					position :absolute;
					right:18px;
					top:18px;
					width: 50px;
					text-align: center;
					.icon-favorite {
						display: block;
						margin-bottom: 4px;
						line-height: 24px;
						font-size: 24px;
						color: #d4d6d9;
					}
					.icon-favorite.active {
						color: red;
					}
					.text {
						line-height: 10px;
						font-size: 10px;
						color: rgb(77, 85, 93);
					}
				}
			}
		}
		.bulletin{
			padding :18px;
			padding-bottom :0;
			.title{
				color :rgb(7,17,27);
				font-size :14px;
				line-height :14px;
				font-weight :800;
				margin-bottom :8px;
			}
			.content-wrapper{
				font-size :12px;
				padding:0 12px;
				padding-bottom :16px;
				border-top:1px solid rgba(7, 17, 27, 0.1);
				p{
					color :rgb(240,20,20);
					font-weight :400;
					line-height :24px;
				}
			}
			.support{
				.support-item{
					padding :16px 12px;
					border-top:1px solid rgba(7, 17, 27, 0.1);
					/* font-size:0px; */
					&:last-child{
						
					}
					.icon{
						display: inline-block;
						width: 16px;
						height: 16px;
						vertical-align: top;
						margin-right: 6px;
						background-size: 16px 16px;
						background-repeat: no-repeat;
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
				}
			}
		}
		.pics{
			padding :18px 0 18px 18px;
			.title{
				color :rgb(7,17,27);
				font-size :14px;
				line-height :14px;
				font-weight :800;
				margin-bottom :8px;
			}
			.picwrapper{
				width :100%;
				overflow :hidden;
				white-space :nowrap;
				.pic-list{
					font-size :0;
					.pic-item{
						display :inline-block;
						margin-right :6px;
						width :120px;
						height:90px;
					}
				}
			}
		}
		.info{
			padding :18px 18px 0 18px;
			.title{
				color :rgb(7,17,27);
				font-size :14px;
				line-height :14px;
				font-weight :800;
				padding-bottom :8px;
				border-top:1px solid rgba(7, 17, 27, 0.1);
			}
			.info-item{
				//列表垂直居中 用 上下 padding 可防止列表中数字过多造成影响
				padding: 16px 12px;
				font-size :12px;
				line-height :16px;
				font-weight :200;
				color :rgb(7,17,27);
				border-top:1px solid rgba(7, 17, 27, 0.1);
			}
		}
	}
</style>
