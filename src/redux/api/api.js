import { handleResponse, handleError } from "./apiUtils";
const baseUrl = 'https://next.json-generator.com/api/json/get/EJX4SGwfK';

export function getAllCities() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
