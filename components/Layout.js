import styled from 'styled-components';

const Container = styled.div`
  max-width: ${(props) => props.theme.breakpoints.maxWidth};
  margin: 0 auto;
  padding: ${(props) => props.theme.spacings.large};
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacings.xlarge};
  padding-bottom: ${(props) => props.theme.spacings.large};
  border-bottom: 2px solid ${(props) => props.theme.colors.almostLight};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.massive};
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-bottom: 0;
`;

export default function Layout({
  children,
  title = 'Synthesia Video Generator',
  subtitle = 'Create AI-powered videos with ease',
}) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Header>
      {children}
    </Container>
  );
}
