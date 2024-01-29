import { Scene } from 'phaser';
import { useNavigate } from 'react-router-dom';

export class Pacman extends Scene
{
	constructor ()
	{
		super('Pacman');
		console.log('Pacman scene constructor');
	}

	redirect () {
		const navigate = useNavigate();

		const handleRedirect = () => {
			navigate('/your-target-path');
		};

		return (
			<button onClick={handleRedirect}>Redirect</button>
		);
	}

	create ()
	{
		console.log('Pacman scene created');
		window.location.href = 'http://localhost:63342/Ricks-Arcade/src/pacman/index.html?_ijt=spj16l6iu4ndk6j4hau74tksd7&_ij_reload=RELOAD_ON_SAVE';
	}
}
