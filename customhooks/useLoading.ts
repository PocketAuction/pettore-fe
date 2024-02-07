import { useSetAtom } from 'jotai'
import { loadingAtom } from '@/store/common'

interface IuseLoadingReturn {
  showLoading: () => void
  hideLoading: () => void
}
export default function useLoading (): IuseLoadingReturn {
  const setLoadingAtom = useSetAtom(loadingAtom)
  const showLoading = (): void => {
    setLoadingAtom((prev) => ({ ...prev, is: true }))
  }

  const hideLoading = (): void => {
    setLoadingAtom((prev) => ({ ...prev, is: false }))
  }

  return {
    showLoading,
    hideLoading
  }
}
