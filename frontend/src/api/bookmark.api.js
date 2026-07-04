import axiosInstance from './axiosInstance';

export const toggleBookmark = (projectId) => axiosInstance.post(`/bookmarks/${projectId}`);
export const getMyBookmarks = (params) => axiosInstance.get('/bookmarks/me', { params });
