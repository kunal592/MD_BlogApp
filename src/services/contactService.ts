import api from "./api";

export const submitContactForm = async (formData: any) => {
  const { data } = await api.post("/contact", formData);
  return data;
};

export const getContactSubmissions = async () => {
  const { data } = await api.get("/contact");
  return data;
};

export const resolveContactSubmission = async (id: string) => {
  const { data } = await api.put(`/contact/${id}`);
  return data;
};
