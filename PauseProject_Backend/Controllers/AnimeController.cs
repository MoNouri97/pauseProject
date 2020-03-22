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
    public class AnimeController : ControllerBase
    {
        const int startingID = 1000000;
        private void setParamaters(HttpClient client)
        {
            //client.DefaultRequestHeaders.Add("x-rapidapi-host", "google-books.p.rapidapi.com");
            // client.DefaultRequestHeaders.Add("x-rapidapi-key", "152e4b8f2emsh7bd97e060f8e6dfp12e0d7jsn99b7a5df88e5");
            client.BaseAddress = new Uri("https://www.googleapis.com/books/v1"); // ?key=AIzaSyB2xuV04xn61GB5TIzB0mfKUPHIRH6K_Fc");
            //client.DefaultRequestHeaders.Add("q", "d");
            client.DefaultRequestHeaders.Add("key", "AIzaSyB2xuV04xn61GB5TIzB0mfKUPHIRH6K_Fc");


        }
        // GET: api/Anime
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (var client = new HttpClient())
            {
                try
                {
                    setParamaters(client);
                    var response = await client.GetAsync("/volumes?q=doni");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawBooks = JsonConvert.DeserializeObject<AnimeDTO>(stringResult);

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
     
       



        // PUT: api/Anime/5
        [HttpGet("{id}", Name = "GetAnimes")]
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
                        var response = await client.GetAsync("/volumes?q=doni" + (i + startingID + (id - 1) * 20));
                        response.EnsureSuccessStatusCode();

                        var stringResult = await response.Content.ReadAsStringAsync();
                        var rawBook = JsonConvert.DeserializeObject<AnimeDTO>(stringResult);
                        //if (rawBook.MusicID != 0)
                        //{
                        i++;
                       // Objects.Add(new
                       // {
                            //rawBook.MusicID,
                            //rawBook.title,
                            //rawBook.release_date,
                            //rawBook.Duration,
                            //rawBook.Artist,
                            //rawBook.Album
                       // });
                        //}

                    } while (i < 20);
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
