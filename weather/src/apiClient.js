import axios from 'axios' ;

export class ApiClient {
	constructor(location) {
		this.getWeatherUrl = null ;
		if (location) this.setWeatherLocation(location) ;
	}

	setWeatherLocation(location) {
		this.getWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=06af2c84a95e6a736fd7bab4b3be279d` ;
	}

  getWeather() {
    return this.request(this.getWeatherUrl) ;
  }

  request(url) {
		console.log(url) ;
    return axios.get(url) ;
  }
}