import { useState, useEffect, useRef } from 'react' ;
import useSound from 'use-sound';

export default function SoundManager(props) {
	const [sounds, changeSounds] = useState({}) ;
	let prevStop = useRef(null) ;
	let prevSound = useRef(null) ;
	const opts = {
		loop: sounds[props.soundId] ? sounds[props.soundId].isLooped : false,
		soundEnabled: props.soundEnabled
	} ;
	const [play, {stop, sound}] = useSound('assets/sounds/' + (sounds[props.soundId] ? sounds[props.soundId].filename : 'empty.wav'), opts) ;

	// Initialisation
	useEffect(() => {
		for (const [id, fileData] of Object.entries(props.soundList)) {
			changeSounds((sounds) => ({...sounds, [id]: {...fileData}})) ;
		}
	}, [props.soundList]) ;

	// Do fades in/out every time the sound effect changes
	useEffect(() => {
		if (prevSound.current) prevSound.current.fade(1, 0, 800); // (fade out old)
		const prevStopValue = prevStop.current ; // (preserve old stop function for setInterval())
		if (prevStop.current) setInterval(prevStopValue, 1000) ; // (stop after 1 second in-case the fade leaves it running silent)
		play() ; // (start new sound)
		if (sound) sound.fade(0.2, 1, 800); // (fade in new)
		prevStop.current = stop ;
		prevSound.current = sound ;

	}, [play]) ;

	return null ; // (nothing to render!)
}