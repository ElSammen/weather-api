import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import "./navbar.css"

export default function MyNavbar() {
	return (
		<div>
			<Navbar bg="light" expand="md">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Link className="nav-link" to="/days">Days</Link>
						<Link className="nav-link" to="/timeline">Timeline</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
