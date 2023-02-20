/* Based on https://github.com/TDAWebDevBootcamp/Week-10-Weather-APP-Example/tree/master/src */

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import WeatherCardSummary from './weatherCardSummary';
import './weatherCard.css' ;

export default function WeatherCard({data}) {
	  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] ;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ;

		// Date
    const day = new Date(parseInt(data.dateString) * 1000); ;
    const nameDay = days[day.getDay(day)] ;
    const month = months[day.getMonth(day)] ;
    const date = day.getDate(day) ;

		// Rounded values
    const minTemp = Math.round(data.min, 1) ;
		const maxTemp = Math.round(data.max, 1) ;
    const windSpeed = Math.round(data.wind, 1) ;

  return (
    <Card className="mx-auto text-center mt-4 my-weather-card">
      <Card.Header as="h5">{nameDay}{"-"}{date}{"-"}{month}</Card.Header>
			<Image className="mx-auto my-weather-card-image" src={data.img} alt={data.alt} />
			<Card.Body>
        <Card.Text className="my-weather-card-description">{data.text}</Card.Text>
        <WeatherCardSummary max={maxTemp} min={minTemp} wind={windSpeed} />
      </Card.Body>
    </Card>
  );
}