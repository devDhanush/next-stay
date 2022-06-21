import "./App.css";
import Card from "./components/Card";
import AppBar from "./components/AppBar";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  axios.post("https://next-home-api.herokuapp.com/fetchTable").then((data) => {
    console.log("Response", data.data);
    setData(data?.data?.data);
  });
  return (
    <Grid container display="flex">
      <AppBar />
      {data.map((each) => (
        <Grid item xs={3}>
          <Card cardData={each} />
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
