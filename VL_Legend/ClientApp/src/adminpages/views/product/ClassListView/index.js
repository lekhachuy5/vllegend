import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/adminpages/components/Page";
import ProductCard from "./ProductCard";
import { CLASSROOMURL } from "../../../../constant/actionsTypes";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../../../action/actions";
import clsx from "clsx";
import { Search as SearchIcon } from "react-feather";

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
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const ProductList = ({ ...props }) => {
  const [state, setState] = useState({
    offset: 0,
    tableData: [],
    orgtableData: [],
    perPage: 9,
    currentPage: 1,
    pageCount: 0,
  });
  const [filters, setFilters] = useState(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [filters, page]);

  const getData = () => {
    const requestUrl = CLASSROOMURL;
    axios.get(requestUrl).then((res) => {
      const getDg = filters
        ? res.data.filter(
            (x) =>
              x.name.toLowerCase().includes(filters) ||
              x.descriptions.toLowerCase().includes(filters)
          )
        : res.data;
      console.log(getDg);
      const data = getDg.sort((a, b) => a - b).reverse();

      const slice = data.slice(state.offset, state.offset + state.perPage);
      setState({
        ...state,
        pageCount: Math.ceil(data.length / state.perPage),
        orgtableData: res.data,
        tableData: slice,
      });
    });
  };

  const changeSearchInputs = (e) => {
    const { value } = e.target;
    setFilters(value);
  };

  const handlePageChange2 = (e, value) => {
    e.preventDefault();
    const selectedpage = value;
    setPage(value);
    const offset = (selectedpage - 1) * state.perPage;
    setState({
      ...state,
      currentPage: selectedpage,
      offset: offset,
    });
  };

  return (
    <Page className={classes.root} title="Lớp học">
      <Container maxWidth={false}>
        <div className={clsx(classes.root)}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              color="primary"
              className={classes.importButton}
              variant="contained"
              href={`classes/form`}
            >
              Thêm lớp học
            </Button>
          </Box>
          <Box mt={3}>
            <Card>
              <CardContent>
                <Box maxWidth={500}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Tìm lớp học"
                    variant="outlined"
                    onChange={changeSearchInputs}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
        <Box mt={3}>
          <Grid container spacing={3}>
            {state.tableData.map((object, i) => {
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
        <Box mt={3} mb={3} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={state.pageCount}
            page={state.currentPage}
            onChange={handlePageChange2}
          />
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
};

export default connect(mapStateToProps, mapActionToProps)(ProductList);
