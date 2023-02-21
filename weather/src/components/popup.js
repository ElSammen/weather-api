import './popup.css' ;

export default function Popup({coords, children, onMouseLeave}) {
	const style = coords && {
		left: coords.x,
		bottom: coords.y
	}
	
  return (
		coords &&
  	<div className="my-popup" onMouseLeave={onMouseLeave} style={style}>
			{children}
		</div>
  );
}