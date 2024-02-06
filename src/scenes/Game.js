import { Scene } from 'phaser';
import App from "/src/lightcycles/components/App";

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00efff);

        let textHeight = 84;
        let textStart = 400;

        // this.add.image(512, 384, 'background').setAlpha(0.5);
        this.add.image(512, 384, 'background').setAlpha(0.5);

        const title = this.add.text(512, textHeight, 'Please select a game to start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        /* make text interactive */
        const group = this.add.group();
        group.classType = Phaser.GameObjects.Text;

        const str = 'pacman';
        const font = { fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#bff619',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center' };
        const text = group.create(textStart, textHeight+100, str, font);
        text.setInteractive(new Phaser.Geom.Rectangle(0, 0, text.width, text.height), Phaser.Geom.Rectangle.Contains);

        const str1 = 'light cycles of death';
        const font1 = { fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#bff619',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center' };
        const text1 = group.create(textStart-125, textHeight+200, str1, font1);
        text1.setInteractive(new Phaser.Geom.Rectangle(0, 0, text1.width, text1.height), Phaser.Geom.Rectangle.Contains);

        this.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            switch (gameObject.text.toUpperCase()) {
                case 'PACMAN':
                    this.scene.start('Pacman');
                    break;
                case 'LIGHT CYCLES OF DEATH':
                    this.scene.start('LightCycles');
                    break;
                default:
                    this.scene.start('GameOver');
                    break;
                }

        });
    }
}
