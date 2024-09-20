export default function isValidUrl(
  url: string,
  allowedDomains: string[] = [],
): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'https:' && allowedDomains.includes(parsedUrl.hostname);
  } catch {
    return false;
  }
}