import api from "./api";

export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

export const getUnreadNotifications = async () => {
  const { data } = await api.get("/notifications/unread");
  return data;
};

export const markAsRead = async (id: string) => {
  const { data } = await api.post(`/notifications/${id}/read`);
  return data;
};

export const markAllAsRead = async () => {
  const { data } = await api.post("/notifications/read-all");
  return data;
};
