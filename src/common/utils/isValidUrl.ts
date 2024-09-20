export default function isValidUrl(
  url: string,
): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}