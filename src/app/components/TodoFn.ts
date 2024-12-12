export const deleteData = async (param: Number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/todo/${param}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(result)
};

export const postData = async (param: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: param, description: 'hard desc' }),
  });
  const result = await response.json();
  return result
};

export const getList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/todo`)
  const data = await response.json();
  return data;
}