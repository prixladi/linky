const makeShortenedLink = (path: string): string => {
  const pathArray = window.location.href.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  const base = protocol + '//' + host;

  return new URL(path, base).href;
};

export default makeShortenedLink;
