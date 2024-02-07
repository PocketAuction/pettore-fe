import useLoading from '@/customhooks/useLoading'

interface IResponse {
  code: number
  message: string
}

interface IuseFetchParams {
  fetchFunction: () => Promise<IResponse>
  successCallback?: (data: unknown) => void
  errorCallback?: (error: unknown) => void
}
export default function useFetch (params: IuseFetchParams): void {
  const { fetchFunction, successCallback, errorCallback } = params
  const { showLoading, hideLoading } = useLoading()

  console.log(fetchFunction, successCallback, errorCallback, showLoading, hideLoading)
}
