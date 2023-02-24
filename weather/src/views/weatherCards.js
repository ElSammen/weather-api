import WeatherCard from '../components/weatherCard';
import './weatherCards.css' ;

export default function WeatherCards({data, playSound, clickHandler, location}) {
  return (
		<>
			<div className='d-flex justify-content-center text-black mb-2'>
				<h2>{location}</h2>
			</div>
			<div className='d-flex justify-content-center text-primary mb-2'>
				(click on a card for a detailed timeline)
			</div>
			<div className="my-weather-cards justify-content-center">
			
				{data.map((dayData, i) => 
					<WeatherCard data={dayData} key={dayData.periods[0].dt} playSound={playSound} onClick={() => clickHandler(i)} />
				)}
			</div>
		</>
  );
}