import { reactive, ref } from 'vue'
import { httpGet } from '@/utils'

/**
 * @description 获取视频库Hook
 * @returns {{total: Ref<UnwrapRef<number>>, videoList: ToRef<*[]>, getVideos: (function(): Promise<void>), params: UnwrapNestedRefs<{q: string, pre_page: number, page: number, key: string, video_type: string}>, loading: Ref<UnwrapRef<boolean>>}}
 */
export default function useVideoLib () {
  const params = reactive({
    key: '20485886-dda014e4596844ce09c6cf7f3',
    q: '',
    video_type: 'all',
    page: 1,
    pre_page: 20
  })
  const url = ref('https://pixabay.com/api/videos/')
  const objectToQueryString = () => {
    return Object.entries(params).reduce((queryString, [key, val]) => {
      const symbol = queryString.length === 0 ? '?' : '&'
      queryString +=
        key === 'q' ? `${symbol}${key}=${encodeURIComponent(val)}` : `${symbol}${key}=${val}`
      return queryString
    }, '')
  }
  const videoList = ref([])
  const total = ref(0)
  const loading = ref(false)
  /**
   * @description 获取视频列表
   * @returns {Promise<void>}
   */
  const getVideos = async () => {
    try {
      loading.value = true
      const remoteUrl = url.value + objectToQueryString()
      const response = await httpGet(remoteUrl)
      const {
        totalHits,
        hits
      } = response
      if (totalHits > 0) {
        total.value = totalHits
        videoList.value = hits
      }
      loading.value = false
    } catch (error) {
      console.error(error)
    }
  }
  return {
    params,
    videoList,
    total,
    loading,
    getVideos
  }
}
