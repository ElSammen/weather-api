import './App.css';
import React, { useState, useEffect } from "react";
import { ApiClient } from './apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'

function App() {

  const client = new ApiClient();
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=06af2c84a95e6a736fd7bab4b3be279d`

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // const timeInput = new Date(parseInt(data.list && data.list[0].dt) * 1000);

  const day = new Date(parseInt(data.list && data.list[0].dt) * 1000);
  const nameDay = days[day.getDay(day)];
  const month = months[day.getMonth(day)];
  const date = day.getDate(day);

  function returnTimes() {

    const timeArr = [];

    for (let i = 0; i < 8; i++) {
      const time = new Date(parseInt(data.list && data.list[i].dt) * 1000);
      const hour = time.getHours();
      let temp = String(hour % 12);
      if (temp === "0") {
        temp = "12";
      }
      temp += hour >= 12 ? " P.M." : " A.M.";
      timeArr.push(temp);
    }
    const length = timeArr.length - 1;
    timeArr.unshift(timeArr[length]);
    timeArr.pop()

    console.log(timeArr);
    return timeArr
  }

  function returnTemps() {
    const tempArr = [];
    for (let i = 0; i < 8; i++) {
      const temp = data.list && data.list[i].main.temp
      tempArr.push(temp + "°C");
    }
    return tempArr
  }

  function returnHumidity() {
    const tempArr = [];
    for (let i = 0; i < 8; i++) {
      const humid = data.list && data.list[i].main.humidity
      tempArr.push(humid + "%");
    }
    return tempArr
  }

  function returnClouds() {
    const tempArr = [];
    for (let i = 0; i < 8; i++) {
      const clouds = data.list && data.list[i].weather[0].main
      tempArr.push(clouds)
    }
    return tempArr
  }

  function returnCloudsDescription() {
    const tempArr = [];
    for (let i = 0; i < 8; i++) {
      const desc = data.list && data.list[i].weather[0].description
      tempArr.push(desc)
    }
    return tempArr
  }

  function returnCodes() {
    const tempArr = [];
    for (let i = 0; i < 8; i++) {
      const code = data.list && data.list[i].weather[0].icon
      const codeWithUrl = "http://openweathermap.org/img/wn/" + code + "@2x.png"
      const images = <img src={codeWithUrl} alt="" className="cloudImg" />
      tempArr.push(images)
    }
    return tempArr
  }

  function returnSvgs() {
    const tempArr = [];
    for (let i = 0; i < 8; i++) {
      const code = data.list && data.list[i].weather[0].icon
      const codeWithUrl = "/assets/icons/animated/" + code + ".svg";
      const images = <img src={codeWithUrl} alt="" className="cloudImg" />
      tempArr.push(images)
    }
    return tempArr
  }

  const times = returnTimes()
  const temps = returnTemps()
  const humids = returnHumidity()
  const clouds = returnClouds()
  const desc = returnCloudsDescription()
  const code = returnCodes()
  const svgs = returnSvgs()

  const buildTableHead = (arr) => {
    return arr.map((current) => (
      <th>{current}</th>
    )
    )
  }

  const buildTableCell = (arr) => {
    return arr.map((current) => (
      <td>{current}</td>
    )
    )
  }

  // function JSClock(timeInput) {
  //   const time = timeInput
  //   const hour = time.getHours();
  //   const minute = time.getMinutes();
  //   const second = time.getSeconds();
  //   let temp = String(hour % 12);
  //   if (temp === "0") {
  //     temp = "12";
  //   }
  //   temp += hour >= 12 ? " P.M." : " A.M.";
  //   return temp;
  // }

  // const timeOutput = JSClock(timeInput);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setLocation('');
    }
  }

  useEffect(() => {
    client.getWeather();
  }, [])

  return (
    <>
      <div className="d-flex p-2">
        <div className="App">
          <div className="search">
            <input value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyDown={searchLocation}
              placeholder='Enter Location'
              type="text" />
          </div>
          {data.list != undefined &&
            <div className="container">
              <div className="top">
                <div className="location">
                  {/* remove checks!! */}
                  <p>{data.city.name}</p>
                  <div className="temp">
                  </div>
                </div>
                <div className="time">
                  <h4>{nameDay} {date} {month}</h4>
                  <Table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        {buildTableHead(times)}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Temp</td>
                        {buildTableCell(temps)}
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>Humidity</td>
                        {buildTableCell(humids)}
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>sky</td>
                        {/* {buildTableCell(code)} */}
                        {buildTableCell(svgs)}
                        {/* {buildTableCell(clouds)} */}
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>type</td>
                        {buildTableCell(desc)}
                      </tr>
                    </tbody>
                  </Table>
                  {/* <h4>{temps}</h4> */}
                  {/* <h4> {nameDay} {date} {month} {timeOutput}</h4> */}
                </div>
                <div className="description">
                  <div className="currentInfo"><h3>current weather</h3></div>
                  <div className="bottom">
                    <div className="feelsLike">
                      <p>feels like</p>
                      {/* {data.list && <h4>{data.list[0].main.feels_like}°C</h4>} */}
                      <h4>{data.list[0].main.feels_like}°C</h4>
                    </div>
                    <div className="humidity">
                      <p>humidity</p>
                      {/* {data.list && <h4>{data.list[0].main.humidity}%</h4>} */}
                      <h4>{data.list[0].main.humidity}%</h4>
                    </div>
                    <div className="wind">
                      <p>wind speed</p>
                      {/* {data.list && <h4>{data.list[0].wind.speed} m/s</h4>} */}
                      <h4>{data.list[0].wind.speed} m/s</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default App;
