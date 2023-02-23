import './App.css';
import WeatherCards from './components/weatherCards' ;
import 'bootstrap/dist/css/bootstrap.min.css'; // ("npm install" to add bootstrap)
import testData from './testdata' ;
import WeatherStats from './utils/weatherStats' ;
import { Container } from 'react-bootstrap';
import SoundManager from './utils/soundManager';
import { useState } from 'react';
import soundList from './data/soundList.json' ;

export default function App() {
	const [id, changeId] = useState('') ;
	const weatherStats = new WeatherStats(testData) ;
	const dailyData = weatherStats.getDailyData() ;

	function playSound(val) {
		changeId(val) ;
	}

  return (
    <div className="App">
			<header>
				<div className="header">
					<h1>Weather App</h1>
				</div>
			</header>
			<Container fluid="xxl">
				<WeatherCards data={dailyData} playSound={playSound} />
			</Container>

			<SoundManager soundList={soundList} id={id} />
    </div>
  );
}