import React, { useState } from 'react';
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
  TextField
} from '@material-ui/core';

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
    description: 'Trang web VL Lengend la trang web....',
    keyWords: 'VL,Van lang, Vl Legend, DHVL',
    logo: 'logoVL',
    slogan: 'slogan',
    email: 'Vlu@vanlanguni.edu.vn',
    phone: '093xxx0930',
    facebook: 'facebook.com/vllegend',
    address: 'ĐHVL Cs3'
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
        <Grid item lg={8} md={6} xs={12}>
          <Card>
            <CardHeader
              subheader="Quản lý cấu hình VL Legend"
              title="Cấu hình"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Từ khóa"
                    name="keyWords"
                    onChange={handleChange}
                    required
                    value={values.keyWords}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Slogan"
                    name="slogan"
                    onChange={handleChange}
                    required
                    value={values.slogan}
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
                    label="logo"
                    name="logo"
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
          </Card>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Card>
            <CardHeader subheader="Cập nhật thông tin liên lạc" title="Liên hệ" />
            <Divider />

            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SĐT"
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    onChange={handleChange}
                    type="text"
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    name="facebook"
                    onChange={handleChange}
                    type="text"
                    value={values.facebook}
                    variant="outlined"
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
