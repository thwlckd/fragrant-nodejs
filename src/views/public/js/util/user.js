export const GET = async (url) => {
  // const res = await fetch(`/dummy${url}.json`);
  const res = await fetch(`${url}`);

  const data = await res.json();
  return data;
};

export const POST = async (url, obj) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  window.location.href = '/admin/users';
  const data = await res.json();
  return data;
};

export const PATCH = async (url, obj) => {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const DELETE = async (url, obj) => {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  const data = await res.json();
  return data;
};
