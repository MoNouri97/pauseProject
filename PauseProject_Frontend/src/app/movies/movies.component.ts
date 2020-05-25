import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
	public movies = [];
	loading: boolean;
	placeholders: string[];

	items = [];
	pageOfItems: Array<any>;
	id;
	constructor(
		private router: Router,
		private _MoviesService: MoviesService,
		private activatedRoute: ActivatedRoute,
	) {}

	ngOnInit() {
		this.placeholders = Array(8).fill('loading');
		this.activatedRoute.params.subscribe((paramsId) => {
			this.id = paramsId.id;
		});
		this.pageChange(1);
	}

	pageChange(ind) {
		this.loading = true;
		this._MoviesService.getMovies(ind).subscribe(
			(data) => {
				this.movies = data;
			},
			(err) => console.error(err),
			() => {
				this.loading = false;
				console.log('done');
			},
		);
	}

	onSelect(movie) {
		this.router.navigate(['/movie', movie]);
	}
}
