import React, { Component, useEffect } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/adminpages/components/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
import { BASEURL } from "../../../../constant/actionsTypes";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../../../action/actions";

const classes = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));
const controllerurl = BASEURL + 'classroom';
const ProductList = ({ ...props }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = { business: [] };
  // }
  useEffect(() => {
    props.fecthAllCLassroom('https://localhost:44337/api/classroom');
  }, []);

  return (
    <Page className={classes.root} title="Lớp học">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {props.classList.map((object, i) => {
              return (
                <Grid item key={i} lg={4} md={6} xs={12}>
                  <ProductCard
                    className={classes.productCard}
                    product={object}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  classList: state.cus.list,
});
const mapActionToProps = {
  fecthAllCLassroom: action.fecthall,
  // deleteCus: action.Delete
};

export default connect(mapStateToProps, mapActionToProps)(ProductList);
