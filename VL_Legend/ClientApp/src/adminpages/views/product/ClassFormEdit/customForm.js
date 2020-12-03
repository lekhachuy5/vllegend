import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CKEditor from 'react-ckeditor-component';
import data  from '../ClassListView/data';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [values, setValues] = useState({
    icon: './static/images/logoVL.png',
    description: 'Đây là lớp.....',
    status: true,
    name: 'Anh văn'
  });

  useEffect(() => {
    const newPerson = data.find((person) => person.id === id);
    console.log(newPerson);
    setValues({ ...values, name: 'Dropbox' });
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={6} xs={12}>
          <Card>
            <CardHeader subheader="Tạo lớp học" title="Thông tin lớp học" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Tên lớp học"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography ml={1} variant="body1">
                    Trạng thái (hoạt động/không hoạt động)
                  </Typography>
                  <Checkbox
                    fullWidth
                    label="Trạng thái"
                    name="status"
                    onChange={handleChange}
                    required
                    value={values.status}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography ml={1} variant="body1">
                    Mô tả
                  </Typography>
                  <CKEditor
                    activeClass="editor"
                    fullWidthnp
                    helperText="Ghi đầy đủ thông tin cá nhân"
                    label="Họ tên"
                    name="description"
                    onChange={handleChange}
                    required
                    content={values.description}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <input
                    type="file"
                    fullWidth
                    label="icon"
                    name="icon"
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                  <img
                    src="/static/images/logoVL.png"
                    style={{ maxHeight: '100px', maxWidth: '100px' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained">
                Cập nhật
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
