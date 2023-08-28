declare interface APIResponse<T> {
  status: string
  status_code: number
  message: string
  developer_message: string
  data: T
}
