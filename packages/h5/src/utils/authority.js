import { createAuthority } from '@peeeng/utils/authority'
import { mode } from './validate'

const getLocalKey = key => `sand-${key}-${mode}`

export const useUserAuth = createAuthority({
  key: getLocalKey('user'),
})
