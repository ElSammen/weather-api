import axios from 'axios'

export class ApiClient {

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  getWeather() {
    return this.getRequest("https://api.openweathermap.org/data/2.5/onecall?lat=//LAT HERE&lon//LON HERE9&exclude=hourly,minutely&units=metric&appid=92df7fba14ff930ab5c7e513de45c046")
  }

  getRequest(url) {
    return axios.get(url)
      .then(this.status)
      .catch(function (error) {
        // handle error
        console.error(error);
        alert(error)
      })
  }

}