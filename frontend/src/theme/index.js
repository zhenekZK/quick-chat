import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';
// import overrides from './overrides';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette,
    typography,
  }),
  { disableAlign: true },
);

export { theme };
