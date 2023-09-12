import axios from 'axios';

export const starTrekAPI = axios.create({
  baseURL: 'https://stapi.co/api',
  headers: {
      'Content-Type': 'application/json'
  }
});
