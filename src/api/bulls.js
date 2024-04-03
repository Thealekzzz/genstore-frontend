import { SERVER_PORT, SERVER_URL } from "../config";

export function getBulls(userId) {
  const token = localStorage.getItem('token');

  // return Promise.resolve({ data: [] });

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls?userId=${userId}`, {
    headers: {
      authorization: token ? "Bearer " + token : null,
      'cache-control': 'max-age=60',
    }
  }).then(res => res.json());
}
