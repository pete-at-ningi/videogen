import styled from 'styled-components';

const Card = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borders.radius};
  padding: ${(props) => props.theme.spacings.large};
  margin-bottom: ${(props) => props.theme.spacings.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.colors.almostLight};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacings.medium};
`;

const CardTitle = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${(props) => props.theme.spacings.small} 12px;
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 500;
  text-transform: capitalize;

  ${(props) => {
    switch (props.status) {
      case 'complete':
        return `
          background: #e8f5e8;
          color: #2d5a2d;
        `;
      case 'in_progress':
        return `
          background: #fff3cd;
          color: #856404;
        `;
      case 'failed':
        return `
          background: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background: ${props.theme.colors.almostLight};
          color: ${props.theme.colors.dark};
        `;
    }
  }}
`;

const VideoInfo = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

const VideoPreview = styled.div`
  margin-top: ${(props) => props.theme.spacings.medium};
`;

const VideoLink = styled.a`
  display: inline-block;
  background: ${(props) => props.theme.colors.accent};
  color: white;
  padding: ${(props) => props.theme.spacings.small}
    ${(props) => props.theme.spacings.medium};
  border-radius: ${(props) => props.theme.borders.radius};
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
  }
`;

export default function VideoCard({ video }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{video.title || 'Untitled Video'}</CardTitle>
          <VideoInfo>
            Created: {formatDate(video.createdAt)}
            {video.updatedAt && video.updatedAt !== video.createdAt && (
              <> • Updated: {formatDate(video.updatedAt)}</>
            )}
          </VideoInfo>
          <VideoInfo>ID: {video.id}</VideoInfo>
        </div>
        <StatusBadge status={video.status}>
          {video.status || 'unknown'}
        </StatusBadge>
      </CardHeader>

      {video.status === 'complete' && video.download && (
        <VideoPreview>
          <VideoLink
            href={video.download}
            target='_blank'
            rel='noopener noreferrer'
          >
            Download Video
          </VideoLink>
        </VideoPreview>
      )}
    </Card>
  );
}
