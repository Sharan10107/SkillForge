import axiosInstance from './axiosInstance';

export const getComments = (projectId, params) =>
  axiosInstance.get(`/projects/${projectId}/comments`, { params });
export const addComment = (projectId, payload) =>
  axiosInstance.post(`/projects/${projectId}/comments`, payload);
export const updateComment = (id, content) => axiosInstance.patch(`/comments/${id}`, { content });
export const deleteComment = (id) => axiosInstance.delete(`/comments/${id}`);
