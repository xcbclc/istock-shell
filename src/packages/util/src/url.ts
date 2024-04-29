export const getQueryParam = (name: string): string | null => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  return params.get(name);
};
