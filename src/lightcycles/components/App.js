import Player from "./Player";
import { LightCycles } from "/src/scenes/LightCycles";

class App {
	constructor(props) {
		// super(props);
		this.state = {
			numOfPlayers: 0,
			player1: new Player(),
			player2: new Player(),
			game: LightCycles
		};
		this.yellowLine = [];     //int array
		this.blueLine = [];     //int array

		this.arena = {};
		this.yellowCycle = {};
		this.blueCycle = {};
		this.cursors = {};

		this.updateInputValue = this.updateInputValue.bind(this);
		this.setNumOfPlayers = this.setNumOfPlayers.bind(this);
	}

	setNumOfPlayers() {
		if (parseInt(this.state.numOfPlayers) === 1) {
			this.state.player1.setPlayerType('human');
			this.state.player2.setPlayerType('computer');
		}
		if (parseInt(this.state.numOfPlayers) > 1) {
			this.state.player1.setPlayerType('human');
			this.state.player2.setPlayerType('human');
		}
	}

	getNumOfPlayers() {
		return this.state.numOfPlayers;
	}

	updateInputValue(evt) {
		this.setState({
			numOfPlayers: evt.target.value
		});
	}

	render() {
		const div = document.createElement('div');
		div.className = "howManyPlayers";

		const h1 = document.createElement('h1');
		h1.textContent = "How Many Players? ";

		const input = document.createElement('input');
		input.type = "text";
		input.addEventListener('change', this.updateInputValue);

		const button = document.createElement('button');
		button.textContent = "Start!";
		button.addEventListener('click', this.setNumOfPlayers);

		h1.appendChild(input);
		h1.appendChild(button);
		div.appendChild(h1);

		return div;
	}
}

export default App;