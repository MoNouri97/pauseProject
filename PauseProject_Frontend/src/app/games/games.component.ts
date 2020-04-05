import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
	public games = [];
	page: Number;

	constructor(
		private router: Router,
		private _GamesService: GamesService,
		private activatedRoute: ActivatedRoute,
	) {}

	ngOnInit() {
		this.pageChange(1);
	}

	pageChange(pageIndex: number) {
		this._GamesService.getGames(pageIndex).subscribe(
			data => {
				this.games = data.results;
				this.page = pageIndex;
			},
			err => console.error(err),
			() => console.log('done', pageIndex),
		);
	}

	onSelect(page, game) {
		console.log('/game', page, game.gameID);

		this.router.navigate(['/game', page, game.gameID]);
	}
}
