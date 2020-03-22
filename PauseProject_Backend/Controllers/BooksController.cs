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
    public class BooksController : ControllerBase
    {
        const int startingID = 1000000;
        private void setParamaters(HttpClient client)
        {
           
            client.BaseAddress = new Uri("https://kitsu.io/api/edge/manga");  

        }
        // GET: api/Books
        [HttpGet]
    
        public async Task<IActionResult> Get()
        {
            using (var client = new HttpClient())
            {
                try
                {
                    //setParamaters(client);
                    client.BaseAddress = new Uri("https://kitsu.io/api/edge/manga/1");
                    var response = await client.GetAsync("");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawBooks = JsonConvert.DeserializeObject<BooksDTO>(stringResult);

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

        // GET: api/Books/5
        [HttpGet("{id}", Name = "GetBooks")]
        public async Task<IActionResult> Get(int id)
        {
            using (var client = new HttpClient())
            {

               // try
              //  {
                    // setParamaters(client);
                    client.BaseAddress = new Uri("https://kitsu.io");

                    List<Object> Objects = new List<Object>();
                    int i = (id -1) * 20;
                    int j = 0;

                    do
                    {
                        var response = await client.GetAsync("/api/edge/manga/" + i);
                        //
                        if (response.IsSuccessStatusCode)
                        {
                            Console.Write(response.StatusCode);

                            var stringResult = await response.Content.ReadAsStringAsync();

                            var rawBook = JsonConvert.DeserializeObject<BooksDTO>(stringResult);
                            //if (rawBook.MusicID != 0)
                            //{
                            i++;
                            j++;
                            Objects.Add(new
                            {
                                rawBook.data,
                              

                            });
                            //}
                        }
                        else
                    {
                        i++;
                    }
                    } while (j < 20);

                    return Ok(Objects);
               // }

               // catch (HttpRequestException http)
               // {
               //     return BadRequest("bad request : " + http.Message);
                //}
            }
        }


    }
}
