import React, { useEffect } from 'react';

import useAppError from 'hooks/use-app-error';

import { CONTAINER_ANIMATION_DELAY_SECONDS } from './constants';
import { Container, Text } from './styled-components';

const ErrorPanel = () => {
  const { errorData, setErrorData } = useAppError();
  const text = errorData.text;

  useEffect(() => {
    if (text) {
      setTimeout(() => {
        setErrorData({ text: '' });
      }, CONTAINER_ANIMATION_DELAY_SECONDS * 1000);
    }
  }, [text, setErrorData]);

  if (!text) {
    return null;
  }

  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

export { ErrorPanel as default };
