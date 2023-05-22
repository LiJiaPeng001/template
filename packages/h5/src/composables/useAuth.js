import { mode } from '@/utils/validate'

export function useAuth(key = 'user') {
  const localKeyMaps = ['user']
  if (!localKeyMaps.includes(key)) throw new Error('error local key')
  return useLocalStorage(`sand-${key}-${mode}`, {})
}

// export const isLogin = computed(() => !!useAuth().value.token);
