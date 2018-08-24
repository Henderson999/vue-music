<template>
	<div class="progress-circle">
		<svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
			<circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" />
		</svg>
		<!-- back内层圆 bar外层圆 r半径 cx cy 圆心坐标 viewBox 对应圆心 dashxxx 控制进度显示-->
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	export default {
      props: {
      	radius: {
      		type: Number,
      		default:100
      	},
      	percent: {
      		type: Number,
      		default: 0
      	}
      },
      data() {
      	return {
      		dashArray: Math.PI * 100
      	}
      },
      computed: {
      	dashOffset() {
      		return (1-this.percent) * this.dashArray
      	}
      }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.progress-circle
	  position:relative
	  circle
	    stroke-width: 8px
	    transform-origin: center
	    &.progress-background
	      transform: scale(0.9)
	      stroke: $color-theme-d
	    &.progress-bar
	      transform: scale(0.9) rotate(-90deg) 
	      stroke: $color-theme

</style>