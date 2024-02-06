class Player {
	constructor(props) {
		this.score = 0;
		this.wins = 0;
		this.loses = 0;
		this.playerHuman = 'YES';
		this.playerName = '';
	}

	setPlayerType(playerType) {
		if(playerType !== 'human') {
			this.playerHuman = 'NO';
		}
	}

	setPlayerScore(score) {
		let s = parseInt(score);
		this.score = s;
	}

	setPlayerWins(num1) {
		let n1 = parseInt(num1);
		this.wins = n1;
	}

	setPlayerLose(num2) {
		let n2 = parseInt(num2);
		this.loses = n2;
	}

	setPlayerName(str1) {
		let s1 = String(str1);
		this.playerName = s1;
	}

	getPlayerName() {
		return this.playerName;
	}

	isPlayerHuman() {
		return this.playerHuman;
	}
}

export default Player;