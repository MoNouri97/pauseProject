import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from './music.service';
@Component({
	selector: 'app-music',
	templateUrl: './music.component.html',
	styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
	public music = [];
	loading: boolean;
	placeholders: string[];

	items = [];
	pageOfItems: Array<any>;
	id;
	constructor(
		private router: Router,
		private _MusicService: MusicService,
		private activatedRoute: ActivatedRoute,
	) {
		this.placeholders = Array(8).fill('loading');
	}

	ngOnInit() {
		this.loading = true;
		this.activatedRoute.params.subscribe((paramsId) => {
			this.id = paramsId.id;
		});
		this._MusicService.getMusic(1).subscribe(
			(data) => {
				console.log(data);

				this.music = data;
			},
			(err) => console.error(err),
			() => console.log('done'),
		);
	}

	pageChange(ind) {
		this._MusicService.getMusic(ind).subscribe(
			(data) => {
				this.music = data;
			},
			(err) => console.error(err),
			() => console.log('done'),
		);
	}

	onSelect(music) {
		this.router.navigate(['/music/item', music]);
	}
}
