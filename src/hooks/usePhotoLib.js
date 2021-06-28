import { reactive, ref } from 'vue'
import { httpGet } from '@/utils'
import { ElMessage } from 'element-plus'

/**
 * @default 图片库Hooks
 * @returns {{total: Ref<UnwrapRef<number>>, getPhotos: (function(): Promise<void>), params: UnwrapNestedRefs<{q: string, orientation: string, pre_page: number, page: number, key: string, image_type: string}>, loading: Ref<UnwrapRef<boolean>>, imageList: ToRef<*[]>}}
 */
export default function usePhotoLib () {
  const params = reactive({
    key: '20485886-dda014e4596844ce09c6cf7f3',
    q: '',
    image_type: 'all',
    orientation: 'horizontal',
    page: 1,
    pre_page: 20
  })
  const url = ref('https://pixabay.com/api/')
  const objectToQueryString = () => {
    return Object.entries(params).reduce((queryString, [key, val]) => {
      const symbol = queryString.length === 0 ? '?' : '&'
      queryString +=
        key === 'q' ? `${symbol}${key}=${encodeURIComponent(val)}` : `${symbol}${key}=${val}`
      return queryString
    }, '')
  }
  const imageList = ref([])
  const total = ref(0)
  const loading = ref(false)
  /**
   * @description 获取图片库列表
   * @returns {Promise<void>}
   */
  const getPhotos = async () => {
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
        imageList.value = hits
      }
      loading.value = false
    } catch (error) {
      ElMessage.error(error)
    }
  }
  return {
    params,
    imageList,
    total,
    loading,
    getPhotos
  }
}
