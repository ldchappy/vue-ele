<template>
	<div class="food" v-show="showFlag">
		
	</div>
</template>
<script>
	export default {
		props:{
			food:Object
		}
	}
</script>
<style lang="scss">
	.food{
		position:fixed;
		top:0;
		width:100%;
		left:0;
		bottom:48px;
		z-index:9;
		background:#fff;
	}
</style>