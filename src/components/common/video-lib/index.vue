<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="params.q" clearable placeholder="关键词"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="params.video_type">
          <el-option v-for="item in videoTypeOptions" :key="item.value" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-col>
    </el-row>
    <div class="grid grid-cols-5 gap-1 mt-4 mb-4 h-full">
      <div v-for="item in videoList" :key="item.id" class="relative">
        <el-image :hide-on-click-modal="true" :src="`https://i.vimeocdn.com/video/${item.picture_id}_200x150.jpg`"
                  @click="handleClick(item)">
        </el-image>
      </div>
    </div>
    <el-pagination
      v-model:current-page="params.page"
      :page-size="params.pre_page"
      :total="total"
      layout="prev, pager, next"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import useVideoLib from '@/hooks/useVideoLib'
import { onMounted, reactive } from 'vue'

export default {
  name: 'video-lib',
  emits: ['choose'],
  setup (props, { emit }) {
    const {
      params,
      getVideos,
      total,
      loading,
      videoList
    } = useVideoLib()
    const videoTypeOptions = reactive([{
      label: '全部',
      value: 'all'
    }, {
      label: '电影',
      value: 'film'
    }, {
      label: '动漫',
      value: 'animation'
    }
    ])
    const searchList = async () => {
      params.page = 1
      await getVideos()
    }
    const handleCurrentChange = async (val) => {
      params.page = val
      await getVideos()
    }
    const handleClick = (item) => {
      emit('choose', {
        poster: `https://i.vimeocdn.com/video/${item.picture_id}_375x200.jpg`,
        src: item.videos.large.url
      })
    }
    onMounted(async () => {
      await getVideos()
    })
    return {
      loading,
      params,
      getVideos,
      total,
      videoList,
      videoTypeOptions,
      searchList,
      handleCurrentChange,
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
