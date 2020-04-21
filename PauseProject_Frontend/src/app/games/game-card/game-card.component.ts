import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
	@Input() game;
	constructor() {}

	ngOnInit() {}
}
