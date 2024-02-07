import { useSetAtom } from 'jotai'
import { toastAtom, type toastAtomType } from '@/store/common'

interface IuseToastReturn {
  onOpenToast: (props: toastAtomType) => void
  onCloseToast: (props: toastAtomType) => void

} const useToast = (): IuseToastReturn => {
  const setToastAtom = useSetAtom(toastAtom)

  const onOpenToast = (props: toastAtomType): void => { setToastAtom((prev) => ({ ...prev, ...props, onOpenToast, is: true })) }

  const onCloseToast = (props: toastAtomType): void => { setToastAtom((prev) => ({ ...prev, ...props, is: false })) }

  return {
    onOpenToast,
    onCloseToast
  }
}

export default useToast
