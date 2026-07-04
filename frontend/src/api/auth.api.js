import axiosInstance from './axiosInstance';

export const signup = (payload) => axiosInstance.post('/auth/signup', payload);
export const login = (payload) => axiosInstance.post('/auth/login', payload);
export const getMe = () => axiosInstance.get('/auth/me');
export const verifyEmail = (token) => axiosInstance.post('/auth/verify-email', { token });
export const forgotPassword = (email) => axiosInstance.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) =>
  axiosInstance.post('/auth/reset-password', { token, password });
