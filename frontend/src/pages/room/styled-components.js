import styled from 'styled-components';
import { Grid, Box } from '@material-ui/core';

export const Container = styled(Grid)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ChatContainer = styled(Box)`
  position: relative;
  width: 60%;
  height: 80%;
  background-color: #f2b984;
  border-radius: 15px;
`;

export const InputContainer = styled(Box)`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 96%;
`;
