import "./toggleInput.css"
import { Form } from "react-bootstrap";

export default function ToggleInput({setValueExternal}) {

  const handleToggle = (event) => {
    setValueExternal(event.target.checked) ;   
  }

	return (
		<div className="toggle-input">
			<Form.Switch id="toggleinput-form-switch" size="md" label="Sound"
				onChange={handleToggle}></Form.Switch>
  	</div>
	)
 }