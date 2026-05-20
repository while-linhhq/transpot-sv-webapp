/** Unicode / spaces / parentheses — bypass next/image optimizer (tunnel + public paths) */
export function isGalleryImageUnoptimized(src: string) {
  return /[^\x00-\x7F]|[()]/.test(src);
}
