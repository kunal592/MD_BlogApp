import api from "./api";

export const getUser = async (id: string) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const updateUserProfile = async (profile: any) => {
  const { data } = await api.put("/users/profile", profile);
  return data;
};

export const getFollowers = async (id: string) => {
  const { data } = await api.get(`/users/${id}/followers`);
  return data;
};

export const getFollowing = async (id: string) => {
  const { data } = await api.get(`/users/${id}/following`);
  return data;
};

export const followUser = async (id: string) => {
  const { data } = await api.post(`/users/${id}/follow`);
  return data;
};

export const unfollowUser = async (id: string) => {
  const { data } = await api.post(`/users/${id}/unfollow`);
  return data;
};

export const getDashboard = async () => {
  const { data } = await api.get("/users/dashboard");
  return data;
};

export const getStats = async () => {
  const { data } = await api.get("/users/stats");
  return data;
};
