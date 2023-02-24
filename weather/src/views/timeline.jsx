import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Table from 'react-bootstrap/Table';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import "./timeline.css";

export default function Timeline({ data }) {
  const numDaysToShow = 8;

  // Get specified user (current or given id)
  let { startPeriodIndex } = useParams();
  startPeriodIndex = parseInt(startPeriodIndex);
  const endPeriodIndex = Math.min(startPeriodIndex + numDaysToShow, data.list.length);
  const firstDayData = data.list[startPeriodIndex];

  // Set background
  function setBackgroundImage(imageFilename) {
    document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL + '/assets/background/' + imageFilename})`;
  }
  useEffect((() => {
    setBackgroundImage('weatherbackground02.jpg');
    return () => {
      setBackgroundImage(''); // (remove on component dismount)
    };
  }), []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = new Date(parseInt(firstDayData.dt) * 1000);
  const nameDay = days[day.getDay(day)];
  const nameDayLong = daysLong[day.getDay(day)];
  const month = months[day.getMonth(day)];
  const date = day.getDate(day);

  function returnTimes() {

    const timeArr = [];

    for (let i = startPeriodIndex; i < endPeriodIndex; i++) {
      const time = new Date(parseInt(data.list[i].dt) * 1000);
      const hour = time.getHours();
      let temp = String(hour % 12);
      if (temp === "0") {
        temp = "12";
      }
      temp += hour >= 12 ? " P.M." : " A.M.";
      timeArr.push(temp);
    }

    // TOCHECK: Is it correct to do this? Isn't the first period for the NEXT 3 hour block rather than the current one?
    const length = timeArr.length - 1;
    timeArr.unshift(timeArr[length]);
    timeArr.pop()

    return timeArr;
  }

  function formattedData(transformFunc) {
    const tempArr = [];
    for (let i = startPeriodIndex; i < endPeriodIndex; i++) {
      const transformed = transformFunc(data.list[i]);
      tempArr.push(transformed);
    }
    return tempArr;
  }
  const returnTemps = () => formattedData(listEntry => listEntry.main.temp + "°C");
  const returnHumidity = () => formattedData(listEntry => listEntry.main.humidity + "%");
  // const returnClouds = () => formattedData(listEntry => listEntry.weather[0].main) ;
  const returnCloudsDescription = () => formattedData(listEntry => listEntry.weather[0].description);
  const returnWinds = () => formattedData(listEntry => listEntry.wind.speed + "m/s");

  /*
    function returnCodes() {
      const tempArr = [];
      for (let i = startPeriodIndex; i < endPeriodIndex; i++) {
        const code = data.list[i].weather[0].icon
        const codeWithUrl = "http://openweathermap.org/img/wn/" + code + "@2x.png"
        const images = <img src={codeWithUrl} alt="" className="cloudImg" />
        tempArr.push(images)
      }
      return tempArr
    }
    */

  function returnSvgs() {
    const tempArr = [];
    for (let i = startPeriodIndex; i < endPeriodIndex; i++) {
      const code = data.list[i].weather[0].icon
      const codeWithUrl = "/assets/icons/animated/" + code + ".svg";
      const images = <img src={codeWithUrl} alt="" className="cloudImg" />
      tempArr.push(images)
    }
    return tempArr
  }

  const times = returnTimes()
  const temps = returnTemps()
  const humids = returnHumidity()
  // const clouds = returnClouds()
  const desc = returnCloudsDescription()
  // const code = returnCodes()
  const svgs = returnSvgs()
  const winds = returnWinds()

  const buildTableHead = (arr) => {
    return arr.map((current, i) => (
      <th key={i}>{current}</th>
    )
    )
  }

  const buildTableCell = (arr) => {
    return arr.map((current, i) => (
      <td key={i}>{current}</td>
    )
    )
  }

  const chartDataTemp = times.slice(0, 8).map((time, i) => ({
    time: time,
    chartKey: parseFloat(temps[i]),
    yAxis: calculateDegreesC(parseFloat(temps[i]))
  }));

  function calculateDegreesC(temp) {
    const maxTemp = 10; // maximum temperature for the y-axis
    let degreeIncrement = 4; // degree increment for y-axis
    const maxDegrees = getMaxDegrees(temp); // maximum degree value for y-axis
    const degreesC = [];

    // calculate the degreesC values based on the temp value
    for (let i = 0; i <= maxTemp; i += degreeIncrement) {
      const degrees = ((i / maxTemp) * maxDegrees).toFixed(2);
      degreesC.push(degrees);

      // adjust degree increment based on temperature value
      const tempFactor = temp / maxTemp;
      degreeIncrement -= degreeIncrement * tempFactor * 0.1; // reduce degree increment by 10% for every 1 unit increase in temperature (crashes if you try to modify this lol)
    }

    if (temp > maxTemp) {
      // calculate the additional degreesC values beyond the maximum temperature
      const remainingTemp = temp - maxTemp;
      const remainingDegrees = ((remainingTemp / maxTemp) * maxDegrees).toFixed(2);
      const additionalIncrements = Math.ceil(remainingTemp / degreeIncrement);
      for (let i = 1; i <= additionalIncrements; i++) {
        const degrees = (parseFloat(degreesC[degreesC.length - 1]) + parseFloat(remainingDegrees) / additionalIncrements).toFixed(2);
        degreesC.push(degrees);
      }
    }

    function getMaxDegrees(temp) {
      let maxDegrees = 30; // maximum degree value for y-axis

      if (temp > 12 && temp <= 20) {
        maxDegrees = 30;
      } else if (temp > 20 && temp <= 30) {
        maxDegrees = 40;
      } else if (temp > 30 && temp <= 40) {
        maxDegrees = 50;
      } else if (temp > 40) {
        maxDegrees = 60;
      }

      return maxDegrees;
    }


    return degreesC;
  }



  const chartDataHumid = times.slice(0, 8).map((time, i) => ({
    time: time,
    chartKey: parseFloat(humids[i]),
    yAxis: [0, 20, 40, 60, 80, 100]
  }));

  const chartDataWind = times.slice(0, 8).map((time, i) => ({
    time: time,
    chartKey: parseFloat(winds[i]),
    yAxis: [0, 5, 10, 15, 20, 25, 30, 35, 40]
  }));

  const [selectedOption, setSelectedOption] = useState("temp");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let chartData;
  if (selectedOption === "temp") {
    chartData = chartDataTemp;

  } else if (selectedOption === "humidity") {
    chartData = chartDataHumid;

  } else if (selectedOption === "windspeed") {
    chartData = chartDataWind;
  }

  return (
    <>
      <div className="d-flex p-2">
        <div className="App">
          <div className="container">
            <div className="top">
              <div className="location">
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
              <div className="currentInfo">
                    <h1 className="heading">
                      {(startPeriodIndex === 0) ? "Current weather" : "Weather for " + nameDayLong}
                    </h1>
                  </div>
                <div className="bottomBox">
                  <div className="sideText">
                  
                  <hr></hr>
                  <div className="bottom">
                    <div className="feelsLike">
                      <p>feels like</p>
                      <h4>{firstDayData.main.feels_like}°C</h4>
                    </div>
                    <div className="humidity">
                      <p>humidity</p>
                      <h4>{firstDayData.main.humidity}%</h4>
                    </div>
                    <div className="wind">
                      <p>wind speed</p>
                      <h4>{firstDayData.wind.speed} m/s</h4>
                    </div>
                    </div>
                    <div className="chart">
                      <div className="fillHow">
                        <input
                          type="radio"
                          name="fillChart"
                          value="temp"
                          checked={selectedOption === "temp"}
                          onChange={handleOptionChange}
                        /><h3 className="radioLabel">Temperature</h3>
                        <input
                          type="radio"
                          name="fillChart"
                          value="humidity"
                          checked={selectedOption === "humidity"}
                          onChange={handleOptionChange}
                        /> <h3 className="radioLabel">Humidity</h3>
                        <input
                          type="radio"
                          name="fillChart"
                          value="windspeed"
                          checked={selectedOption === "windspeed"}
                          onChange={handleOptionChange}
                        /> <h3 className="radioLabel">Wind Speed</h3>
                      </div>

                      <ResponsiveContainer width={730} height={350}>
                        <LineChart data={chartData}
                          margin={{ top: 15, right: 70, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" color={{ stroke: "white" }} />
                          <YAxis dataKey="yAxis" />
                          <Tooltip fill="#030101" />
                          <Legend dataKey="value" />
                          <Line type="monotone" dataKey="chartKey" stroke="#f2f2f2f2" />

                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}