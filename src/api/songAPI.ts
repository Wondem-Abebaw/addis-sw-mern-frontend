import apiClient from "./apiClient";

export const getSongs = async () => {
  const response = await apiClient.get("/songs/get-songs");
  return response.data;
};

export const createSong = async (songData: any) => {
  const response = await apiClient.post("/songs/create-song", songData);
  console.log("Created song:", response.data);
  return response.data;
};

export const updateSong = async (id: string, songData: any) => {
  const response = await apiClient.put(`/songs/update-song/${id}`, songData);
  console.log("🚀 ~ updateSong ~ response:", response.data.data);
  return response.data.data;
};

export const deleteSong = async (id: string) => {
  const response = await apiClient.delete(`/songs/delete-song/${id}`);
  return response.data;
};

export const filterSongs = async (filters: any) => {
  const response = await apiClient.get("/songs/get-songs", { params: filters });
  return response.data;
};
