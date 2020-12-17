import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as action from "../../../../action/actions";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import { SYSCFGURL } from "../../../../constant/actionsTypes";
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
} from "@material-ui/core";
import useForm from "../../product/ClassListView/useForm";
const useStyles = makeStyles({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
});

const Notifications = ({ className, ...props }) => {
  const classes = useStyles();
  const [filesToBeSent, setFilesToBeSent] = useState({
    name: "",
    file: null,
  });
  const [current, setCurrent] = useState({
    id: 1,
    description: "",
    keywords: "",
    image: "",
    slogan: "",
    email: "",
    phone: "",
    facebook: "",
    address: "",
  });
  useEffect(() => {
    const value = axios
      .get(SYSCFGURL + 1)
      .then((response) => {
        console.log(response.data);
        setCurrent({ ...response.data });
        setValues({ ...response.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const initialFieldsValues = {
    id: 1,
    description: "",
    keywords: "",
    image: "",
    slogan: "",
    email: "",
    phone: "",
    facebook: "",
    address: "",
  };

  const validate = (fieldsValues = values) => {
    let temp = {};
    if ("keywords" in fieldsValues)
      temp.name = values.keywords || current.keywords ? "" : "Required";
    if ("email" in fieldsValues)
      temp.email = values.email
        ? /^$|.+@.+..+/.test(values.email)
          ? ""
          : "Mail not valid"
        : "required";
    if ("description" in fieldsValues)
      temp.description = values.description ? "" : "Required";
    if ("slogan" in fieldsValues) temp.slogan = values.slogan ? "" : "Required";
    if ("phone" in fieldsValues) temp.phone = values.phone ? "" : "Required";
    if ("facebook" in fieldsValues)
      temp.facebook = values.facebook ? "" : "Required";
    if ("address" in fieldsValues)
      temp.address = values.address ? "" : "Required";

    setErrors({
      ...temp,
    });
    if (fieldsValues == values)
      return Object.values(temp).every((x) => x == "");
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldsValues, validate, props.setCurrentId);
  function ckChange(e) {
    const getVl = { description: e };
    const inputVal = Object.values(values).every((x) => x == null);
    console.log(current);
    if (!inputVal) {
      setValues({
        ...current,
        ...getVl,
      });
    } else {
      setValues({
        ...values,
        ...getVl,
      });
    }
  }
  const updateSys = (e) => {
    
    console.log(values);

    const inputVal = Object.values(values).every((x) => x == null)
      ? current
      : values;
    if (validate()) {
      if (values.image !== current.image && values.images !== null) {
        const fd = new FormData();
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        fd.append('file',filesToBeSent.file, filesToBeSent.file.name);
        var apiBaseUrl = "https://localhost:44337/api/upload/postfile";
    
        axios.post(apiBaseUrl,fd,config)
        .then(res=> {
          console.log(res);
        })
        // }
      }
      props.updateSys(SYSCFGURL + "edit/", 1, inputVal);
      // setIsSuccess(true);
    }
  };

  const testDataUpload = ()=>{
  
    const fd = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    fd.append('file',filesToBeSent.file, filesToBeSent.file.name);
    var apiBaseUrl = "https://localhost:44337/api/upload/postfile";

    axios.post(apiBaseUrl,fd,config)
    .then(res=> {
      console.log(res);
    })
  }

  const handleUploadClick = (event) => {
    // event.preventDefault();
    const target = event.target.files[0];
    setFilesToBeSent({ name: target.name, file: target });
    console.log(target.name + " size :" + target.size);
    console.log(filesToBeSent);
    setValues({ ...values, image: target.name });
    console.log(values);
    const f = new FormData();
    f.set("file", event.target);
    console.log(f.getAll("file"));
    // var apiBaseUrl =  'https://localhost:44337/api/upload/upload';
    // if(filesToBeSent.length>0){
    //     var filesArray = filesToBeSent;
    //     let f = new FormData();
    //     for(var i in filesArray){
    //     console.log("files",filesArray);
    //          f = new FormData();
    //          f.append("File",filesArray[i][0] )
    //          axios.post(apiBaseUrl, f, {
    //                 headers: {'Content-Type': 'multipart/form-data'}
    //          });
    //     }
    //     alert("File upload completed");
    // }
    // else{
    //     alert("Please select files first");
    // }
  };
  return (
    <form className={clsx(classes.root, className)} onSubmit={updateSys}>
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
                    name="keywords"
                    onChange={handleInputChange}
                    required
                    value={values.keywords}
                    variant="outlined"
                    {...(errors.keywords && {
                      error: true,
                      helperText: errors.keywords,
                    })}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Slogan"
                    name="slogan"
                    onChange={handleInputChange}
                    required
                    value={values.slogan}
                    variant="outlined"
                    {...(errors.slogan && {
                      error: true,
                      helperText: errors.slogan,
                    })}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography ml={1} variant="body1">
                    Mô tả
                  </Typography>

                  <ReactQuill
                    name="description"
                    onChange={ckChange}
                    required
                    value={values.description}
                    variant="outlined"
                    {...(errors.description && {
                      error: true,
                      helperText: errors.description,
                    })}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <input
                    type="file"
                    label="logo"
                    name="image"
                    // value={values.image}
                    onChange={(e) => handleUploadClick(e)}
                    required
                    variant="outlined"
                  />
                  <img
                    src={`/storages/uploadfiles/${values.image}`}
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </Card>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Card>
            <CardHeader
              subheader="Cập nhật thông tin liên lạc"
              title="Liên hệ"
            />
            <Divider />

            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={handleInputChange}
                    required
                    value={values.email}
                    {...(errors.email && {
                      error: true,
                      helperText: errors.email,
                    })}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SĐT"
                    name="phone"
                    onChange={handleInputChange}
                    type="text"
                    value={values.phone}
                    variant="outlined"
                    {...(errors.phone && {
                      error: true,
                      helperText: errors.phone,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    onChange={handleInputChange}
                    type="text"
                    value={values.address}
                    variant="outlined"
                    {...(errors.address && {
                      error: true,
                      helperText: errors.address,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    name="facebook"
                    onChange={handleInputChange}
                    type="text"
                    value={values.facebook}
                    {...(errors.facebook && {
                      error: true,
                      helperText: errors.facebook,
                    })}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>

            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button type="submit" color="primary" variant="contained">
                Cập nhật
              </Button>
              <Button type="button" color="primary" onClick={testDataUpload}variant="contained">
               upload
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string,
};
const mapStateToProps = (state) => ({
  systemConfigList: state.cus.list,
});
const mapActionToProps = {
  updateSys: action.update,
  // fectid: action.fecthbyid
};

export default connect(mapStateToProps, mapActionToProps)(Notifications);
