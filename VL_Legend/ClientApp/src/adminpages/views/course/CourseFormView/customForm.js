import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
import { connect } from "react-redux";
import * as action from "../../../../action/actions";
import useForm from "../../classroom/ClassListView/useForm";

import * as ReactQuill from "react-quill";
import CourseApi from "src/apimod/courseApi";

const classes = makeStyles({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
});

const Notifications = ({ ...props }) => {
  const { class_id, id } = useParams();

  const [current, setCurrent] = useState({
    id: id,
    name: "",
    descriptions: "",
    enrollKey: "",
    class_id: parseFloat(class_id),
  });
  const initialFieldsValues = {
    id: id,
    name: "",
    descriptions: "",
    enrollKey: "",
    class_id: parseFloat(class_id),
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (id) {
      const response = await CourseApi.get(id);
      console.log(response);
      setCurrent({ ...response });
      setValues({ ...response });
    }
  };

  const [isSuccess, setIsSuccess] = useState(false);
  const validate = (fieldsValues = values) => {
    let temp = {};
    if ("name" in fieldsValues)
      temp.name = values.name
        ? values.name.length >= 10
          ? ""
          : "Tên phải có ít nhất 10 ký tự"
        : "Không được bỏ trống";
    // if ('email' in fieldsValues)
    //     temp.email = values.email ? ((/^$|.+@.+..+/).test(values.email) ? "" : "Mail not valid") : "required"
    // if ("descriptions" in fieldsValues)
    //   temp.descriptions = values.descriptions ? "" : "Required";

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

  const createNew = (e) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        e.preventDefault();
        console.log(values);
        const inputVal = Object.values(values).every((x) => x == null)
          ? current
          : values;
        console.log(inputVal);
        CourseApi.update(id, values);
        setIsSuccess(true);
      } else {
        CourseApi.create(values);
        setIsSuccess(true);
      }
    }
  };
  const ckChange = (value) => {
    const getVl = { descriptions: value };
    if (values.name == "") {
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
    console.log(values);
  };

  return (
    <>
      {isSuccess ? <Navigate to={`/quanly/course/${class_id}`} /> : null}
      <form className={clsx(classes.root)} onSubmit={createNew}>
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
                      onChange={handleInputChange}
                      required
                      value={values.name}
                      variant="outlined"
                      {...(errors.name && {
                        error: true,
                        helperText: errors.name,
                      })}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Enroll Key"
                      name="enrollKey"
                      onChange={handleInputChange}
                      
                      value={values.enrollKey}
                      variant="outlined"
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <TextField
                    name="descriptions"
                      
                      value={values.descriptions}
                      // onChange={handleInputChange}         
                    />
                  </Grid> */}
                  {/* <Grid item md={6} xs={12}>
                    <Typography ml={1} variant="body1">
                      Trạng thái (hoạt động/không hoạt động)
                    </Typography>
                    <Checkbox
                      fullWidth
                      label="Trạng thái"
                      name="status"
                      onChange={this.handleChange}
                      required
                      value={true}
                      variant="outlined"
                    />
                  </Grid> */}
                  <Grid item md={12} xs={12}>
                    <Typography ml={1} variant="body1">
                      Mô tả
                    </Typography>
                    <ReactQuill
                      // id="editor"
                      // name = 'descriptions'
                      onChange={ckChange}
                      value={values.descriptions}
                      // variant="outlined"
                    />
                  </Grid>
                  {/* <Grid item md={12} xs={12}>
                    <input
                      type="file"
                      fullWidth
                      label="icon"
                      name="icon"
                      onChange={this.handleChange}
                      required
                      variant="outlined"
                    />
                    <img
                      src="/static/images/logoVL.png"
                      style={{ maxHeight: "100px", maxWidth: "100px" }}
                    />
                  </Grid> */}
                </Grid>
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  // onClick={this.createNew}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                 {id ? "Cập nhật" : "Thêm mới"}
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

// Notifications.propTypes = {
//   className: PropTypes.string,
// };

const mapActionToProps = {
  createClass: action.create,
  // updateCus: action.update
};

export default connect(null, mapActionToProps)(Notifications);
