import { SERVER_PORT, SERVER_URL } from '../config';

export function getCompanies() {
  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/companies`).then((res) => res.json());
}
