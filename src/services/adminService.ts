import api from "./api";

export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/dashboard-stats");
  return data;
};

export const getAdminUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const getAdminBlogs = async () => {
  const { data } = await api.get("/admin/blogs");
  return data;
};

export const getAdminComments = async () => {
  const { data } = await api.get("/admin/comments");
  return data;
};

export const getAdminReports = async () => {
  const { data } = await api.get("/admin/reports");
  return data;
};
