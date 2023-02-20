import './App.css';
import WeatherCard from './components/weatherCard' ;
import 'bootstrap/dist/css/bootstrap.min.css'; // ("npm install" to add bootstrap)

export default function App() {
	// Test data
	const data = {
		dateString: Math.floor((new Date()).getTime() / 1000),
		min: -5,
		max: 5,
		wind: 50,
		img: 'https://images.unsplash.com/photo-1676809728898-0ceaa55a4813?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
		alt: 'Cold weather!',
		text: 'This looks like cold weather!'
	}

  return (
    <div className="App">
			<WeatherCard data={data} />
    </div>
  );
}