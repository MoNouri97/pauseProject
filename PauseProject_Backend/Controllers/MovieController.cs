using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PauseProject.DTOs;

namespace PauseProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MovieController : ControllerBase
	{
		private void setParamaters(HttpClient client)
		{
			// client.DefaultRequestHeaders.Add("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com");
			client.DefaultRequestHeaders.Add("api_key", "24b8faff37938fbb8b0d9ef7baec7a09");
			client.BaseAddress = new Uri("https://api.themoviedb.org/3/movie/550?");
		}
		// GET: api/Movie
		[HttpGet]


		// GET: api/Movie/5
		[HttpGet("{id}", Name = "GetMovie")]
		public async Task<IActionResult> Get(int id)
		{
			using (var client = new HttpClient())
			{

				try
				{
					client.BaseAddress = new Uri("https://api.themoviedb.org");



					Object Movie = null;



					var response = await client.GetAsync("/3/movie/" + id + "?api_key=24b8faff37938fbb8b0d9ef7baec7a09");
					Console.Write(response.StatusCode);
					//

					Console.Write(response.StatusCode);

					var stringResult = await response.Content.ReadAsStringAsync();

					// var rawMovie = JsonConvert.DeserializeObject<MoviesDTO>(stringResult);
					dynamic rawMovie = JsonConvert.DeserializeObject(stringResult);


					if (rawMovie.img != null)
						rawMovie.img = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + rawMovie.img;
					Movie = rawMovie;
					// Objects.Add(new
					// {
					// 	rawMovie.id,
					// 	rawMovie.img,
					// 	rawMovie.release_date,
					// 	rawMovie.title,


					// });

					return Ok(stringResult);
				}
				catch (HttpRequestException http)
				{
					return BadRequest("bad request : " + http.Message);
				}
			}
		}
		[HttpGet("title/{id}", Name = "GetMovieTitle")]
		public async Task<IActionResult> GetTitle(int id)
		{
			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri("https://api.themoviedb.org");
				List<Object> Objects = new List<Object>();
				var response = await client.GetAsync("/3/movie/" + id + "?api_key=24b8faff37938fbb8b0d9ef7baec7a09");

				if (response.IsSuccessStatusCode)
				{

					var stringResult = await response.Content.ReadAsStringAsync();

					var rawMovie = JsonConvert.DeserializeObject<MoviesDTO>(stringResult);
					rawMovie.type = "movie";

					Objects.Add(new
					{
						rawMovie.id,

						rawMovie.title,
						rawMovie.type

					});

				}
				return Ok(Objects);

			}

		}


	}
}
