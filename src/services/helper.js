import axois from 'axios';

export const BASE_URL = 'http://localhost:8080';

export const myAxois = axois.create({
    baseURL:BASE_URL,
});