import WeatherCard from './weatherCard';
import './weatherCards.css' ;

export default function WeatherCards({data}) {
	console.log(data) ;

  return (
    <div className="my-weather-cards justify-content-center">
			{data.map(dayData => 
				<WeatherCard data={dayData} key={dayData.periods[0].dt}/>
			)}
		</div>
  );
}