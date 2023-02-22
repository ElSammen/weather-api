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
					wind_gust: periodEntry.wind.gust,
					wind_degs: periodEntry.wind.deg,
					visibility: periodEntry.visibility,
					precipitation_prob: periodEntry.pop,
					description: periodEntry.weather[0].description, // (only get first one here)
					icon_url: "http://openweathermap.org/img/wn/" + periodEntry.weather[0].icon + "@2x.png" // (only get first one here)
				}
			) ;
		}
		return newData ;
	}

	// Get data and statistics for the given (approximate) time period
	getDataForPeriod(tsStart, tsEnd) {
		const {startPeriodIndex, endPeriodIndex} = this._findNearestStartAndEndPeriod(tsStart, tsEnd) ;
		return this.calcStats(startPeriodIndex, endPeriodIndex) ;
	}

	// TODO: Test this function properly
	_findNearestStartAndEndPeriod(tsStart, tsEnd) {
		const list = this.data ;
		let startPeriodIndex = null, endPeriodIndex = null ;

		// Return nulls if period is completely outside the range of the available data
		if (tsEnd <= list[0].dt || 
			tsStart >= list[list.length - 1].dt + this.entryTimePeriod) {
			return {startPeriodIndex, endPeriodIndex} ;
		}

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
	
	// Calculate statistics over the specified data periods
	calcStats(startPeriodIndex, endPeriodIndex) {
		const periods = this.data.slice(startPeriodIndex, endPeriodIndex + 1) ;

		// List of metrics to calculate
		const calcMinList = ['temp_min', 'feels_like', 'humidity', 'wind_speed', 'visibility'] ;
		const calcMaxList = ['temp_max', 'feels_like', 'humidity', 'wind_speed', 'wind_gust'] ;
		const calcModeList = ['icon_url', 'description'] ;
		const calcArithmeticMeanList = ['temp', 'feels_like', 'humidity', 'wind_speed'] ;
		const calcCircularMeanList = ['wind_degs'] ;

		// Initialise stat values
		const minValues = {} ;
		calcMinList.forEach(fieldName => {
			minValues[fieldName] = +Infinity ;
		}) ;
		const maxValues = {} ;
		calcMaxList.forEach(fieldName => {
			maxValues[fieldName] = -Infinity ;
		}) ;
		const meanValues = {} ;
		calcArithmeticMeanList.forEach(fieldName => {
			meanValues[fieldName] = 0 ; // (init with zero total)
		}) ;
		const modeValues = {} ;
		calcModeList.forEach(fieldName => {
			modeValues[fieldName] = {} ; // (init with empty object to store counts)
		}) ;
		const circularMeanValues = {} ;
		calcCircularMeanList.forEach(fieldName => {
			circularMeanValues[fieldName] = {x: 0, y: 0} ; // (init with zero vector)
		}) ;

		// Calculate min/max values, totals for modes and arithmetic means, and cartesian coordinates for circular means
		for (const period of periods) {
			for (const fieldName of calcMinList) {
				minValues[fieldName] = Math.min(minValues[fieldName], period[fieldName]) ;
			}
			for (const fieldName of calcMaxList) {
				maxValues[fieldName] = Math.max(maxValues[fieldName], period[fieldName]) ;
			}
			for (const fieldName of calcModeList) {
				if (!modeValues[fieldName]) modeValues[fieldName] = {[period[fieldName]]: 1}
				else if (!modeValues[fieldName][period[fieldName]]) modeValues[fieldName][period[fieldName]] = 1 ;
				else modeValues[fieldName][period[fieldName]]++ ;

			}
			for (const fieldName of calcArithmeticMeanList) {
				meanValues[fieldName] += period[fieldName] ;
			}
			for (const fieldName of calcCircularMeanList) {
				const angleRads = period[fieldName] * (Math.PI / 180) ;
				circularMeanValues[fieldName].x += Math.cos(angleRads) ;
				circularMeanValues[fieldName].y += Math.sin(angleRads) ;
			}
		}

		// Convert totals to means
		for (const fieldName of calcArithmeticMeanList) {
			meanValues[fieldName] /= periods.length ;
		}
		for (const fieldName of calcCircularMeanList) {
			let a2Result = Math.atan2(circularMeanValues[fieldName].y, circularMeanValues[fieldName].x) ;
			if (a2Result < 0) a2Result += Math.PI * 2 ;
			circularMeanValues[fieldName] = a2Result / Math.PI * 180 ;
		}

		// Get modes
		for (const fieldName of calcModeList) {
			let maxCount = -Infinity ;
			let mode ;
			for (const [value, count] of Object.entries(modeValues[fieldName])) {
				if (count > maxCount) {
					maxCount = count ;
					mode = value ;
				}
			}
			modeValues[fieldName] = mode ;
		}

		return { periods, stats: {minValues, maxValues, meanValues, modeValues, circularMeanValues} } ;
	}

	getDailyData() {
		let oldDayOfMonth = new Date(parseInt(this.data[0].dt) * 1000).getDate() ;
		let startPeriodIndex = 0 ;
		const dailyStats = [] ;

		for (const [i, period] of this.data.entries()) {
			const date = new Date(parseInt(period.dt) * 1000) ;
    	const dayOfMonth = date.getDate() ; // (one-indexed!)

			// Calculate stats for every period after a date transition (and on reaching the last period)
			if (dayOfMonth !== oldDayOfMonth || i === this.data.length - 1) {
				dailyStats.push(this.calcStats(startPeriodIndex, (i === this.data.length - 1) ? i  : i - 1)) ;

				oldDayOfMonth = dayOfMonth ;
				startPeriodIndex = i ;
			}
		}

		return dailyStats ;
	}
}