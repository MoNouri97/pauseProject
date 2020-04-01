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
    public class MusicController : ControllerBase
    {
        private void setParamaters(HttpClient client)
        {
            client.DefaultRequestHeaders.Add("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
            client.DefaultRequestHeaders.Add("x-rapidapi-key", "561941f758msh88c2c4bdee94f02p1a55ecjsnc1de051d696d");
            client.BaseAddress = new Uri("https://deezerdevs-deezer.p.rapidapi.com/");
        }
        

        // GET: api/Music/5
        [HttpGet("{id}", Name = "GetMusic")]
        public async Task<IActionResult> Get(int id)
        {
            using (var client = new HttpClient())
            {

                try
                {
                    setParamaters(client);
                    List<Object> Objects = new List<Object>();
                  
                   
                        var response = await client.GetAsync("/track/" + id);
                        response.EnsureSuccessStatusCode();

                        var stringResult = await response.Content.ReadAsStringAsync();
                        var rawMusic = JsonConvert.DeserializeObject<MusicDTO>(stringResult);
                      
                        Objects.Add(new
                        {
                            rawMusic.MusicID,
                            rawMusic.title,
                            rawMusic.release_date,
                            rawMusic.Duration,
                            rawMusic.Artist,
                            rawMusic.Album
                        });
                        //}

                    
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
