/* Based on https://github.com/TDAWebDevBootcamp/Week-10-Weather-APP-Example/tree/master/src */

import Table from 'react-bootstrap/Table';

export default function SummaryData(props) {
    return (
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th title="temperature range" colSpan="2"><sup>o</sup>C</th>
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
    );
  }
