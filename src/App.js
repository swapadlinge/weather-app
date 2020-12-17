// import {useEffect,useState} from 'react';

// const api = {
//   key: "08eaf2db3d78e6178e96f20ff6628dd2",
//   base: "http://api.openweathermap.org/data/2.5/",
//   full:"api.openweathermap.org/data/2.5/weather?q=pune&appid=08eaf2db3d78e6178e96f20ff6628dd2"
// }

// function App() {

//   const [appState , setAppState] = useState({
//     loading:false,
//     data:null,
//   });

//   useEffect(() => {
//      setAppState({ loading: true });
//     // const user = `https://reqres.in/api/users/2`;
//     console.log(api.full);
//     fetch("api.openweathermap.org/data/2.5/weather?q=pune&appid=08eaf2db3d78e6178e96f20ff6628dd2")
//       .then((res) => res.json())
//       .then((data) => {
//         setAppState({
//           loading:false,
//           data : data
//         });
//         console.log(appState);

//       });
//   }, [setAppState]);

//   return (
//     <div className="app">

//     </div>
//   );
// }

// export default App;

import React, { Component } from "react";
import "./app.css";

// const api = {
//   key: "08eaf2db3d78e6178e96f20ff6628dd2",
//   base: "http://api.openweathermap.org/data/2.5/weather?q=",
//   full:
//     "api.openweathermap.org/data/2.5/weather?q=pune&appid=08eaf2db3d78e6178e96f20ff6628dd2",
// };

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "swapnil",
      city: "",
      rew: [],
      main: [],
      sys: [],
      waether: [],
      temp: 0,
    };
    this.handleCityChange = this.handleCityChange.bind(this);
    // this.handleClick = this.handleCityChange.bind(this);
  }

  kelvinToCelcius(kel = 273.15) {
    kel = kel - 273.15;
    kel = Math.round(kel * 100) / 100;
    return kel;
  }

  fetchData(city = "solapur") {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=` +
        city +
        `&appid=08eaf2db3d78e6178e96f20ff6628dd2`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ rew: data });
        this.setState({
          city: data.name,
          input_city: "",
          temp: data.main.temp,
          main: data.main,
          sys: data.sys,
          waether: data.weather[0],
        });
        console.log(this.state.rew);
      })
      .catch(() => {
        alert("Please Enter Valid City Name.")
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleCityChange(e) {
    this.setState({
      input_city: e.target.value,
    });
  }

   handleClick=(e)=> {
   this.fetchData(this.state.input_city);
   
  }

  render() {
    return (
      <div className="app">
        <div className="search_bar">
          <input
            type="text"
            value={this.state.input_city}
            name="search"
            id="search"
             onChange={this.handleCityChange}
          />
          <input type="button" value="Submit" onClick={this.handleClick} />
        </div>
        <h1>
          {this.state.city}, {this.state.sys.country}
        </h1>
        <div className="wi wi-day-sunny display-1"></div>
        <h1> {this.kelvinToCelcius(this.state.main.feels_like)} &deg;</h1>
        <div className="min-max mt-4 d-flex">
          <span>
            <h2>{this.kelvinToCelcius(this.state.main.temp_min)}&deg;</h2>
          </span>
          <span className="ml-5">
            <h2>{this.kelvinToCelcius(this.state.main.temp_max)}&deg;</h2>
          </span>
        </div>
        <div>
          <h2>{this.state.waether.description}</h2>
        </div>
      </div>
    );
  }
}
