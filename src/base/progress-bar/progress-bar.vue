<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
		<div class="bar-inner">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper" ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd"
			>
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script>
    import {prefixStyle} from 'common/js/dom'

    const progressBtnWidth = 16
    const transform = prefixStyle('transform')

	export default {
      props: {
      	percent: {
      		type: Number,
      		default: 0
      	}
      },
      created() {
        this.touch = {} //把共享数据挂载在这个对象上
      },
      methods: {
      	//三个回调函数 touch事件 构成进度条拖动效果
        progressTouchStart(e) {
          this.touch.initiated = true //表示已经初始化了
          this.touch.startX = e.touches[0].pageX //touches[0] 表示第一个手指点击的位置
          this.touch.left = this.$refs.progress.clientWidth  //获取当前进度条的位置
        },
        progressTouchMove(e) {
          if(!this.touch.initiated) {
          	return
          }
          const deltaX = e.touches[0].pageX - this.touch.startX
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + deltaX))
          this._offset(offsetWidth)
        },
        progressTouchEnd() {
          this.touch.initiated = false
          this._triggerPercent ()
        },
        progressClick(e) {
         // this._offset(e.offsetX)
          const rect = this.$refs.progressBar.getBoundingClientRect()
          const offsetWidth = e.pageX - rect.left
          this._offset(offsetWidth)
          this._triggerPercent ()
        },
        _offset(offsetWidth) {  //函数封装 减少重复
        	this.$refs.progress.style.width = `${offsetWidth}px`
          this.$refs.progressBtn.style[transform] = `translated3d(${offsetWidth}px, 0, 0)`
        },
        _triggerPercent () {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const percent = this.$refs.progress.clientWidth / barWidth
          this.$emit('percentChange', percent)
        },
      }, 
      watch: {
      	percent(newPercent) {
          if (newPercent >= 0 && !this.touch.initiated) {
          	const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth //clientWidth 可视区的宽度
            const offsetWidth = newPercent * barWidth
            this._offset(offsetWidth)
          }
      	}
      }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.progress-bar
	  height:30px
	  .bar-inner
	    position: relative
	    top:13px
	    height:4px
	    background: rgba(0, 0, 0, 0.3)
	    .progress
	      position:absolute
	      height:100%
	      background: $color-theme
	     .progress-btn-wrapper
	       position: absolute
	       left: -8px
	       top: -13px
	       width: 30px
	       height:30px
	       .progress-btn
	         position: relative
	         top:7px
	         left:7px
	         box-sizing: border-box
	         width:16px
	         height:16px
	         border:3px solid $color-text
	         border-radius: 50%
	         background: $color-theme

</style>