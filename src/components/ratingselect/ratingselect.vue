<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="block nogative" :class="{'active':selectType === 1}">{{desc.nogative}}<span class="count">{{nogative.length}}</span></span>
		</div> 
		<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
			<span class="icon"></span>
			<span>只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
const POSITIVE = 0;
const NOGATIVE = 1;
const ALL = 2;

	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						nogative:'不满意'
					}
				}
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating) => {
					return rating.rateTye === POSITIVE;
				})
			},
			nogative(){
				return this.ratings.filter((rating) => {
					return rating.rateTye === NOGATIVE;
				})
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.selectType = type;
				this.$emit('ratingtype.select',type);//传给父组件，改变父组件ratingtype的变化
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$emit('content.toggle',this.onlyContent);
			}
		}
	}
</script>
<style lang="scss">
	.ratingselect{
		.rating-type{
			padding :18px 0;
			margin:0 18px;
			border-top:rgba(7,17,27,0.1);
			font-size :0;   // 子集用 display:inline-block 会有间隙问题，对父集设置 font-size:0 即可
			.block{
				display :inline-block;
				padding :8px 12px;
				font-size :16px;
				margin-right :8px;
				border-radius :2px;
				color:rgb(77,89,53);
				line-height :16px;
				&.active{
					color :#fff;
				} 
				.count{
					font-size :8px;
					margin-right :2px;
				}
				&.positive{
					background :rgba(0,160,220,0.2);
					&.active{
						background :rgb(0,160,220);
					}
				}
				&.nogative{
					background :rgba(77,85,93,0.2);
					&.active{
						background :rgb(77,85,93);
					}
				}
			}
		}
		.switch{
			padding :12px 18px;
			color :rgb(147,153,159);
			line-height :24px;;
			border-bottom: 1px solid rgb(147,153,159);
			&.on {
				.icon {
					color: #00c850;
				}
			}
			.icon{
				display :inline-block;
				font-size :24px;
				vertical-align :middle;
				width: 12px;
			    height: 12px;
			    background: lightblue;
			}
			.text{
				display :inline-block;
				font-size :12px;
			}
		}
	}
</style>
