<template>
	<transition name="slid">
		<!-- 通过vuex作为桥梁实现路由间通讯数据交互 -->
		<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script type="text/javascript">
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getSongList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'

	export default {
		    data() {
              return {
                songs: []
         }
        },
		computed: {
			title() {
              return this.disc.dissname
			},
			bgImage() {
              return this.disc.imgurl
			},
			...mapGetters ([
                 'disc'
				])
		},
		created() {
          this._getSongList()
		},
		components: {
			MusicList
		},
		methods: {
			_getSongList() {
				if(!this.disc.dissid) {
					this.$router.push('/recommend')
				}
              getSongList(this.disc.dissid).then((res) => {
              	if(res.code === ERR_OK) {
              		this.songs = this._normalizeSongs(res.cdlist[0].songlist)
              	}
              })
			},
			_normalizeSongs(list) {
			  let ret = []
			  list.forEach((musicData) => {
			  	if(musicData.songid && musicData.albumid) {
			  		ret.push(createSong(musicData))
			  	}
			  })
			  return ret
			}
		}
	}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
	.slide-enter-active, .slide-leave-active
	  transition: all 0.3

	.slide-enter, .slide-leave-to
	  transform: translated3d(100%, 0, 0)
</style>