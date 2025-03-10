import { SERVER_PORT, SERVER_URL } from '../config';
import checkResponse from '../utils/checkResponse';

export function patchMe(payload) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(payload),

    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? 'Bearer ' + token : '',
    },
  }).then(checkResponse);
}
