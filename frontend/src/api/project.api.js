import axiosInstance from './axiosInstance';

export const getProjects = (params) => axiosInstance.get('/projects', { params });
export const getFeaturedProjects = () => axiosInstance.get('/projects/featured');
export const getProjectBySlug = (slug) => axiosInstance.get(`/projects/${slug}`);
export const getMyProjects = (params) => axiosInstance.get('/projects/me/mine', { params });
export const createProject = (payload) => axiosInstance.post('/projects', payload);
export const updateProject = (id, payload) => axiosInstance.patch(`/projects/${id}`, payload);
export const deleteProject = (id) => axiosInstance.delete(`/projects/${id}`);
export const toggleLike = (id) => axiosInstance.post(`/projects/${id}/like`);
export const uploadProjectImage = (file) => {
  const form = new FormData();
  form.append('file', file);
  return axiosInstance.post('/uploads/project-image', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};
