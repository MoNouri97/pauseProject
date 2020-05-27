import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from './music.service';
@Component({
	selector: 'app-music',
	templateUrl: './music.component.html',
	styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  public music=[];
  page=1;

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
		this.pageChanged(1);
	}

	pageChanged(ind) {
		this.loading = true;
		this._MusicService.getMusic(ind).subscribe(
			(data) => {
				console.log(data);
				this.music = data;
				this.page = ind;
				this.loading = false;
			},
			(err) => console.error(err),
			() => {
				console.log('done');
				this.loading = false;
			},
		);
	}

	onSelect(music) {
		this.router.navigate(['/music/item', music]);
	}
}
