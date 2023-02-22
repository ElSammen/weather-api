import './App.css';
import WeatherCards from './components/weatherCards' ;
import 'bootstrap/dist/css/bootstrap.min.css'; // ("npm install" to add bootstrap)
import testData from './testdata' ;
import WeatherStats from './utils/weatherStats' ;
import { Container } from 'react-bootstrap';

export default function App() {
	const weatherStats = new WeatherStats(testData) ;
	const dailyData = weatherStats.getDailyData() ;
	console.log(dailyData) ;

  return (
    <div className="App">
			<header>
				<div className="header">
					<h1>Weather App</h1>
				</div>
			</header>
			<Container fluid="xxl">
				<WeatherCards data={dailyData}/>
			</Container>
    </div>
  );
}