import { SERVER_PORT, SERVER_URL } from "../config";

export function getBulls(userId, offset) {
  const token = localStorage.getItem('token');

  // return Promise.resolve({ data: [] });

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls?userId=${userId}&offset=${offset || 0}`, {
    headers: {
      authorization: token ? "Bearer " + token : null,
      'cache-control': 'max-age=60',
    }
  }).then(res => res.json());
}


export function deleteUserBulls(payload) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls?bulls=${JSON.stringify(payload)}`, {
    method: 'DELETE',
    headers: {
      authorization: token ? "Bearer " + token : null,
      'cache-control': 'max-age=60',
      "Content-Type": "application/json",      
    }
  }).then(res => res.json());
}
