import { SERVER_PORT, SERVER_URL } from '../config';

export function getBulls(userId, offset, isOnlyFullPedigree, selectedOrder, sortedBy) {
  const token = localStorage.getItem('token');
  const params = new URLSearchParams({
      userId,
      offset,
      isOnlyFullPedigree,
      selectedOrder,
      sortedBy: sortedBy.value,
      asc: sortedBy.asc,
    });

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls?${params}`, {
    headers: {
      authorization: token ? 'Bearer ' + token : null,
      'cache-control': 'max-age=60',
    },
  }).then((res) => res.json());
}

export function getBullsPdf(bullsId) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls/pdf/many?bull_ids=${bullsId.join(',')}`, {
    headers: {
      authorization: token ? 'Bearer ' + token : null,
    },
  }).then((res) => res.blob());
}

export function getAverageBullData(userId) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls/average?userId=${userId}`, {
    headers: {
      authorization: token ? 'Bearer ' + token : null,
      'cache-control': 'max-age=60',
    },
  }).then((res) => res.json());
}

export function getAreThereOrdersBeyondOrders(userId) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls/beyond-orders?userId=${userId}`, {
    headers: {
      authorization: token ? 'Bearer ' + token : null,
      'cache-control': 'max-age=60',
    },
  }).then((res) => res.json());
}

export function patchUserBulls(bullData) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls`, {
    method: 'PATCH',
    body: JSON.stringify(bullData),
    headers: {
      authorization: token ? 'Bearer ' + token : null,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}

export function deleteUserBulls(payload) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls?bulls=${JSON.stringify(payload)}`, {
    method: 'DELETE',
    headers: {
      authorization: token ? 'Bearer ' + token : null,
      'cache-control': 'max-age=60',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
