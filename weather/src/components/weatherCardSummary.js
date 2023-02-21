/* Based on https://github.com/TDAWebDevBootcamp/Week-10-Weather-APP-Example/tree/master/src */

import Table from 'react-bootstrap/Table';
import Popup from './popup' ;
import { useState } from 'react';

export default function SummaryData({data}) {
	const [coords, changeCoords] = useState(null) ;
	const [emphasisedDetails, changeEmphasisedDetails] = useState(null) ;

	function activatePopup(detailsCategory) {
		changeCoords({x: 0, y: 0}) ;
		changeEmphasisedDetails(detailsCategory) ;
	}

	function removePopup() {
		changeCoords(null) ;
	}

	let minVisibility = data.minValues.visibility ;
	let minVisibilityUnits = 'm' ;
	if (minVisibility > 1000) {
		minVisibility = Math.round(minVisibility / 1000) ;
		minVisibilityUnits = 'km' ;
	}

	return (
		<>
			<Table striped bordered size="sm">
				<thead>
					<tr>
						<th title="temperature range" colSpan="2" onMouseMove={() => activatePopup('t')}><sup>o</sup>C</th>
						<th title="wind speed" onMouseMove={() => activatePopup('w')}>W</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td title="min temperature">{data.minValues.temp_min}</td>
						<td title="max temperature">{data.maxValues.temp_max}</td>
						<td title="wind speed">{data.meanValues.wind_speed}</td>
					</tr>
				</tbody>
			</Table>

			<Popup coords={coords} onMouseLeave={removePopup}>
				<h2>Details</h2>
				<div className={emphasisedDetails === 't' ? 'my-emphasised-details' : ''}>
					<div>Average temperature: {data.meanValues.temp}<sup>o</sup>C</div>
					<div>Min feels like: {data.minValues.feels_like}<sup>o</sup>C</div>
					<div>Max feels like: {data.maxValues.feels_like}<sup>o</sup>C</div>
				</div>
				<div>
					<div>Min humidity: {data.minValues.humidity}%</div>
					<div>Max humidity: {data.maxValues.humidity}%</div>
				</div>
				<div className={emphasisedDetails === 'w' ? 'my-emphasised-details' : ''}>
					<div>Max wind gust: {data.maxValues.wind_gust} m/s</div>
					<div>Average wind direction: {data.circularMeanValues.wind_degs}<sup>o</sup></div>
				</div>
				<div>
					<div>Min visibility: {minVisibility}{minVisibilityUnits}</div>
				</div>
			</Popup>
		</>
	);
}