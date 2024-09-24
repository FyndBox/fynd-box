export function extractPrimaryLanguage(acceptLanguage: string): string {
  if (!acceptLanguage) {
    return 'en';
  }
  const languages = acceptLanguage.split(',');

  return languages[0].split(';')[0].split('-')[0].trim();
}
