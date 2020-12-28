import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar alt="Product" variant="square" />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          <Link params={product.id} to={{ pathname: `formedit/${product.id}` }}>
            {" "}
            {product.name}
          </Link>
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: product.descriptions,
          }}
        >
          {/* {product.descriptions} */}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <Button color="secondary" display="inline" variant="contained">
              <Link
                params={product.id}
                to={{ pathname: `formedit/${product.id}` }}
              >
                cập nhật
              </Link>
            </Button>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography color="textSecondary" display="inline" variant="body2">
              <Link to={`/quanly/course/${product.id}`}>
                Xem khóa học
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
