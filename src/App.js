import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import MainTable from "./MainTable";
import { sortData } from "./utils";
import Graph from "./Graph";

function App() {
  const [countries, setCountries] = useState(["India", "America", "China"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const getCountryData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        const _countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        const list = sortData(data);
        setTableData(list);
        setCountries(_countries);
      });

    await fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  useEffect(() => {
    getCountryData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  return (
    <div className="app">
      <div className="appLeft">
        <div className="appHeader">
          <h1>Covid 19 Tracker</h1>
          <FormControl>
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries?.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="infoBoxContainer">
          <InfoBox
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>
        <Map />
      </div>
      <div className="appRight">
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            <MainTable countries={tableData} />
            <h3>Worldwide new cases</h3>
            <Graph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
