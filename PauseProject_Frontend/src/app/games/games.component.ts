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
	loading: boolean;
	page: Number;
	placeholders: string[];
	constructor(
		private router: Router,
		private _GamesService: GamesService,
		private activatedRoute: ActivatedRoute,
	) {
		this.placeholders = Array(8).fill('loading');
	}

	ngOnInit() {
		this.pageChange(1);
	}

	pageChange(pageIndex: number) {
		this.loading = true;
		this._GamesService.getGames(pageIndex).subscribe(
			data => {
				this.games = data.results;
				this.page = pageIndex;
				this.loading = false;
			},
			err => console.error(err),
			() => console.log('done', pageIndex),
		);
	}

	onSelect(game) {
		this.router.navigate(['/game', game.gameID]);
	}
}
