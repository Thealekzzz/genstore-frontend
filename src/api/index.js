export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((data) => {
      throw new Error('Ошибка: ' + data.message);
    });
  }
}
