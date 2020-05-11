using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
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

                client.BaseAddress = new Uri("https://kitsu.io");
                List<Object> Objects = new List<Object>();
                
                int i = (id - 1) * 20;
                int j = 0;

                while (j < 20)
                {                                  
                    var handle = new EventWaitHandle(false, EventResetMode.ManualReset);
                  
                    var thread = new Thread(async () =>
                    {

                        try
                        {
                            var response = await client.GetAsync("/api/edge/manga/" + i);
                            if (response.IsSuccessStatusCode)
                            {
                                var stringResult = await response.Content.ReadAsStringAsync();
                                var rawBook = JsonConvert.DeserializeObject<BooksDTO>(stringResult);


                                Objects.Add(new
                                {
                                    rawBook.data,
                                });
                                Console.WriteLine("Thread{0} exits", i);
                                handle.Set();
                                j++;
                            }

                        }
                        catch(Exception e)
                        {
                            Console.WriteLine(e.Message);
                        }

                    });
                    i++;
                    
                    thread.Start();
                    
                } 
                
                Console.WriteLine("Main thread exits");
                
                

                /*
               do
                {
                    
                    var response = await client.GetAsync("/api/edge/manga/" + i);


                    if (response.IsSuccessStatusCode)
                    {
                        Console.Write(response.StatusCode);

                        var stringResult = await response.Content.ReadAsStringAsync();
                        var rawBook = JsonConvert.DeserializeObject<BooksDTO>(stringResult);

                        i++;
                        j++;
                        Objects.Add(new
                        {
                            rawBook.data,
                        });
                    }
                    else
                    {
                        i++;
                    } 
                } while (j < 20);  */
                return Ok(Objects);
                // }

                // catch (HttpRequestException http)
                // {
                //     return BadRequest("bad request : " + http.Message);
                //}
            }
        }




      /*  public static void Maine()
        {

            Thread myThread;
            myThread = new Thread(new ThreadStart(ThreadLoop));
            myThread.Start();
        }
        */

        public static void ThreadLoop()
        {
            // Tant que le thread n'est pas tué, on travaille
            while (Thread.CurrentThread.IsAlive)
            {

                // Affichage dans la console
                Console.WriteLine("Je travaille...");
            }
        }

    }

}