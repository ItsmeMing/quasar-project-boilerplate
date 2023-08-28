/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, isRef, ref, shallowRef, watch, onMounted } from 'vue'
import type { AxiosResponse, AxiosRequestHeaders } from 'axios'

export async function useFetch<T, U>(
  repo: (...args: any) => Promise<AxiosResponse<APIResponse<T>, AxiosRequestHeaders>>,
  params?: Ref<U>
) {
  const result = shallowRef<T | null>(null)
  const loading = ref(false)
  async function fetch() {
    loading.value = true
    try {
      const { data } = await repo(params?.value)
      result.value = data.data
      loading.value = false
    } catch (error: unknown) {
      throw error
    } finally {
      loading.value = false
    }
  }
  if (params && isRef(params)) watch(params, fetch)

  //life cycle hooks
  onMounted(async () => {
    await fetch()
  })

  return { result, loading }
}
