export const env = import.meta.env
export const mode = env.MODE
export const isDev = mode === 'development'
export const isProd = mode === 'production'
