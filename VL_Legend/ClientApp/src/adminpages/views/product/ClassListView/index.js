import React, { Component } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/adminpages/components/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
import { BASEURL } from "../../../../constant/actionsTypes";
import axios from "axios";

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

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { business: [] };
  }
  componentDidMount() {
    axios
      .get(BASEURL + "classroom")
      .then((response) => {
        this.setState({ business: response.data });
        // debugger;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  productCard() {
    return this.state.business.map(function(object, i) {
      return (
        <Grid item key={i} lg={4} md={6} xs={12}>
          <ProductCard className={classes.productCard} product={object} />
        </Grid>
      );
    });
  }
  render() {
   
    return (
      <Page className={classes.root} title="Lớp học">
        <Container maxWidth={false}>
          <Toolbar />
          <Box mt={3}>
            <Grid container spacing={3}>
              {this.productCard()}
            </Grid>
          </Box>
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Page>
    );
  }
}

export default ProductList;
