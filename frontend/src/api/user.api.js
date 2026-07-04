import axiosInstance from './axiosInstance';

export const updateProfile = (payload) => axiosInstance.patch('/users/me', payload);
export const getPublicProfile = (slugOrId) => axiosInstance.get(`/users/${slugOrId}`);
export const searchUsers = (q) => axiosInstance.get('/users', { params: { q } });
export const uploadAvatar = (file) => {
  const form = new FormData();
  form.append('file', file);
  return axiosInstance.post('/uploads/avatar', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const uploadBanner = (file) => {
  const form = new FormData();
  form.append('file', file);
  return axiosInstance.post('/uploads/banner', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const uploadResume = (file) => {
  const form = new FormData();
  form.append('file', file);
  return axiosInstance.post('/uploads/resume', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};
