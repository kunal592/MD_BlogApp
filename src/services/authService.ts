import api from "./api";

export const loginWithGoogle = async (credential: string) => {
  const { data } = await api.post("/auth/google", { credential });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
