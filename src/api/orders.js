import { SERVER_PORT, SERVER_URL } from "../config";

export function getOrders() {
  const token = localStorage.getItem('token');

  // return Promise.resolve({ orders: [] });

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/orders`, {
    headers: {
      authorization: token ? "Bearer " + token : null,
      'cache-control': 'max-age=60',
    }
  }).then(res => res.json());
}
