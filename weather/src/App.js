import './App.css';
import WeatherCard from './components/weatherCard' ;
import 'bootstrap/dist/css/bootstrap.min.css'; // ("npm install" to add bootstrap)
import testData from './testdata' ;
import WeatherStats from './utils/weatherStats' ;

export default function App() {
	const weatherStats = new WeatherStats(testData) ;
	const dailyData = weatherStats.getDailyData() ;

  return (
    <div className="App">
			<WeatherCard data={dailyData[0]} />
    </div>
  );
}