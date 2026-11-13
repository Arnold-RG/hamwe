/** Public-folder path under Vite `base` (GitHub Pages serves the app at /hamwe/). */
export function asset(path: string): string {
  if (!path || /^https?:\/\//i.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL
  if (path.startsWith(base)) return path
  return `${base}${path.replace(/^\//, '')}`
}
