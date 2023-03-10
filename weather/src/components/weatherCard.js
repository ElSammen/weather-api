/* Based on https://github.com/TDAWebDevBootcamp/Week-10-Weather-APP-Example/tree/master/src */

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import WeatherCardSummary from './weatherCardSummary';
import './weatherCard.css' ;
import { roundObjValues } from '../utils/maths' ;

export default function WeatherCard({data, playSound, onClick}) {

	  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] ;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ;

		// Date
    const day = new Date((data.periods[0].dt) * 1000) ;
    const nameDay = days[day.getDay(day)] ;
    const month = months[day.getMonth(day)] ;
    const date = day.getDate(day) ;

		// Round values (one d.p. or nearest int)
		roundObjValues(data.stats.minValues, ['temp_min', 'feels_like', 'humidity'], 1) ;
		roundObjValues(data.stats.maxValues, ['temp_max', 'feels_like', 'humidity', 'wind_gust'], 1) ;
		roundObjValues(data.stats.meanValues, ['temp', 'wind_speed'], 1) ;
		roundObjValues(data.stats.circularMeanValues, ['wind_degs'], 0) ;

		// Image and description
		const imageUrl = data.stats.modeValues.icon_url ;
		const description = data.stats.modeValues.description ;

  return (
    <Card
			onMouseEnter={() => playSound(data.stats.modeValues.description)} 
			onMouseLeave={() => playSound(null)} className="text-center my-weather-card"
			onClick={onClick}>
      <Card.Header as="h5">{nameDay}{"-"}{date}{"-"}{month}</Card.Header>
			<Image className="mx-auto my-weather-card-image"
				src={imageUrl}
				alt={description}
			/>
			<Card.Body>
        <Card.Text className="my-weather-card-description">{description}</Card.Text>
        <WeatherCardSummary data={data.stats} />
      </Card.Body>
    </Card>
  );
}