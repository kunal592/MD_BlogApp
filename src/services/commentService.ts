import api from "./api";

export const getComments = async (blogId: string) => {
  const { data } = await api.get(`/blogs/${blogId}/comments`);
  return data;
};

export const createComment = async (blogId: string, comment: any) => {
  const { data } = await api.post(`/blogs/${blogId}/comments`, comment);
  return data;
};
