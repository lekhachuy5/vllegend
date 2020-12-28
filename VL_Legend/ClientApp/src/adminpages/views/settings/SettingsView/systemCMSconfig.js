import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as action from "../../../../action/actions";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import useForm from "../../classroom/ClassListView/useForm";
import SysConfigApi from "../../../../apimod/sysConfigApi";
import UploadAPI from "../../../../apimod/uploadApi";
import Moment from "moment";

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
    folder: "",
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
    getData();
  }, []);

  const getData = async () => {
    const response = await SysConfigApi.get();

    setCurrent({ ...response });
    setValues({ ...response });
  };

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

  const todayConvert = () => {
    const getDate = new Date();
    const getTime = Moment(getDate).format("hhmmss");
    const today = Moment(getDate).format("DDMMyyyy");
    const all = today + getTime;
    return all;
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
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFieldsValues,
    validate,
    props.setCurrentId
  );
  const ckChange = (e) => {
    const getVl = { description: e };
    const inputVal = Object.values(values).every((x) => x == null);
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
  };
  const updateSys = (e) => {
    console.log(values);
    e.preventDefault();
    const inputVal = Object.values(values).every((x) => x == null)
      ? current
      : values;
    if (validate()) {
      if (values.image !== current.image && values.images !== null) {
        const fd = new FormData();
        fd.append("file",filesToBeSent.file,filesToBeSent.name);
        UploadAPI.create(filesToBeSent.folder,fd);
      }
      SysConfigApi.update(inputVal);
    }
  };

  const handleUploadClick = (event) => {
    const dateValue = todayConvert();
    const target = event.target.files[0];
    
    // get file name without extension and combine name withdate then combine code with extension
    const setName = dateValue+target.name;
     
    console.log(setName);
    // chuyển file sang FormData để post dữ liệu;

    // chuyển dữ liệu vào file state
   
    setFilesToBeSent({ ...filesToBeSent,name: setName, file: target });
    console.log(target.name + " size :" + target.size);
    // chuyển dữ liệu vào valúe state
    setValues({ ...values, image: setName });
    //đọc hình ảnh tải lên và hiển thị
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document
          .getElementById("imgSmall")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
                    {...(values.image != null && current.image != null
                      ? ""
                      : "required")}
                    variant="outlined"
                  />
                  <img
                    id="imgSmall"
                    src={`/storages/${filesToBeSent.folder? filesToBeSent.folder : "upload"}/${values.image}`}
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
              {/* <Button type="button" color="primary" onClick={testDataUpload}variant="contained">
               upload
              </Button> */}
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
