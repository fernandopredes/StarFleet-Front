/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';




export const starTrekAPI = axios.create({
  baseURL: 'https://stapi.co/api',
  headers: {
      'Content-Type': 'application/json'
  }
});

export const backAPI = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function registerUser(email: string, password: string, username: string) {
  const response = await backAPI.post('/register', {
    email: email,
    password: password,
    name: username
  });
  return response.data;
}

export async function uploadUserPic(file: string | Blob) {
  const token = localStorage.getItem('access_token');
  if (!token) {
      throw new Error('No token found in localStorage.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await backAPI.post('/upload_pic', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': undefined
    }
  });
  if (response.status !== 200) {
    throw new Error('Failed to upload profile picture.');
  }

  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await backAPI.post('/login', {
    email: email,
    password: password
  });

  if (response.status !== 200) {
    throw new Error('Failed to login.');
  }

  return response.data;
}
