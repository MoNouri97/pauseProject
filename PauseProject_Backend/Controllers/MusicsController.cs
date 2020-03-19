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
    public class MusicsController : ControllerBase
    {
        const int startingID = 1000000;
        private void setParamaters(HttpClient client)
        {
            client.DefaultRequestHeaders.Add("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
            client.DefaultRequestHeaders.Add("x-rapidapi-key", "561941f758msh88c2c4bdee94f02p1a55ecjsnc1de051d696d");
            client.BaseAddress = new Uri("https://deezerdevs-deezer.p.rapidapi.com/");
        }

        // GET: api/Musics
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (var client = new HttpClient())
            {
                try
                {
                    setParamaters(client);
                    var response = await client.GetAsync("/track");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawMusic = JsonConvert.DeserializeObject<MusicDTO>(stringResult);

                    return Ok(new
                    {
                        
                    });
                }
                catch (HttpRequestException http)
                {
                    return BadRequest("bad request : " + http.Message);
                }
            }
        }

        // GET: api/Musics/5
        [HttpGet("{id}", Name = "GetMusics")]
        public async Task<IActionResult> Get(int id)
        {
            using (var client = new HttpClient())
            {
            
                try
                {
                    setParamaters(client);
                    List<Object> Objects = new List<Object>();
                    int i = 0;
                    do
                    {
                        var response = await client.GetAsync("/track/" + (i + startingID + (id-1)*20));
                        response.EnsureSuccessStatusCode();

                        var stringResult = await response.Content.ReadAsStringAsync();
                        var rawMusic = JsonConvert.DeserializeObject<MusicDTO>(stringResult);
                        if (rawMusic.MusicID != 0)
                        {
                            i++;
                            Objects.Add(new
                            {
                                rawMusic.MusicID,
                                rawMusic.title,
                                rawMusic.release_date,
                                rawMusic.Duration,
                                rawMusic.Artist,
                                rawMusic.Album
                            });
                        }
                        
                    } while (i < 20 );
                    return Ok (Objects);
                }
                catch (HttpRequestException http)
                {
                    return BadRequest("bad request : " + http.Message);
                }
            }
        }

        
    }
}
