import { useState } from "react";
import "./locationInput.css"

export default function LocationInput({setLocation}) {
 
  const [locationValue, setLocationValue] = useState('')

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLocation(locationValue) ;
      setLocationValue('');
    }
  }

	return (
		<div className="location-input">
  		<input value={locationValue}
				onChange={event => setLocationValue(event.target.value)}
				onKeyDown={searchLocation}
				placeholder='Enter Location'
			/>
  	</div>
	)
 }