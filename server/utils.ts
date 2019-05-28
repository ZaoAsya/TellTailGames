export const fetchData = (url: string, body: any) => {
  return fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json',
    }),
    method: 'POST',
  }).then((res: Response) => res.json());
};

export const hashCode = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i);
  }
  return h;
};

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(
        'https://avatars.mds.yandex.net/get-pdb/1352825/2adee258-b8fb-419a-bab6-25d26a6be61e/s1200'
      );
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as object);
    reader.onerror = (error: any) => reject(error);
  });
};
