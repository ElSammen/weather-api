import { useState } from "react";
import "./textInput.css"

export default function TextInput({setValueExternal}) {
  const [value, changeValue] = useState('') ;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setValueExternal(value) ;
      changeValue('');
    }
  }

	return (
		<div className="text-input">
  		<input value={value}
				onChange={event => changeValue(event.target.value)}
				onKeyDown={handleKeyDown}
				placeholder='Enter Location'
			/>
  	</div>
	)
 }