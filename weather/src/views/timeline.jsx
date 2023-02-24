import { useEffect } from 'react';
import { useParams } from 'react-router';
import Table from 'react-bootstrap/Table';

export default function Timeline({data}) {
	const numDaysToShow = 8 ;

	// Get specified user (current or given id)
	let { startPeriodIndex } = useParams();
	startPeriodIndex = parseInt(startPeriodIndex) ;
	const endPeriodIndex = Math.min(startPeriodIndex + numDaysToShow, data.list.length) ;
	const firstDayData = data.list[startPeriodIndex] ;

	// Set background
	function setBackgroundImage(imageFilename) {
		document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL + '/assets/background/' + imageFilename})` ;
	}
	useEffect((() => {
		setBackgroundImage('weatherbackground02.jpg') ;
		return () => {
			setBackgroundImage('') ; // (remove on component dismount)
		} ;
	}), []) ;
	
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

    return timeArr ;
  }

	function formattedData(transformFunc) {
		const tempArr = [];
    for (let i = startPeriodIndex; i < endPeriodIndex; i++) {
			const transformed = transformFunc(data.list[i]) ;
      tempArr.push(transformed) ;
    }
    return tempArr ;
	}
  const returnTemps = () => formattedData(listEntry => listEntry.main.temp + "°C") ;
	const returnHumidity = () => formattedData(listEntry => listEntry.main.humidity + "%") ;
	// const returnClouds = () => formattedData(listEntry => listEntry.weather[0].main) ;
	const returnCloudsDescription = () => formattedData(listEntry => listEntry.weather[0].description) ;

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
										<h3>
										{(startPeriodIndex === 0) ? "Current weather" : "Weather for " + nameDayLong}
										</h3>
									</div>
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
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}