import React from "react";
import { Button } from "@material-ui/core";

export default function Buttons({ value, onclick }) {
  return (
    <Button
      variant="outlined"
      style={{ fontSize: "26px", height: "55px" }}
      onClick={onclick}
    >
      {value}
    </Button>
  );
}
