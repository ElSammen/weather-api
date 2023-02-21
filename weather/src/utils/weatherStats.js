export default class WeatherStats {
	constructor(data) {
		this.data = this._flattenData(data.list) ;
		this.entryTimePeriod = this.data[1].dt - this.data[0].dt ;
	}

	_flattenData(data) {
		const newData = [] ;
		for (const periodEntry of data) {
			newData.push(
				{
					dt: periodEntry.dt,
					temp: periodEntry.main.temp,
					temp_min: periodEntry.main.temp_min,
					temp_max: periodEntry.main.temp_max,
					feels_like: periodEntry.main.feels_like,
					humidity: periodEntry.main.humidity,
					wind_speed: periodEntry.wind.speed,
					description: periodEntry.weather[0].description, // (only get first one here)
					iconUrl: "http://openweathermap.org/img/w/" + periodEntry.weather[0].icon + ".png" // (only get first one here)
				}
			) ;
		}
		return newData ;
	}

	getDataForPeriod(tsStart, tsEnd) {
		const {startPeriodIndex, endPeriodIndex} = this._findNearestStartAndEndPeriodByTime(tsStart, tsEnd) ;
		return this._calcStats(startPeriodIndex, endPeriodIndex) ;
	}

	// TODO: Test this function properly
	_findNearestStartAndEndPeriodByTime(tsStart, tsEnd) {
		const list = this.data ;
		let startPeriodIndex = null, endPeriodIndex = null ;

		// Return nulls if period is completely outside the range of the available data
		if (tsEnd <= list[0].dt || tsStart >= list[list.length - 1].dt + this.entryTimePeriod) return {startPeriodIndex, endPeriodIndex} ;

		// Find nearest start period
		let i = 0 ;
		while (list[i].dt < tsStart) i++ ;
		if (i === 0) startPeriodIndex = 0 ;
		else {
			const difToPrev = Math.abs(list[i-1].dt - tsStart) ;
			const difToCurrent = Math.abs(list[i].dt - tsStart) ;
			startPeriodIndex = (difToPrev < difToCurrent) ? (i - 1) : i ;
		}

		// Find nearest end period
		while (list[i].dt + this.entryTimePeriod < tsEnd) i++ ;
		if (i === list.length) endPeriodIndex = list.length - 1 ;
		else {
			const difToPrev = Math.abs(list[i-1].dt + this.entryTimePeriod - tsEnd) ;
			const difToCurrent = Math.abs(list[i].dt + this.entryTimePeriod - tsEnd) ;
			endPeriodIndex = (difToPrev < difToCurrent) ? (i - 1) : i ;
		}
		
		return {startPeriodIndex, endPeriodIndex} ;
	}
	
	_calcStats(startPeriodIndex, endPeriodIndex) {
		const periods = this.data.slice(startPeriodIndex, endPeriodIndex + 1) ;

		const calcMinList = ['temp_min', 'humidity', 'feels_like', 'humidity', 'wind_speed'] ;
		const calcMaxList = ['temp_max', 'humidity', 'feels_like', 'humidity', 'wind_speed'] ;
		const calcAvgList = ['temp', 'humidity', 'feels_like', 'humidity', 'wind_speed'] ;

		const minValues = {} ;
		calcMinList.forEach(fieldName => {
			minValues[fieldName] = +Infinity ;
		}) ;
		const maxValues = {} ;
		calcMaxList.forEach(fieldName => {
			maxValues[fieldName] = -Infinity ;
		}) ;
		const meanValues = {} ;
		calcAvgList.forEach(fieldName => {
			meanValues[fieldName] = 0 ;
		}) ;

		for (const period of periods) {
			for (const fieldName of calcMinList) {
				minValues[fieldName] = Math.min(minValues[fieldName], period[fieldName]) ;
			}
			for (const fieldName of calcMaxList) {
				maxValues[fieldName] = Math.max(maxValues[fieldName], period[fieldName]) ;
			}
			for (const fieldName of calcAvgList) {
				meanValues[fieldName] = meanValues[fieldName] + period[fieldName] ;
			}
		}

		// Convert totals to means
		for (const fieldName of calcAvgList) {
			meanValues[fieldName] = meanValues[fieldName] / periods.length ;
		}
		
		return { periods, stats: {minValues, maxValues, meanValues} } ;
	}

	getDailyData() {
		let oldDayOfMonth = new Date(parseInt(this.data[0].dt) * 1000).getDate() ;
		let startPeriodIndex = 0 ;
		const dailyStats = [] ;

		for (const [i, period] of this.data.entries()) {
			const date = new Date(parseInt(period.dt) * 1000) ;
    	const dayOfMonth = date.getDate() ; // (one-indexed!)
			if (dayOfMonth !== oldDayOfMonth || i === this.data.length - 1) {
				dailyStats.push(this._calcStats(startPeriodIndex, (i === this.data.length - 1) ? i  : i - 1)) ;

				oldDayOfMonth = dayOfMonth ;
				startPeriodIndex = i ;
			}
		}

		return dailyStats ;
	}
}