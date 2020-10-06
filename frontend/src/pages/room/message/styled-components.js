import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

export const InfoMessage = styled(Typography)`
  font-style: italic;
`;

export const UserMessageTextWrapper = styled(Box)`
  max-width: 35%;
  background-color: ${({ theme }) => theme.palette.common.white};
  border-radius: 15px;
  padding: ${({ theme }) => `${theme.spacing(1)}px`};
`;

export const UserMessageText = styled(Typography)`
  font-weight: 700;
`;
