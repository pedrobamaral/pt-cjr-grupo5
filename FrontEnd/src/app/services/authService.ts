import api from './api';

export async function login(email: string, senha: string) {
  try {
    const response = await api.post('/login', { email, senha });

    const token = response.data.access_token;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Erro no login';
  }
}

export async function cadastrar(nome: string, email: string, senha: string) {
  try {
    const response = await api.post('/usuarios', {
      nome,
      email,
      senha,
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Erro no cadastro';
  }
}
