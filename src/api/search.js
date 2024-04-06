import { SERVER_PORT, SERVER_URL } from "../config";

export function searchBulls(payload) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/search/many`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      authorization: token ? "Bearer " + token : null,
      "Content-Type": "application/json",
      'cache-control': 'max-age=60',
    }
  }).then(res => res.json());
}
