import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import ResponsiveAppBar from "./AppBar";
import RecipeReviewCard from "./Card";

export default function PGList() {
  const [data, setData] = React.useState([]);
  if (data?.length === 0)
    axios
      .post("https://next-home-api.herokuapp.com/fetchTable")
      .then((data) => {
        setData(data?.data?.data);
      });
  return (
    <Grid container display="flex">
      <ResponsiveAppBar />
      {data.map((each) => (
        <Grid item xs={3}>
          <RecipeReviewCard cardData={each} />
        </Grid>
      ))}
    </Grid>
  );
}
