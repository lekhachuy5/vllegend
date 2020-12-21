import React, { useState, useEffect, Component } from "react";
import clsx from "clsx";
import axios from "axios";

import { CLASSROOMURL } from "../../../../constant/actionsTypes";
import { Navigate, useParams } from "react-router-dom";
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
import useForm from "../ClassListView/useForm";
import ReactQuill from "react-quill";
const classes = makeStyles({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
});

const Notifications = ({ ...props }) => {
  //redux saga
  const { id } = useParams();

  const [current, setCurrent] = useState({
    id: parseFloat(id),
    name: "",
    descriptions: "",
  });
  useEffect(() => {
     axios
      .get(CLASSROOMURL + id)
      .then((response) => {
        console.log(response.data);
        setCurrent({ ...response.data });
        setValues({ ...response.data });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const initialFieldsValues = {
    id: parseFloat(id),
    name: current.name,
    descriptions: current.descriptions,
  };

  function ckChange(e) {
    const getVl = { descriptions: e };
    console.log(current);
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
  }
  const [isSuccess, setIsSuccess] = useState(false);
  const validate = (fieldsValues = values) => {
    let temp = {};
    if ("name" in fieldsValues)
      temp.name =
        values.name || current.name
          ? (values.name.length || current.name.length) > 10
            ? ""
            : "must > 10 character"
          : "Required";
    // if ('email' in fieldsValues)
    //     temp.email = values.email ? ((/^$|.+@.+..+/).test(values.email) ? "" : "Mail not valid") : "required"
    if ("descriptions" in fieldsValues)
      temp.descriptions = values.descriptions ? "" : "Required";

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
  } = useForm(initialFieldsValues, validate, props.setCurrentId);

  const updateFnc = (e) => {
    e.preventDefault();
    console.log(values);
    const inputVal = Object.values(values).every((x)=> x== null) ? current : values;
    console.log(inputVal)
    if (validate()) {
      props.updateClass(
        CLASSROOMURL+'edit/',
        id,
        inputVal
      );
      setIsSuccess(true);
    }
  };

  return (
    <>
      {isSuccess ? <Navigate to="/quanly/classes" /> : null}
      <form className={clsx(classes.root)} onSubmit={updateFnc}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={6} xs={12}>
            <Card>
              <CardHeader subheader="Thêm lớp học" title="Thông tin lớp học" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Tên lớp học"
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

                  <Grid item md={12} xs={12}>
                    <Typography ml={1} variant="body1">
                      Mô tả
                    </Typography>
                    <ReactQuill
                      value={values.descriptions}
                      onChange={ckChange}
                    />
                  </Grid>
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
                  Cập nhật
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

const mapStateToProps = (state) => ({
  classroomlist: state.cus.list,
});
const mapActionToProps = {
  updateClass: action.update,
  // fectid: action.fecthbyid
};

export default connect(mapStateToProps, mapActionToProps)(Notifications);
