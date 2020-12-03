import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CKEditor from 'react-ckeditor-component';
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
  TextField,
  Select,
  MenuItem
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
  const [values, setValues] = useState({
    icon: './static/images/logoVL.png',
    description: 'Đây là lớp.....',
    status: true,
    name: 'Anh văn'
  });

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
            <CardHeader subheader="Tạo khóa học" title="Thông tin khóa học" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Tên khóa học"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                <TextField
                    fullWidth
                    label="Enroll key"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                    type='password'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography ml={1} variant="body1">
                    Trạng thái
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
                <Grid item md={6} xs={12}>
                <Typography ml={1} variant="body1">
                    Thuộc lớp học
                  </Typography>
                <Select fullWidth label="Thuộc lớp học" name="role" defaultValue={'Admin'}>
                      <MenuItem value="Admin">Anh văn 1</MenuItem>
                      <MenuItem value="Lecturers">Anh văn 2</MenuItem>
                    </Select>
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
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained">
                Thêm mới
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
