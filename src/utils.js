import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { createMuiTheme } from "@material-ui/core/styles";

const mainColor = "rgb(4, 161, 109)";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    mulitiplier: 800,
  },

  recovered: {
    hex: "#7DD71D",
    mulitiplier: 1200,
  },

  deaths: {
    hex: "#C0C0C0",
    mulitiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => b.cases - a.cases);

  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on the map
export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType] / 10) *
        casesTypeColors[casesType].mulitiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export default createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        color: mainColor,
      },
    },
    MuiSelect: {
      outlined: {
        border: `2px solid ${mainColor}`,
        outline: "none",
      },
      icon: {
        color: mainColor,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "rgb(39, 39, 39)",
        color: mainColor,
      },
    },
  },
});
