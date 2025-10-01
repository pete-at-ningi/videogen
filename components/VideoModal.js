import { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${(props) => props.theme.spacings.large};
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borders.radius};
  padding: ${(props) => props.theme.spacings.xlarge};
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacings.large};
`;

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${(props) => props.theme.colors.light};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: ${(props) => props.theme.colors.almostLight};
    color: ${(props) => props.theme.colors.dark};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacings.medium};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacings.small};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.colors.dark};
`;

const Input = styled.input`
  padding: ${(props) => props.theme.spacings.medium};
  border: 1px solid ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.borders.radius};
  font-size: ${(props) => props.theme.fontSizes.medium};

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: ${(props) => props.theme.spacings.medium};
  border: 1px solid ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.borders.radius};
  font-size: ${(props) => props.theme.fontSizes.medium};
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    outline: none;
  }
`;

const Select = styled.select`
  padding: ${(props) => props.theme.spacings.medium};
  border: 1px solid ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.borders.radius};
  font-size: ${(props) => props.theme.fontSizes.medium};
  background: white;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacings.medium};
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacings.large};
`;

const Button = styled.button`
  padding: ${(props) => props.theme.spacings.medium}
    ${(props) => props.theme.spacings.large};
  border-radius: ${(props) => props.theme.borders.radius};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background: ${props.theme.colors.accent};
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: ${props.theme.colors.primary};
    }

    &:disabled {
      background: ${props.theme.colors.light};
      cursor: not-allowed;
    }
  `
      : `
    background: transparent;
    color: ${props.theme.colors.secondary};
    border: 1px solid ${props.theme.colors.light};

    &:hover {
      background: ${props.theme.colors.almostLight};
    }
  `}
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${(props) => props.theme.spacings.small};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function VideoModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    script: '',
    avatar: 'anna_costume1_cameraA',
    background: 'green_screen',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        script: '',
        avatar: 'anna_costume1_cameraA',
        background: 'green_screen',
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create New Video</ModalTitle>
          <CloseButton onClick={onClose} type='button'>
            ×
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor='title'>Video Title</Label>
            <Input
              id='title'
              name='title'
              type='text'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter a title for your video'
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor='script'>Script</Label>
            <TextArea
              id='script'
              name='script'
              value={formData.script}
              onChange={handleChange}
              placeholder='Enter the script for your video...'
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor='avatar'>Avatar</Label>
            <Select
              id='avatar'
              name='avatar'
              value={formData.avatar}
              onChange={handleChange}
            >
              <option value='anna_costume1_cameraA'>
                Anna (Costume 1, Camera A)
              </option>
              <option value='anna_costume1_cameraB'>
                Anna (Costume 1, Camera B)
              </option>
              <option value='james_costume1_cameraA'>
                James (Costume 1, Camera A)
              </option>
              <option value='james_costume1_cameraB'>
                James (Costume 1, Camera B)
              </option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor='background'>Background</Label>
            <Select
              id='background'
              name='background'
              value={formData.background}
              onChange={handleChange}
            >
              <option value='green_screen'>Green Screen</option>
              <option value='office'>Office</option>
              <option value='white'>White Background</option>
              <option value='blue'>Blue Background</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <Button type='button' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' variant='primary' disabled={isSubmitting}>
              {isSubmitting && <LoadingSpinner />}
              {isSubmitting ? 'Creating...' : 'Create Video'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}
