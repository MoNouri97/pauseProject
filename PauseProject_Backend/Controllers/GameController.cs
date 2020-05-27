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
	public class GameController : ControllerBase
	{
		private void setParamaters(HttpClient client)
		{
			client.DefaultRequestHeaders.Add("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com");
			client.DefaultRequestHeaders.Add("x-rapidapi-key", "561941f758msh88c2c4bdee94f02p1a55ecjsnc1de051d696d");
			client.BaseAddress = new Uri("https://rawg-video-games-database.p.rapidapi.com");
		}


		// GET: api/Game/5
		[HttpGet("{index}", Name = "GetGame")]
		public async Task<IActionResult> Get(int index)
		{
			using (var client = new HttpClient())
			{
				List<Object> Objects = new List<Object>();

				try
				{
					setParamaters(client);
					var response = await client.GetAsync("/games/" + index);
					response.EnsureSuccessStatusCode();

					var stringResult = await response.Content.ReadAsStringAsync();
					// var rawGame = JsonConvert.DeserializeObject<GameDTO>(stringResult);
					var rawGame = JsonConvert.DeserializeObject(stringResult);
					Objects.Add(rawGame);
					//int i = Objects.Find(e => Objects[1]);*/
					return Ok(stringResult);
				}
				catch (HttpRequestException http)
				{
					return BadRequest("bad request : " + http.Message);
				}
			}
		}

		[HttpGet("title/{index}", Name = "GetGameTitle")]
		public async Task<IActionResult> Gettitle(int index)
		{
			using (var client = new HttpClient())
			{
				List<Object> Objects = new List<Object>();

				try
				{
					setParamaters(client);
					var response = await client.GetAsync("/games/" + index);
					if (response.IsSuccessStatusCode)
					{

						var stringResult = await response.Content.ReadAsStringAsync();
						var rawGame = JsonConvert.DeserializeObject<GameTitle>(stringResult);
						rawGame.type = "game";
						Objects.Add(new
						{
							rawGame.gameId,
							rawGame.name,
							rawGame.type,
						});
					}
					//int i = Objects.Find(e => Objects[1]);*/
					return Ok(Objects);
				}
				catch (HttpRequestException http)
				{
					return BadRequest("bad request : " + http.Message);
				}
			}
		}

	}


}
