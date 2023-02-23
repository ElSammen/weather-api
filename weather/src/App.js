import './App.css';
import WeatherCards from './views/weatherCards' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherStats from './utils/weatherStats' ;
import { Container } from 'react-bootstrap';
import SoundManager from './utils/soundManager';
import { useEffect, useState } from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import soundList from './data/soundList.json' ;
import Timeline from './views/timeline.jsx';
import { ApiClient } from './apiClient';
import MyNavbar from './components/navbar';
import LocationInput from './components/locationInput';

export default function App() {
	const [data, changeData] = useState(null) ; // Raw weather data
	const [dailyData, changeDailyData] = useState(null) ; // Processed data
	const [id, changeId] = useState('') ; // Current sound effect

	// Initialisation
	useEffect(() => {
		getDataForLocation('Sheffield') ; // TODO: Remove this default (and get from current location instead?)
	}, []) ;

	function getDataForLocation(location) {
		new ApiClient(location).getWeather().then(({data}) => {
			const weatherStats = new WeatherStats(data) ;
			changeData(data) ;
			changeDailyData(weatherStats.getDailyData()) ;
		}).catch(err => console.error(err)) ;
	}

	function playSound(val) {
		changeId(val) ;
	}

	return (
    <div className="App">
			<header>
				<div className="header">
					<h1>Weather App</h1>
				</div>
				<MyNavbar />
			</header>
			<Container fluid="xxl">
				<main>

					<div className='d-flex justify-content-center'>
						<LocationInput setLocation={getDataForLocation} />
					</div>

					<Routes>				
						{dailyData && 
							<>
								<Route path="/days" element={
									<WeatherCards data={dailyData} playSound={playSound} />
								} />
								<Route path="/timeline" element={
									<Timeline data={data} />
								} />

								<Route path="*" element={<Navigate to="/days" replace />} />
							</>
						}
						
					</Routes>

				</main>
			</Container>

			<SoundManager soundList={soundList} id={id} />
    </div>
  );
}