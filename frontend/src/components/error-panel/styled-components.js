import styled, { keyframes } from 'styled-components';
import { Box, Typography } from '@material-ui/core';

import { CONTAINER_ANIMATION_DELAY_SECONDS } from './constants';

const containerHeight = '50px';

const ContainerMovement = keyframes`
  7%, 93% { top: calc(${containerHeight} / 4); opacity: 1; }
  11%, 89% { top: 0; }
  100% { top: -${containerHeight}; opacity: 0; }
`;

export const Text = styled(Typography)`
  line-height: ${containerHeight};
  font-weight: bold;
`;

export const Container = styled(Box)`
  position: absolute;
  top: -${containerHeight};
  left: 0;
  width: 100%;
  height: ${containerHeight};
  z-index: 100;
  background-color: #e23939;
  color: #fff;
  text-align: center;
  opacity: 0;
  animation: ${ContainerMovement} ${CONTAINER_ANIMATION_DELAY_SECONDS}s ease-out;
`;
