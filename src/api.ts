/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { CreatePostResponse, Post } from './types/posts';
import { Quiz } from './types/quiz';

//chamada base da api externa de star trek

export const starTrekAPI = axios.create({
  baseURL: 'https://stapi.co/api',
  headers: {
      'Content-Type': 'application/json'
  }
});

//chamada base da api back-end

export const backAPI = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

//chamadas de user

export async function registerUser(email: string, password: string, username: string) {
  const response = await backAPI.post('/register', {
    email: email,
    password: password,
    name: username
  });
  return response.data;
}

export async function uploadUserPic(file: string | Blob) {
  const token = localStorage.getItem('access_token')
  if (!token) {
      throw new Error('No token found in localStorage.')
  }

  const formData = new FormData()
  formData.append('file', file)

  const response = await backAPI.post('/upload_pic', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': undefined
    }
  })
  if (response.status !== 200) {
    throw new Error('Failed to upload profile picture.')
  }

  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await backAPI.post('/login', {
    email: email,
    password: password
  });

  if (response.status !== 200) {
    throw new Error('Failed to login.')
  }

  return response.data;
}

export async function userData(token:string) {
  const response = await backAPI.get(`/users`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data;
}

export async function oneUser(userId:string, token:string) {
  const response = await backAPI.get(`/user/${userId}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  return response.data;
}

//chamadas de posts

export async function fetchPosts(): Promise<Post[]> {
  const token = localStorage.getItem('access_token')
  if (!token) {
      throw new Error('No token found in localStorage.')
  }

  const response = await backAPI.get('/posts', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  if (response.status !== 200) {
      throw new Error('Failed to fetch posts.')
  }

  return response.data;
}

export async function createPost(
  title: string,
  abstract: string,
  text: string,
  userId?: number
): Promise<CreatePostResponse> {
  const token = localStorage.getItem('access_token')
  if (!token) {
      throw new Error('No token found in localStorage.')
  }
  if (!userId) {
      userId = parseInt(localStorage.getItem('user_id') || '0')
  }

  const response = await backAPI.post('/create_post', {
      title,
      abstract,
      text,
      user_id: userId
  }, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  if (response.status !== 200) {
      throw new Error('Failed to create post.')
  }

  return response.data;
}

export async function editPost(postId: number, updatedData: any) {
  const token = localStorage.getItem('access_token')
  if (!token) {
      throw new Error('No token found in localStorage.')
  }

  const response = await backAPI.put(`/posts/${postId}`, updatedData, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  if (response.status !== 200) {
      throw new Error('Failed to edit post.')
  }

  return response.data;
}

export async function deletePost(postId: number) {
  const token = localStorage.getItem('access_token')
  if (!token) {
      throw new Error('No token found in localStorage.')
  }

  const response = await backAPI.delete(`/posts/${postId}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  if (response.status !== 200) {
      throw new Error('Failed to delete post.')
  }

  return response.data;
}

//chamadas de quiz

export async function fetchAllQuizzes():  Promise<Quiz[]> {
  const token = localStorage.getItem('access_token')
  if (!token) {
      throw new Error('No token found in localStorage.')
  }
  const response = await backAPI.get('/quizzes', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  if (response.status !== 200) {
      throw new Error('Failed to fetch quizzes.')
  }
  return response.data;
}


export async function fetchQuizById(quizId: number): Promise<any> {
  const token = localStorage.getItem('access_token')
  if (!token) {
      throw new Error('No token found in localStorage.')
  }

  const response = await backAPI.get(`/quizzes/${quizId}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  if (response.status !== 200) {
      throw new Error('Failed to fetch quiz.')
  }
  return response.data
}
