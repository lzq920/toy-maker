<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="params.q" clearable placeholder="关键词"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="params.image_type">
          <el-option v-for="item in imageTypeOptions" :key="item.value" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="params.orientation">
          <el-option v-for="item in orientationOptions" :key="item.value" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-col>
    </el-row>
    <div class="grid grid-cols-5 gap-1 mt-4 mb-4 h-full">
      <div class="relative" v-for="item in imageList" :key="item.id">
        <el-image :src="item.previewURL" :hide-on-click-modal="true" @click="handleClick(item)">
        </el-image>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      v-model:current-page="params.page"
      :page-size="params.pre_page"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import usePhotoLib from '@/hooks/usePhotoLib'
import { onMounted, reactive } from 'vue'
import { remoteImageToBase64 } from '@/utils'

export default {
  name: 'photo-lib',
  emits: ['choose'],
  setup (props, { emit }) {
    const {
      params,
      getPhotos,
      total,
      loading,
      imageList
    } = usePhotoLib()
    const imageTypeOptions = reactive([{
      label: '全部',
      value: 'all'
    }, {
      label: '照片',
      value: 'photo'
    }, {
      label: '插图',
      value: 'illustration'
    }, {
      label: '矢量图',
      value: 'vector'
    }
    ])
    const orientationOptions = reactive([{
      label: '全部',
      value: 'all'
    }, {
      label: '横向',
      value: 'horizontal'
    }, {
      label: '纵向',
      value: 'vertical'
    }])
    const searchList = async () => {
      params.page = 1
      await getPhotos()
    }
    const handleCurrentChange = async (val) => {
      params.page = val
      await getPhotos()
    }
    const handleClick = async (item) => {
      const base64 = await remoteImageToBase64(item.largeImageURL)
      emit('choose', base64)
    }
    onMounted(async () => {
      await getPhotos()
    })
    return {
      loading,
      params,
      getPhotos,
      total,
      imageList,
      imageTypeOptions,
      orientationOptions,
      searchList,
      handleCurrentChange,
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
