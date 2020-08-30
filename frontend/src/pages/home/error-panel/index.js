import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';

import useAppError from 'hooks/use-app-error';

const ErrorPanel = () => {
  const error = useAppError();

  return error.text ? <Box>{error.text}</Box> : null;
};

export { ErrorPanel };
