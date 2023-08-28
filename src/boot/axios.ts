// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { boot } from 'quasar/wrappers'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { LocalStorage } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

//Delete object properties whose data is null or undefined.
function deleteEmptyValue(data: Record<string, unknown>) {
  Object.keys(data).map((k) => {
    data[k] == void 0 && delete data[k]
  })
  return data
}

function onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // const { method, url } = config
  // Set Headers Here
  config.headers.Authorization = `Bearer ${LocalStorage.getItem(`${process.env.APP_NAME}_token`)}`
  // Check Authentication Here
  //CHECK BEARER

  // Set Loading Start Here
  // logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)

  config.data && (config.data = deleteEmptyValue(config.data as Record<string, unknown>))
  config.params && (config.params = deleteEmptyValue(config.params as Record<string, unknown>))

  // if (method === 'get') {
  //   config.timeout = 15000
  // }
  return config
}
const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
