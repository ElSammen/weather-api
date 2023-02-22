/* Based on https://github.com/TDAWebDevBootcamp/Week-10-Weather-APP-Example/tree/master/src */

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import WeatherCardSummary from './weatherCardSummary';
import './weatherCard.css' ;
import { roundObjValues } from '../utils/maths' ;

export default function WeatherCard({data}) {

	  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] ;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ;

		// Date
    const day = new Date((data.periods[0].dt) * 1000); ;
    const nameDay = days[day.getDay(day)] ;
    const month = months[day.getMonth(day)] ;
    const date = day.getDate(day) ;

		// Round values (one d.p.)
		roundObjValues(data.stats.minValues, ['temp_min', 'feels_like', 'humidity'], 1) ;
		roundObjValues(data.stats.maxValues, ['temp_max', 'feels_like', 'humidity', 'wind_gust'], 1) ;
		roundObjValues(data.stats.meanValues, ['temp', 'wind_speed'], 1) ;
		roundObjValues(data.stats.circularMeanValues, ['wind_degs'], 0) ;

		// Image and description
		const imageUrl = data.periods[0].icon_url ; // (just use the one from the first period)
		const description = data.periods[0].description ; // (just use the one from the first period)

  return (
    <Card className="mx-auto text-center mt-4 my-weather-card">
      <Card.Header as="h5">{nameDay}{"-"}{date}{"-"}{month}</Card.Header>
			<Image className="mx-auto my-weather-card-image" src={imageUrl} alt={description} />
			<Card.Body>
        <Card.Text className="my-weather-card-description">{description}</Card.Text>
        <WeatherCardSummary data={data.stats} />
      </Card.Body>
    </Card>
  );
}