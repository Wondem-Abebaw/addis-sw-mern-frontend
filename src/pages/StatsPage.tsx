import React from "react";
import { css } from "@emotion/react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchStatistics } from "../features/stats/statsSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/StatCard";

import theme from "../styles/theme";

import StatsSkeleton from "../components/ui/StatsSkeleton";

const StatsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statistics, loading, error } = useAppSelector((state) => state.stats);
  // console.log("statistics", statistics);

  React.useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  const colors = [
    "#8B5CF6",
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#6366F1",
    "#84CC16",
  ];
  const barColors = {
    songs: "#8B5CF6",
    albums: "#3B82F6",
    albumSongs: "#10B981",
  };
  if (loading) return <StatsSkeleton />;
  if (error) return <div css={errorStyles}>Error: {error}</div>;
  if (!statistics)
    return <div css={emptyStateStyles}>No statistics available</div>;

  return (
    <div css={containerStyles}>
      <h2 css={titleStyles}>Music Statistics</h2>

      {/* Overview Cards */}
      <div css={cardsContainerStyles}>
        <div css={[cardStyles, purpleGradientStyles]}>
          <CardHeader>
            <CardTitle css={cardTitleStyles}>Total Songs</CardTitle>
            <span css={emojiStyles}>🎵</span>
          </CardHeader>
          <CardContent>
            <div css={cardValueStyles}>{statistics.totalSongs}</div>
          </CardContent>
        </div>

        <div css={[cardStyles, blueGradientStyles]}>
          <CardHeader>
            <CardTitle css={cardTitleStyles}>Total Artists</CardTitle>
            <span css={emojiStyles}>🎤</span>
          </CardHeader>
          <CardContent>
            <div css={cardValueStyles}>{statistics.totalArtists}</div>
          </CardContent>
        </div>

        <div css={[cardStyles, greenGradientStyles]}>
          <CardHeader>
            <CardTitle css={cardTitleStyles}>Total Albums</CardTitle>
            <span css={emojiStyles}>💿</span>
          </CardHeader>
          <CardContent>
            <div css={cardValueStyles}>{statistics.totalAlbums}</div>
          </CardContent>
        </div>

        <div css={[cardStyles, pinkGradientStyles]}>
          <CardHeader>
            <CardTitle css={cardTitleStyles}>Total Genres</CardTitle>
            <span css={emojiStyles}>🎼</span>
          </CardHeader>
          <CardContent>
            <div css={cardValueStyles}>{statistics.totalGenres}</div>
          </CardContent>
        </div>
      </div>

      {/* Charts */}
      <div css={chartsContainerStyles}>
        {/* Songs by Genre - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Songs by Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <div css={chartContainerStyles}>
              {statistics.songsPerGenre.length === 0 ? (
                <div css={emptyChartStyles}>No songs available by genre</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statistics.songsPerGenre}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ _id, percent }) =>
                        `${_id} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {statistics.songsPerGenre.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Songs by Artist - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Artists by Song and Album Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div css={chartContainerStyles}>
              {statistics.songsAndAlbumsPerArtist.length === 0 ? (
                <div css={emptyChartStyles}>
                  No artists available with song/album data
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[...statistics.songsAndAlbumsPerArtist]
                      .sort((a, b) => b.songs - a.songs)
                      .slice(0, 10)
                      .map((artist) => ({
                        name:
                          artist.artist.length > 15
                            ? artist.artist.substring(0, 15) + "..."
                            : artist.artist,
                        fullName: artist.artist,
                        songs: artist.songs,
                        albums: artist.albums,
                      }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "songs") return [value, "Songs"];
                        if (name === "albums") return [value, "Albums"];
                        return [value, name];
                      }}
                      labelFormatter={(label) => {
                        const item = statistics.songsAndAlbumsPerArtist.find(
                          (d) =>
                            d.artist === label ||
                            d.artist.startsWith(label.replace("...", ""))
                        );
                        return item ? item.artist : label;
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="songs"
                      name="Songs"
                      fill={barColors.songs}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="albums"
                      name="Albums"
                      fill={barColors.albums}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Songs per Album - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Albums by Song Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div css={chartContainerStyles}>
              {statistics.songsPerAlbum.length === 0 ? (
                <div css={emptyChartStyles}>No albums available with songs</div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={[...statistics.songsPerAlbum]
                      .sort((a, b) => b.songs - a.songs)
                      .slice(0, 10)
                      .map((album) => ({
                        name:
                          album.album.length > 15
                            ? album.album.substring(0, 15) + "..."
                            : album.album,
                        fullName: `${album.album} (${album.artist})`,
                        songs: album.songs,
                        artist: album.artist,
                      }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [value, "Songs"]}
                      labelFormatter={(label) => {
                        const item = statistics.songsPerAlbum.find(
                          (d) =>
                            d.album === label ||
                            d.album.startsWith(label.replace("...", ""))
                        );
                        return item ? `${item.album} (${item.artist})` : label;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="songs"
                      name="Songs"
                      fill={barColors.albumSongs}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Styles
const containerStyles = css`
  padding: 1.5rem;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #f5f3ff, #eff6ff, #e0e7ff);
`;

const titleStyles = css`
  margin-bottom: 2rem;
  color: #8b5cf6;
  font-size: 1.875rem;
  font-weight: 600;
`;

const cardsContainerStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const cardStyles = css`
  border-radius: 0.5rem;
  overflow: hidden;
`;

const purpleGradientStyles = css`
  background: linear-gradient(to right, #8b5cf6, #7c3aed);
  color: white;
`;

const blueGradientStyles = css`
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
`;

const greenGradientStyles = css`
  background: linear-gradient(to right, #10b981, #059669);
  color: white;
`;

const pinkGradientStyles = css`
  background: linear-gradient(to right, #ec4899, #db2777);
  color: white;
`;

const cardTitleStyles = css`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
`;

const emojiStyles = css`
  font-size: 1.5rem;
`;

const cardValueStyles = css`
  font-size: 1.5rem;
  font-weight: 700;
`;

const chartsContainerStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const chartContainerStyles = css`
  width: 100%;
  height: 300px;
`;

const errorStyles = css`
  color: #ef4444;
  padding: 1.5rem;
  text-align: center;
`;

const emptyStateStyles = css`
  padding: 2.5rem;
  text-align: center;
  color: #64748b;
`;

const emptyChartStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: ${theme.colors.textLight};
  font-size: 1rem;
`;
export default StatsPage;
