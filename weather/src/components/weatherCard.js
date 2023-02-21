/* Based on https://github.com/TDAWebDevBootcamp/Week-10-Weather-APP-Example/tree/master/src */

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import WeatherCardSummary from './weatherCardSummary';
import './weatherCard.css' ;

export default function WeatherCard({data}) {
	
	  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] ;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ;

		// Date
    const day = new Date(parseInt(data.periods && data.periods[0].dt) * 1000); ;
    const nameDay = days[day.getDay(day)] ;
    const month = months[day.getMonth(day)] ;
    const date = day.getDate(day) ;

		// Rounded values (one d.p.)
    const minTemp = Math.round(data.stats.minValues.temp_min * 10) / 10 ;
		const maxTemp = Math.round(data.stats.maxValues.temp_max * 10) / 10 ;
		const meanTemp = Math.round(data.stats.meanValues.temp * 10) / 10 ;
    const windSpeed = Math.round(data.stats.meanValues.wind_speed * 10) / 10 ;

		// Image and description
		const imageUrl = data.periods[0].iconUrl ; // (just use the one from the first period)
		const description = data.periods[0].description ; // (just use the one from the first period)

  return (
    <Card className="mx-auto text-center mt-4 my-weather-card">
      <Card.Header as="h5">{nameDay}{"-"}{date}{"-"}{month}</Card.Header>
			<Image className="mx-auto my-weather-card-image" src={imageUrl} alt={description} />
			<Card.Body>
        <Card.Text className="my-weather-card-description">{description}</Card.Text>
        <WeatherCardSummary min={minTemp} max={maxTemp} meanTemp={meanTemp} wind={windSpeed} />
      </Card.Body>
    </Card>
  );
}