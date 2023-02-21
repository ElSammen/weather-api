/* Based on https://github.com/TDAWebDevBootcamp/Week-10-Weather-APP-Example/tree/master/src */

import Table from 'react-bootstrap/Table';
import Popup from './popup' ;
import { useState } from 'react';

export default function SummaryData(props) {
	const [coords, changeCoords] = useState(null) ;

	function activatePopup() {
		changeCoords({x: 0, y: 0}) ;
	}

	function removePopup() {
		changeCoords(null) ;
	}

	return (
		<>
			<Table striped bordered size="sm">
				<thead>
					<tr>
						<th title="temperature range" colSpan="2" onMouseMove={activatePopup}><sup>o</sup>C</th>
						<th title="wind speed">W</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td title="min temperature">{props.min}</td>
						<td title="max temperature">{props.max}</td>
						<td title="wind speed">{props.wind}</td>
					</tr>
				</tbody>
			</Table>

			<Popup coords={coords} onMouseLeave={removePopup}>
				<h2>Details</h2>
				<div>Average temperature: {props.meanTemp}<sup>o</sup>C</div>
			</Popup>
		</>
	);
}