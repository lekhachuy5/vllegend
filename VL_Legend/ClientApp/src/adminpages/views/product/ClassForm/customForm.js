import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import { BASEURL } from "../../../../constant/actionsTypes";
import { Navigate } from "react-router-dom";
import CKEditor from "react-ckeditor-component";
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
import { useParams } from "react-router-dom";

const classes = makeStyles({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
});

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descriptions: "",
      isSuccess: false,
    };
  }
  //redux saga
  createNew = () => {
    axios
      .post(BASEURL + "classroom/Create/", {
        name: this.state.name,
        descriptions: this.state.descriptions,
      })
      // <Redirect to="/Administratvie/classes"/>
      .then((json) => {
        console.log(json);
        // this.props.history.push("/ProductList");
        this.setState({isSuccess:true});
      
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCK = (event) => {
    // if ([event.target.name] === "descriptions") {
    //   this.setState({
    //     [event.target.name]: event.target.content,
    //   });
    // }
    console.log(event.editor.getData());
    this.setState({
      [event.target.name]: event.editor.getData(),
    });
  };
  handleChange = (event) => {
    // if ([event.target.name] === "descriptions") {
    //   this.setState({
    //     [event.target.name]: event.target.content,
    //   });
    // }
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)

  };
  render() {
    return (
      <>
        {this.state.isSuccess ? <Navigate to= "/Administratvie/classes"/> : null }
        <form className={clsx(classes.root)}>
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
                        onChange={this.handleChange}
                        required
                        value={this.state.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Mô tả"
                        name="descriptions"
                        onChange={this.handleChange}
                        required
                        value={this.state.descriptions}
                        variant="outlined"
                      />
                    </Grid>
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
                    {/* <Grid item md={12} xs={12}>
                    <Typography ml={1} variant="body1">
                      Mô tả
                    </Typography>
                    <CKEditor
                      activeClass="editor"
                      fullWidth
                      helperText="Ghi đầy đủ thông tin cá nhân"
                      label="Họ tên"
                      name="description"
                      onChange={this.handleCK}
                      required
                      content={this.state.descriptions}
                      
                      variant="outlined"
                    />
                  </Grid> */}
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
                    onClick={this.createNew}
                    color="primary"
                    variant="contained"
                  >
                    Thêm mới
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

Notifications.propTypes = {
  className: PropTypes.string,
};

export default Notifications;
