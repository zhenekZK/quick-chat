import styled from 'styled-components';
import { Grid, Box } from '@material-ui/core';

import { Field } from 'components/field';

export const Container = styled(Grid)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ChatContainer = styled(Box)`
  position: relative;
  width: 60%;
  height: 80%;
  padding: 20px;
  background-color: #f2b984;
  border-radius: 15px;
`;

export const MessagesContainer = styled(Box)`
  height: calc(100% - 80px);
  scroll-behavior: revert;
  overflow: auto;
`;

export const SendButtonContainer = styled(Box)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.palette.common.white};
`;

export const Input = styled(Field)`
  margin: 0;
`;

export const InputContainer = styled(Box)`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: calc(100% - 40px);
`;
