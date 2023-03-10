import './App.css';
import WeatherCards from './views/weatherCards' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherStats from './utils/weatherStats' ;
import { Container } from 'react-bootstrap';
import SoundManager from './utils/soundManager';
import { useEffect, useState } from 'react';
import { Navigate, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import soundList from './data/soundList.json' ;
import Timeline from './views/timeline.jsx';
import { ApiClient } from './apiClient';
import MyNavbar from './components/navbar';
import SoundToggleInput from './components/toggleInput';
import LocationInput from './components/textInput';
import MyFooter from './components/footer';

export default function App() {
	const navigate = useNavigate();

	const [data, changeData] = useState(null) ; // Raw weather data
	const [dailyData, changeDailyData] = useState(null) ; // Processed data
	const [soundId, changeSoundId] = useState('') ; // Current sound effect
	const [soundEnabled, changeSoundEnabled] = useState(false) ; // Current sound effect

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
		changeSoundId(val) ;
	}

	function dayCardClickHandler(dayIndex) {
		const startPeriodIndex = dailyData[dayIndex].startPeriodIndex ;
		navigate("/timeline/" + startPeriodIndex) ;
	}

	return (
    <div className="App">
			<header>
				<div className="header">
					<h1>Weather App</h1>
				</div>
				<MyNavbar />
			</header>
			<Container fluid>
				<main>

					<div className='d-flex justify-content-center'>
						<SoundToggleInput setValueExternal={changeSoundEnabled} />
					</div>

					<div className='d-flex justify-content-center'>
						<LocationInput setValueExternal={getDataForLocation} />
					</div>

					<Routes>				
						{dailyData && 
							<>
								<Route path="/days" element={
									<WeatherCards data={dailyData} location={data.city.name} playSound={playSound} clickHandler={dayCardClickHandler} />
								} />
								<Route path="/timeline/:startPeriodIndex" element={
									<Timeline data={data} />
								} />

								<Route path="*" element={<Navigate to="/days" replace />} />
							</>
						}
						
					</Routes>

				</main>
			</Container>

			<SoundManager soundList={soundList} soundId={soundId} soundEnabled={soundEnabled} />
    
			<footer className="footer text-end p-2 text-secondary">
				<MyFooter />
			</footer>
		</div>
  );
}