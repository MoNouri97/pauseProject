import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
	@Input() movie;
	constructor() {}

	ngOnInit() {
		console.log(this.movie);
	}
}
