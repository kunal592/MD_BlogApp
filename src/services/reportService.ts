import api from "./api";

export const reportContent = async (report: any) => {
  const { data } = await api.post("/reports", report);
  return data;
};

export const getReports = async () => {
  const { data } = await api.get("/reports/admin");
  return data;
};
