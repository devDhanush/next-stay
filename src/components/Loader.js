import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  loaderWrapper: {
    height: "100vh",
    backgroundColor: "#e8e8e8",
  },
  loader: {
    height: "40px",
    width: "40px",
    top: "50%",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Loader = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.loaderWrapper}>
      <img
        alt=""
        className={classes.loader}
        src="https://d1wtk2ls73gxia.cloudfront.net/assets/images/loading.gif"
      />

      {props.children}
    </div>
  );
};

export default Loader;
