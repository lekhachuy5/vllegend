import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/adminpages/components/GlobalStyles';


import 'src/adminpages/mixins/chartjs';
import theme from 'src/adminpages/theme';
import routes from 'src/routes';
import "tailwindcss/dist/base.css";

import "src/clientpages/styles/globalStyles.css";
import "nes.css/css/nes.min.css";


const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
