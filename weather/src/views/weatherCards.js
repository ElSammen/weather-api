import WeatherCard from '../components/weatherCard';
import './weatherCards.css' ;

export default function WeatherCards({data, playSound}) {
  return (
    <div className="my-weather-cards justify-content-center">
			{data.map(dayData => 
				<WeatherCard data={dayData} key={dayData.periods[0].dt} playSound={playSound} />
			)}
		</div>
  );
}