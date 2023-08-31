/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, isRef, ref, shallowRef, watchEffect } from 'vue';
import type { AxiosResponse, AxiosRequestHeaders } from 'axios';

export async function useGet<T, U>(
  repo: (...args: any) => Promise<AxiosResponse<APIResponse<T>, AxiosRequestHeaders>>,
  params?: Ref<U>
) {
  const result = shallowRef<T | null>(null);
  const loading = ref(false);
  watchEffect(async () => {
    if (params && !isRef(params)) return;
    loading.value = true;
    try {
      const { data } = await repo(params?.value);
      result.value = data.data;
    } catch (error: unknown) {
      throw error;
    } finally {
      loading.value = false;
    }
  });
  return { result, loading };
}
