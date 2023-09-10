export default function(res) {
  if (res.ok) {
    return res.json();
  }

  const status = res.status;

  return res.json().then((data) => {
    return Promise.reject({ message: `Ошибка ${status}: ${data.message}` });
  });
}