import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
	headers: new HttpHeaders({
		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
		'x-rapidapi-key': '152e4b8f2emsh7bd97e060f8e6dfp12e0d7jsn99b7a5df88e5',
	}),
};
@Injectable({
	providedIn: 'root',
})
export class MusicService {
	data1: any;

	getMusic(i: any): any {
		let URL = `http://localhost:5000/api/Musics/${i} `;

		this.data1 = this.http.get(URL, httpOptions);
		return this.data1;
	}

	constructor(private http: HttpClient) {}
}
