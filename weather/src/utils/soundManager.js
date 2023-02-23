import { useState, useEffect } from 'react' ;
import useSound from 'use-sound';

export default function SoundManager(props) {
	const [sounds, changeSounds] = useState({}) ;
	const [stopSound, changeStopSound] = useState(null) ;
	const opts = {
		interrupt: true,
		loop: sounds[props.id] ? sounds[props.id].isLooped : false
	} ;
	const [play, {stop, sound}] = useSound('assets/sounds/' + (sounds[props.id] ? sounds[props.id].filename : 'empty.wav'), opts) ;
	if (play) play() ;
	if (sound) sound.fade(0.25, 1, 300);

	// Initialisation
	useEffect(() => {
		for (const [id, fileData] of Object.entries(props.soundList)) {
			changeSounds((sounds) => ({...sounds, [id]: {...fileData}})) ;
		}
	}, [props.soundList]) ;

	// Stop sound every time the sound effect changes
	useEffect(() => {
		changeStopSound(stop) ;
		if (stopSound) stopSound() ;
	}) ;

	return null ;
}