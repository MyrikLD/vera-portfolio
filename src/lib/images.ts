const IMG_BASE = '/images/projects';

export function imgUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return `${IMG_BASE}/${path}`;
}