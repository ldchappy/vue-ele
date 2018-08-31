<template>
    <div class="header">
        <div class="content-wrapper">
        	<div class="avatar">
        		<img width="64" height="64" :src="seller.avatar" :alt="seller.description">
        	</div>
        	<div class="content">
        		<div class="title">
        			<span class="brand"></span>
        			<span class="name">{{seller.name}}</span>
        		</div>
        		<div class="description">
        			{{seller.description}}/{{seller.deliveryTime}}分钟送达
        		</div>
        		<div v-if="seller.supports" class="support">
        			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
        			<span class="text">{{seller.supports[0].description}}</span>
        		</div>
        	</div>
        	<div class="support-count" v-if="seller.supports" @click="showDetail">
        		<span class="count">{{seller.supports.length}}</span>
        	</div>
        </div>
        <div class="bulletin-wrapper">
        	<span class="bulletin-title"></span>
        	<span class="bulletin-text">{{seller.bulletin}}</span>
        </div>
        <div class="background">
        	<img :src="seller.avatar" width="100%" height="100%">
        </div>
        <!-- 详情层 -->
        <transition name="fade" mode="out-in">
        <div v-show="detailShow" class="detail">
        	<div class="detail-wrapper clearfix">
        		<div class="detail-main">
        			<div class="name">{{seller.name}}</div>
        			<div class="star-wrapper">
        				<!-- <star :size="48" :score="seller.score"></star> -->
        			</div>

        			<div class="title">
        				<div class="line"></div>
        				<div class="text">优惠信息</div>
        				<div class="line"></div>
        			</div>

        			<ul class="supports" v-if="seller.supports">
        				<li class="support-item" v-for="(item, index) in seller.supports">
        					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
        					<span class="text">{{seller.supports[index].description}}</span>
        				</li>
        			</ul>

        			<div class="title">
        				<div class="line"></div>
        				<div class="text">商家公告</div>
        				<div class="line"></div>
        			</div>

        			<div class="bulletin">
        				<p class="content">{{seller.bulletin}}</p>
        			</div>
        		</div>
        	</div>
        	<div class="detail-close" @click="hideDetail">
        		<span> X </span>
        	</div>
        </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
	/*import star from 'components/star/star'*/
    export default{
    	/*props:可以接收父组件传来的对象*/
    	props:{
    		seller : Object
    	},
    	data(){
    		return {
    			detailShow:false
    		}
    	},
    	methods:{
    		showDetail:function(){
    			this.detailShow = true;
    		},
    		hideDetail:function(){
    			this.detailShow = false;
    		}
    	},
    	created(){
    		this.classMap = ['jiang','man','shou','song','zhe']
    	},
    	components:{
    		/*star*/
    	}
    }
</script>
<style lang="scss" scoped>
@import '../../../static/mixin.scss';
	.header{
		color:#fff;
		position:relative;
		overflow:hidden;
		.content-wrapper{
			padding:24px 12px 18px 24px;
			position:relative;
			font-size:0;
			.avatar{
				display:inline-block;
			}
			.content{
				display:inline-block;
				margin-left:16px;
				font-size:14px;
				.title{
					margin:2px 0px 8px 0;
					.brand{
						display:inline-block;
						width:30px;
						height:18px;
						@include bg-image('../../assets/png/pingpai');
						background-size:30px 18px;
						background-repeat:no-repeat;
					}
					.name{
						margin-left:6px;
						font-size:16px;
						line-height:18px;
						font-weight:bold;
					}
				}
				.description{
					margin-bottom:10px;
					line-height:12px;
					font-size:12px;

				}
				.support{
					.icon{
						display:inline-block;
						width:12px;
						height:12px;
						margin-right:4px;
						vertical-align:top;
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
						line-height:12px;
					}
				}
			}
			.support-count{
				position:absolute;
				right:12px;
				bottom:18px;
				padding:0 8px;
				line-height:24px;
				height:24px;
				color:#fff;
				border-radius:14px;
				text-align:center;
				background:rgba(7,27,37,.3);
				.count{
					display:inline-block;
					font-size:12px;
				}

			}
		}
		.bulletin-wrapper{
			height:28px;
			line-height:28px;
			padding:0 22px 0 12px;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			background:rgba(124,5,21,.6);
			.bulletin-title{
				display:inline-block;
				width:22px;
				height:12px;
				@include bg-image('../../assets/png/pingpai');
				background-size:22px 12px;
				background-repeat:no-repeat;
			}
			.bulletin-text{
				font-size:12px;
			}
		}
		.background{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			z-index:-1;
			filter:blur(10px);
		}
		.detail{
			position:fixed;
			z-index:100;
			width:100%;
			height:100%;
			top:0;
			left:0;
			overflow:auto;
			background:rgba(7,27,37,.8);
			transition: all 2s;
			&.fade-transition{
				opacity:1;
				background:rgba(7,27,37,.8);
			}
			&.fade-enter{
				opacity:0;
				background:rgba(7,27,37,0);
			}
			&.fade-leave{
				opacity:0;
				background:rgba(7,27,37,0);
			}
			.detail-wrapper{
				min-height:100%;
				width:100%;
				.detail-main{
					margin-top:64px;
					padding-bottom:64px;
					.name{
						line-height:16px;
						text-align:center;
						font-size:16px;
						font-weight:700
					}
					.star-wrapper{
						margin-top:18px;
						padding:2px 0;
						text-align:center;
						background:#854f78;
						height:20px;
					}
					.title{
						display:flex;
						width:80%;
						margin:30px auto 24px auto;
						.line{
							flex:1;
							position:relative;
							top:-6px;
							border-bottom:1px solid rgba(255,255,255,.8);
						}
						.text{
							padding:0 12px;
							font-weight:700;
							font-size:14px;
						}
					}
					.supports{
						width:80%;
						margin:0 auto;
						.support-item{
							padding:0 12px;
							margin-bottom:12px;
							font-size:0px;
							&:last-child{
								margin-bottom:0;
							}
							.icon{
								display:inline-block;
								width:16px;
								height:16px;
								wertical-align:top;
								margin-right:6px;
								vertical-align:top;
								background-size:16px 16px;
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
								line-height:16px;
								font-size:12px;
							}
						}
					}
					.bulletin{
						width:80%;
						margin:0 auto;
						.content{
							padding:10px;
							line-height: 20px;
    						height: 20px;
						}
					}
				}
			}
			.detail-close{
				position:relative;
				width:30px;
				height:30px;
				margin:-64px auto 0 auto;
				clear:both;
				font-size:32px;
			}
		}
	}
</style>