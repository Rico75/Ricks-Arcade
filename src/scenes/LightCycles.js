import * as Phaser from 'phaser';
import App          from "../lightcycles/components/App.js";
import arena        from "../lightcycles/assets/tron_arena_800x600.png";
import yellowCycle  from "../lightcycles/assets/yellowLegacyCycle_21x50.png";
import blueCycle    from "../lightcycles/assets/blueLegacyCycle_21x50.png";

export class LightCycles extends Phaser.Scene {
	constructor()
	{
		super("LightCycles");
		this.state = {
			pauseGame:	false
		};
		this.app            = new App();
	}
	preload()
	{
		// load images
		this.load.image('arena', arena);
		this.load.image('yellowCycle', yellowCycle);
		this.load.image('blueCycle', blueCycle);
	}
	create()
	{
		console.log('LightCycles.js create');
		console.log('this',this);
		console.log('Phaser',Phaser);
		// set up game objects
		// this.app.arena        = this.physics.add.image(400, 300, 'arena');
		this.app.arena        = this.physics.add.image(768, 1024, 'arena');
		this.app.yellowCycle  = this.physics.add.image(400, 470, 'yellowCycle');
		this.app.blueCycle    = this.physics.add.image(400, 30, 'blueCycle');
		this.app.cursors      = this.input.keyboard.createCursorKeys();

		// set up wall group
		this.outerWall = this.physics.add.staticGroup({});
		Phaser.Actions.PlaceOnRectangle(this.outerWall.getChildren(), new Phaser.Geom.Rectangle(768, 1024, 1, 1));
		this.outerWall.refresh();
		this.app.yellowCycle.setVelocity(0, 0).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(0);
		this.app.blueCycle.setVelocity(0, 0).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(0);

		// add for collision detection
		this.physics.add.collider(this.app.yellowCycle, this.outerWall);
		this.physics.add.collider(this.app.blueCycle, this.outerWall);

		// check to see if cycle crashed into cycle
		this.physics.add.overlap(this.app.blueCycle, this.app.yellowCycle, function () {
			// callback funciton
			return null;
		}, function () {
			// contact function
			this.onCollision('BothCycles');
		}, this);


	}
	update()
	{
		// pause game
		this.scene.pause();

		// set up direction buttons
		this.app.downKeyObj = this.input.keyboard.addKey('S');
		this.app.upKeyObj = this.input.keyboard.addKey('W');
		this.app.leftKeyObj = this.input.keyboard.addKey('A');
		this.app.rightKeyObj = this.input.keyboard.addKey('D');

		// up arrow for yellowCycle //
		if (this.app.cursors.up.isDown && !this.app.cursors.left.isDown && !this.app.cursors.right.isDown) {
			// move cycle direction
			this.app.yellowCycle.angle = 0;
			this.app.yellowCycle.y -= 5;

			console.log('scene:',this);

			// get cycle coords.
			this.app.yellowLine1 = this.add.rectangle(this.app.yellowCycle.x, this.app.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

			// add them to array
			this.app.yellowLine.push(this.app.yellowLine1);

			// check to see if crash with self wall
			this.onCollisionYellowSelf();

			// check to see if crash with blue cycle or blue wall
			this.onCollisionYellowCycleBlueWall();

			//detect when outerwall is hit
			if (this.app.yellowCycle.y <= 15) {
				this.onCollision('YellowCycle');
			}
		}

		// down arrow for yellowCycle //
		if (this.app.cursors.down.isDown && !this.app.cursors.left.isDown && !this.app.cursors.right.isDown) {
			// move cycle direction
			this.app.yellowCycle.angle = 180;
			this.app.yellowCycle.y += 5;

			// get cycle coords.
			this.app.yellowLine2 = this.add.rectangle(this.app.yellowCycle.x, this.app.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

			// add them to array
			this.app.yellowLine.push(this.app.yellowLine2);

			// check to see if crash with self wall
			this.onCollisionYellowSelf();

			// check to see if crash with blue cycle or blue wall
			this.onCollisionYellowCycleBlueWall();

			//detect when outerwall is hit
			if (this.app.yellowCycle.y >= 485) {
				this.onCollision('YellowCycle');
			}
		}

		// left arrow for yellowCycle //
		if (this.app.cursors.left.isDown && !this.app.cursors.down.isDown && !this.app.cursors.up.isDown) {
			// move cycle direction
			this.app.yellowCycle.angle = 270;
			this.app.yellowCycle.x -= 5;

			// get cycle coords.
			this.app.yellowLine3 = this.add.rectangle(this.app.yellowCycle.x, this.app.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

			// add them to array
			this.app.yellowLine.push(this.app.yellowLine3);

			// check to see if crash with self wall
			this.onCollisionYellowSelf();

			// check to see if crash with blue cycle or blue wall
			this.onCollisionYellowCycleBlueWall();

			//detect when outerwall is hit
			if (this.app.yellowCycle.x <= 1) {
				this.onCollision('YellowCycle');
			}
		}

		// right arrow for yellowCycle //
		if (this.app.cursors.right.isDown && !this.app.cursors.down.isDown && !this.app.cursors.up.isDown) {
			// move cycle direction
			this.app.yellowCycle.angle = 90;
			this.app.yellowCycle.x += 5;

			// get cycle coords.
			this.app.yellowLine4 = this.add.rectangle(this.app.yellowCycle.x, this.app.yellowCycle.y, 5, 5, 0xFFEB3B).getCenter();

			// add them to array
			this.app.yellowLine.push(this.app.yellowLine4);

			// check to see if crash with self wall
			this.onCollisionYellowSelf();

			// check to see if crash with blue cycle or blue wall
			this.onCollisionYellowCycleBlueWall();

			//image is 2x as big as pixesl defined
			////detect when outerwall is hit
			if ((parseInt(this.app.yellowCycle.x) / 2) + 1 >= this.app.arena.x) {
				this.onCollision('YellowCycle');
			}
		}

		// up arrow for blueCycle //
		if (this.app.upKeyObj.isDown && !this.app.leftKeyObj.isDown && !this.app.rightKeyObj.isDown) {
			// move cycle direction
			this.app.blueCycle.angle = 0;
			this.app.blueCycle.y -= 5;

			// get cycle coords.
			this.app.blueLine1 = this.add.rectangle(this.app.blueCycle.x, this.app.blueCycle.y, 5, 5, 0x1A237E).getCenter();

			// add them to array
			this.app.blueLine.push(this.app.blueLine1);

			// check to see if crash with self wall
			this.onCollisionBlueSelf();

			// check to see if crash with yellow cycle or yellow wall
			this.onCollisionBlueCycleYellowWall();

			//detect when outerwall is hit
			if (this.app.blueCycle.y <= 15) {
				this.onCollision('BlueCycle');
			}
		}

		// down arrow for blueCycle //
		if (this.app.downKeyObj.isDown && !this.app.leftKeyObj.isDown && !this.app.rightKeyObj.isDown) {
			// move cycle direction
			this.app.blueCycle.angle = 180;
			this.app.blueCycle.y += 5;

			// get cycle coords.
			this.app.blueLine2 = this.add.rectangle(this.app.blueCycle.x, this.app.blueCycle.y, 5, 5, 0x1A237E).getCenter();

			// add them to array
			this.app.blueLine.push(this.app.blueLine2);

			// check to see if crash with self wall
			this.onCollisionBlueSelf();

			// check to see if crash with yellow cycle or yellow wall
			this.onCollisionBlueCycleYellowWall();

			//detect when outerwall is hit
			if (this.app.blueCycle.y >= 485) {
				this.onCollision('BlueCycle');
			}
		}

		// left arrow for blueCycle //
		if (this.app.leftKeyObj.isDown && !this.app.upKeyObj.isDown && !this.app.downKeyObj.isDown) {
			// move cycle direction
			this.app.blueCycle.angle = 270;
			this.app.blueCycle.x -= 5;

			// get cycle coords.
			this.app.blueLine3 = this.add.rectangle(this.app.blueCycle.x, this.app.blueCycle.y, 5, 5, 0x1A237E).getCenter();

			// add them to array
			this.app.blueLine.push(this.app.blueLine3);

			// check to see if crash with self wall
			this.onCollisionBlueSelf();

			// check to see if crash with yellow cycle or yellow wall
			this.onCollisionBlueCycleYellowWall();

			//detect when outerwall is hit
			if (this.blueCycle.x <= 1) {
				this.onCollision('BlueCycle');
			}
		}

		// right arrow for blueCycle //
		if (this.app.rightKeyObj.isDown && !this.app.upKeyObj.isDown && !this.app.downKeyObj.isDown) {
			// move cycle direction
			this.app.blueCycle.angle = 90;
			this.app.blueCycle.x += 5;

			// get cycle coords.
			this.app.blueLine4 = this.add.rectangle(this.app.blueCycle.x, this.app.blueCycle.y, 5, 5, 0x1A237E).getCenter();

			// add them to array
			this.app.blueLine.push(this.app.blueLine4);

			// check to see if crash with self wall
			this.onCollisionBlueSelf();

			// check to see if crash with yellow cycle or yellow wall
			this.onCollisionBlueCycleYellowWall();

			//detect when outerwall is hit
			if (this.app.blueCycle.x >= 799) {
				this.onCollision('BlueCycle');
			}
		}

	}

	onCollision(cycle)
	{
		console.log('onCollision');
		console.log('this',this);
		console.log('cycle ' + cycle);
		this.yellowLine = [];
		this.blueLine   = [];
		this.scene.restart();
	}
	onCollisionYellowSelf()
	{
		// Check if the head of the snake overlaps with any part of the snake.
		// console.log('onCollisionYellowSelf',this)
		for(let i = 0; i < this.app.yellowLine.length - 1; i++){
			if(this.app.yellowCycle.x == this.app.yellowLine[i].x && this.app.yellowCycle.y == this.app.yellowLine[i].y){
				this.onCollision('YellowCycle');
			}
		}
	}
	onCollisionBlueSelf()
	{
		// Check if the head of the snake overlaps with any part of the snake.
		for(let i = 0; i < this.app.blueLine.length - 1; i++){
			if(this.blueCycle.x == this.app.blueLine[i].x && this.app.blueCycle.y == this.app.blueLine[i].y){
				this.onCollision('BlueCycle');
			}
		}
	}
	onCollisionYellowCycleBlueWall()
	{
		// Check if the head of the snake overlaps with any part of the snake.
		for(let i = 0; i < this.app.yellowLine.length - 1; i++)
		{
			if(typeof this.app.blueLine[i] !== 'undefined')
			{
				this.app.blueLineXval = this.app.blueLine[i].x;
				this.app.blueLineYval = this.app.blueLine[i].y;
			}
			else
			{
				this.app.blueLineXval = 0;
				this.app.blueLineYval = 0;
			}
			if(this.app.yellowCycle.x == this.app.blueLineXval && this.app.yellowCycle.y == this.app.blueLineYval)
			{
				this.app.onCollision('YellowCycle');
			}
		}
	}
	onCollisionBlueCycleYellowWall()
	{
		// Check if the head of the snake overlaps with any part of the snake.
		for(let i = 0; i < this.app.blueLine.length - 1; i++){
			if(typeof this.app.yellowLine[i] !== 'undefined')
			{
				this.app.yellowLineXval = this.app.yellowLine[i].x;
				this.app.yellowLineYval = this.app.yellowLine[i].y;
			}
			else
			{
				this.app.yellowLineXval = 0;
				this.app.yellowLineYval = 0;
			}
			if(this.app.blueCycle.x == this.app.yellowLineXval && this.app.blueCycle.y == this.app.yellowLineYval)
			{
				this.onCollision('BlueCycle');
			}
		}
	}
}
