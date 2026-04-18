import api from './axios';

export const getVillas = async (params = {}) => {
  const response = await api.get('/villas', { params });
  return response.data;
};

export const getVillaById = async (id) => {
  const response = await api.get(`/villas/${id}`);
  return response.data;
};
