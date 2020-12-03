import React from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/adminpages/components/Page';
import Form from './customForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Thêm lớp học"
    >
      <Container maxWidth="lg">
        <Form />
      
      </Container>
    </Page>
  );
};

export default SettingsView;
