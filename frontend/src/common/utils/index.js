export const getPageNameFromPath = (pathname = '', routes) => {
  const [, pageKey] = pathname.split('/');
  const route = routes.find(r => r.key === pageKey);
  return route ? route.name : 'notFound';
};
