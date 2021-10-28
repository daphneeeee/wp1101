import React from "react";
import { Card } from "@material-ui/core";
import "./App.css";

export default function Screen({ currentNum }) {
  return <Card className="screen-area">{currentNum}</Card>;
}
