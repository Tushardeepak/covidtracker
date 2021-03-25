import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoTitle">{title}</Typography>
        <h2 className="infoCases">{cases}</h2>
        <Typography className="infoTotal ">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
