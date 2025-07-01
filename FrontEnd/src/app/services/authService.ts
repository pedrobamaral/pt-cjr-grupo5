import api from './api';

export async function login(email: string, password: string) {
  try {
    const response = await api.post('/login', { email, password });

    const token = response.data.access_token;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Erro no login';
  }
}

export async function cadastrar(nome: string, email: string, password: string) {
  try {
    const response = await api.post('/usuarios', {
      nome,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Erro no cadastro';
  }
}
