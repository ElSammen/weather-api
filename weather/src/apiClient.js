import axios from 'axios' ;

export class ApiClient {
	constructor(location) {
		this.getWeatherUrl = null ;
		if (location) this.setWeatherLocation(location) ;
	}

	setWeatherLocation(location) {
		// Note: Normally for security reasons this API key would be stored on a back-end server instead
		this.getWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=10e8022ff8312f29d5038f5214aaf866` ;
	}

  getWeather() {
    return this.request(this.getWeatherUrl) ;
  }

  request(url) {
    return axios.get(url) ;
  }
}