export const GET = async (url) => {
  const res = await fetch(`/dummy/user/${url}.json`);
  const data = await res.json();
  return data;
};
