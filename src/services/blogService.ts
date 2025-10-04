import api from "./api";

export const getBlogs = async (params: any) => {
  const { data } = await api.get("/blogs", { params });
  return data;
};

export const getFeed = async () => {
  const { data } = await api.get("/blogs/feed");
  return data;
};

export const getBlog = async (slug: string) => {
  const { data } = await api.get(`/blogs/${slug}`);
  return data;
};

export const createBlog = async (blog: any) => {
  const { data } = await api.post("/blogs", blog);
  return data;
};

export const updateBlog = async (id: string, blog: any) => {
  const { data } = await api.put(`/blogs/${id}`, blog);
  return data;
};

export const publishBlog = async (id: string) => {
  const { data } = await api.put(`/blogs/${id}/publish`);
  return data;
};

export const unpublishBlog = async (id: string) => {
  const { data } = await api.put(`/blogs/${id}/unpublish`);
  return data;
};

export const likeBlog = async (id: string) => {
  const { data } = await api.post(`/blogs/${id}/like`);
  return data;
};

export const bookmarkBlog = async (id: string) => {
  const { data } = await api.post(`/blogs/${id}/bookmark`);
  return data;
};

export const getSummary = async (content: string) => {
  const { data } = await api.post("/blogs/summarize", { content });
  return data;
};

export const getTrendingBlogs = async () => {
  const { data } = await api.get("/blogs/trending");
  return data;
};
