using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;
using PauseProject.DTOs;

namespace PauseProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private void setParamaters(HttpClient client)
        {
            client.DefaultRequestHeaders.Add("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com");
            client.DefaultRequestHeaders.Add("x-rapidapi-key", "561941f758msh88c2c4bdee94f02p1a55ecjsnc1de051d696d");
            client.BaseAddress = new Uri("https://rawg-video-games-database.p.rapidapi.com");
        }

        // GET: api/Games
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using(var client = new HttpClient())
            {
                try
                {
                    setParamaters(client);
                    var response = await client.GetAsync("/games");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawGame = JsonConvert.DeserializeObject<GameDTO>(stringResult);
                    
                    return Ok(new
                    {
                        Count = rawGame.Count ,
                        Results = rawGame.Results
                    });
                }
                catch (HttpRequestException http)
                {
                    return BadRequest("bad request : " + http.Message);
                }
            }
        }

        // GET: api/Games/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    setParamaters(client);
                    var response = await client.GetAsync("/games?page="+id);
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawGame = JsonConvert.DeserializeObject<GameDTO>(stringResult);

                    return Ok(new
                    {
                        Count = rawGame.Count,
                        Results = rawGame.Results
                    });
                }
                catch (HttpRequestException http)
                {
                    return BadRequest("bad request : " + http.Message);
                }
            }
        }

        // POST: api/Games
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Games/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
