// api/statsApi.ts
import apiClient from "./apiClient";

export const getTotalCounts = async () => {
  const response = await apiClient.get("/statistics/total-counts");
  return response.data;
};

export const getSongsPerGenre = async () => {
  const response = await apiClient.get("/statistics/songs-per-genre");
  return response.data;
};

export const getArtistStats = async () => {
  const response = await apiClient.get("/statistics/artist-stats");
  return response.data;
};

export const getAlbumStats = async () => {
  const response = await apiClient.get("/statistics/album-stats");
  return response.data;
};
