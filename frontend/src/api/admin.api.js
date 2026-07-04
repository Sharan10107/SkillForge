import axiosInstance from './axiosInstance';

export const getAnalytics = () => axiosInstance.get('/admin/analytics');
export const listUsers = (params) => axiosInstance.get('/admin/users', { params });
export const toggleBanUser = (id) => axiosInstance.patch(`/admin/users/${id}/ban`);
export const listProjectsForModeration = (params) => axiosInstance.get('/admin/projects', { params });
export const toggleFeatureProject = (id) => axiosInstance.patch(`/admin/projects/${id}/feature`);
export const adminDeleteProject = (id) => axiosInstance.delete(`/admin/projects/${id}`);
export const listReports = (params) => axiosInstance.get('/admin/reports', { params });
export const resolveReport = (id, status) => axiosInstance.patch(`/admin/reports/${id}`, { status });
