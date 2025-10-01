import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacings.large};
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacings.large};

  @media ${(props) => props.theme.breakpoints.mobile} {
    flex-direction: column;
    gap: ${(props) => props.theme.spacings.medium};
    align-items: stretch;
  }
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0;
`;

const CreateButton = styled.button`
  background: ${(props) => props.theme.colors.accent};
  color: white;
  padding: ${(props) => props.theme.spacings.medium}
    ${(props) => props.theme.spacings.large};
  border-radius: ${(props) => props.theme.borders.radius};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const RefreshButton = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacings.small}
    ${(props) => props.theme.spacings.medium};
  border: 1px solid ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.borders.radius};
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;
  margin-left: ${(props) => props.theme.spacings.medium};

  &:hover {
    background: ${(props) => props.theme.colors.almostLight};
  }
`;

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacings.medium};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacings.xlarge};
  color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.theme.fontSizes.large};
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: ${(props) => props.theme.spacings.medium};
  border-radius: ${(props) => props.theme.borders.radius};
  margin-bottom: ${(props) => props.theme.spacings.medium};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacings.xlarge};
  color: ${(props) => props.theme.colors.light};
`;

const EmptyStateTitle = styled.h3`
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pollingVideos, setPollingVideos] = useState(new Set());

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/videos');

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.statusText}`);
      }

      const data = await response.json();
      setVideos(data.videos || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createVideo = async (formData) => {
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create video');
      }

      const newVideo = await response.json();

      // Add the new video to the list and start polling for its status
      setVideos((prev) => [newVideo, ...prev]);

      if (newVideo.status !== 'complete' && newVideo.status !== 'failed') {
        setPollingVideos((prev) => new Set([...prev, newVideo.id]));
        pollVideoStatus(newVideo.id);
      }

      return newVideo;
    } catch (err) {
      console.error('Error creating video:', err);
      throw err;
    }
  };

  const pollVideoStatus = async (videoId) => {
    try {
      const response = await fetch(`/api/videos/${videoId}`);
      if (!response.ok) return;

      const updatedVideo = await response.json();

      // Update the video in the list
      setVideos((prev) =>
        prev.map((video) => (video.id === videoId ? updatedVideo : video))
      );

      // If video is still processing, continue polling
      if (
        updatedVideo.status === 'in_progress' ||
        updatedVideo.status === 'pending'
      ) {
        setTimeout(() => pollVideoStatus(videoId), 5000);
      } else {
        // Remove from polling set when complete
        setPollingVideos((prev) => {
          const newSet = new Set(prev);
          newSet.delete(videoId);
          return newSet;
        });
      }
    } catch (err) {
      console.error('Error polling video status:', err);
      // Remove from polling set on error
      setPollingVideos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Start polling for any in-progress videos when component mounts
  useEffect(() => {
    const inProgressVideos = videos.filter(
      (video) => video.status === 'in_progress' || video.status === 'pending'
    );

    inProgressVideos.forEach((video) => {
      if (!pollingVideos.has(video.id)) {
        setPollingVideos((prev) => new Set([...prev, video.id]));
        pollVideoStatus(video.id);
      }
    });
  }, [videos]);

  return (
    <Layout>
      <MainContent>
        <ActionBar>
          <div>
            <SectionTitle>Your Videos</SectionTitle>
            <RefreshButton onClick={fetchVideos}>Refresh</RefreshButton>
          </div>
          <CreateButton onClick={() => setIsModalOpen(true)}>
            Create New Video
          </CreateButton>
        </ActionBar>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading ? (
          <LoadingMessage>Loading videos...</LoadingMessage>
        ) : videos.length === 0 ? (
          <EmptyState>
            <EmptyStateTitle>No videos yet</EmptyStateTitle>
            <p>Create your first AI-powered video to get started!</p>
          </EmptyState>
        ) : (
          <VideoList>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </VideoList>
        )}

        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createVideo}
        />
      </MainContent>
    </Layout>
  );
}
