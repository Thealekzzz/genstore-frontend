import { checkResponse } from ".";
import { SERVER_PORT, SERVER_URL } from "../config";

export function register(payload) {
  const token = localStorage.getItem('token');

  return fetch(`${SERVER_URL}:${SERVER_PORT}/api/register`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      authorization: token ? ("Bearer " + token) : "",
    }
})
    .then(checkResponse);
}