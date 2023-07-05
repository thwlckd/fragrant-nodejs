export const headerFetch = async () => {
  const res = await fetch("/components/Admin/Header/Header.html");
  const data = await res.text();
  //link
  const head = new DOMParser().parseFromString(data, "text/html").head
    .children[0];
  //header
  const body = new DOMParser().parseFromString(data, "text/html").body
    .children[0];

  return {
    head,
    body,
  };
};
