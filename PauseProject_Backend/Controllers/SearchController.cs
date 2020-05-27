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
    public class SearchController : ControllerBase
    {
        // GET: api/Search/5
        [HttpGet("{id}", Name = "GetSearch")]
        public async Task<IActionResult> Get(String id)
        {
            var handle = new EventWaitHandle(false, EventResetMode.AutoReset);
            WaitHandle[] waitHandles = new WaitHandle[30];
            List<Object> Object = new List<Object>();
            string bid;
            string bt;
            
            for (int index = 1; index < 20; index++)
                {
                var j = index;
                var thread = new Thread(async () => {
                
                    try
                    {
                                await  transform(Object, "book", id,index);
                                await transform(Object, "serie", id, index);
                                await transform(Object, "movie", id, index);
                                await transform(Object, "game", id, index);
                                await transform(Object, "music", id, index);
                                Console.Write("\nafter transofrm 1 is " + Object.Count() + "\n");
                                Console.Write(Object.Count());
                                Thread.Sleep(j * 1000);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }
                    handle.Set();
                });
                thread.Start();
                waitHandles[j] = handle;
            }
            handle.WaitOne();
            Console.Write("\nafter transofrm 2 is " + Object.Count() +"\n");

            // look on localhost ,

            // List<BookTitleDTO> Objects = new List<BookTitleDTO>();

            //string bid;

            // using (var client = new HttpClient())
            // {

            /*  for (int index = 1; index < 11; index++)
              {


                 // var handle = new EventWaitHandle(false, EventResetMode.ManualReset);
                //  var thread = new Thread(async () =>
                 // {
                      */
            //   try
            //  {


            /* await Transform(Object, "serie", id);
             Console.WriteLine("after2");
             await Transform(Object, "movie", id);
             Console.WriteLine("after3");
             await Transform(Object, "music", id);
             Console.WriteLine("after4");
             await Transform(Object, "game", id);
             Console.WriteLine("after5"); */

            /*   var  response = await client.GetAsync("http://localhost:5000/api/book/title/" + index);
               var response2 = await client.GetAsync("http://localhost:5000/api/serie/title/" + index);
               var response3 = await client.GetAsync("http://localhost:5000/api/movie/title/" + index);
               var response4 = await client.GetAsync("http://localhost:5000/api/music/title/" + index);
               var response5 = await client.GetAsync("http://localhost:5000/api/game/title/" + index); */

            /*  if (response.IsSuccessStatusCode)
              {
                  string stringResult = await response.Content.ReadAsStringAsync();
                  await transformAsync(Object, stringResult, "book", id);
              }

              if (response2.IsSuccessStatusCode)
              {
                  string stringResult2 = await response2.Content.ReadAsStringAsync();
              await transformAsync(Object, stringResult2, "serie", id);
              }

              if (response3.IsSuccessStatusCode)
              {
                  string stringResult3 = await response3.Content.ReadAsStringAsync();
                 await transformAsync(Object, stringResult3, "movie", id);
              }

              if (response4.IsSuccessStatusCode)
              {
                  string stringResult4 = await response4.Content.ReadAsStringAsync();
                 await transformAsync(Object, stringResult4, "music", id);
              }
              if (response5.IsSuccessStatusCode)
              {
                  string stringResult5 = await response5.Content.ReadAsStringAsync();
                await  transformAsync(Object, stringResult5, "game", id);
              } 


                      /* string[] tabS = stringResult.Split("\"");

                       bid = tabS[2].Substring(1, tabS[2].Length - 2);
                       bt = tabS[5];
                       if (bt.Contains(id, StringComparison.OrdinalIgnoreCase))
                       {
                           Object.Add(new { bid, bt });
                       }*/
            // handle.Set();

            /*    }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                // });
                //thread.Start();
                //  }

            
    */
           
            if (Object.Count() == 0)
                {
                    int u = 0;
                    bt = "No results";
                    Object.Add(new { u, bt });
                }
                return Ok(Object.Distinct().ToList());
          //  }

        }


        public async Task transform (List<Object> Object, String type, String id, int index)
        { 
   
            // HttpClientHandler handler = new HttpClientHandler();
           // var handle = new EventWaitHandle(false, EventResetMode.AutoReset);
            string bid;
            string bt;
            // Thread[] thread = new Thread[11]
            try
            {
                using (var client = new HttpClient())
                {
                    var response = await client.GetAsync("http://localhost:5000/api/" + type + "/title/" + index);
                   
                    if (response.IsSuccessStatusCode)
                    {
                        string stringResult = await response.Content.ReadAsStringAsync();
                        if (stringResult.Contains(id, StringComparison.OrdinalIgnoreCase))
                        {
                            // Console.Write(stringResult);
                            string[] tabS = stringResult.Split("\"");

                            bid = tabS[2].Substring(1, tabS[2].Length - 2);
                            bt = tabS[5];
                            List<Object> Obj = new List<Object>();
                            Obj.Add(new { bid, bt, type });

                            if (bt.Contains(id, StringComparison.OrdinalIgnoreCase) && Object.Contains(Obj) == false)
                            {
                           
                                Object.Add(new { bid, bt, type });
      
                            }
                        }
                    }
                }
            }

            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }


            /*   thread[index].Start();


               Console.Write("\n you got to thread start \n");
                   Console.WriteLine(index);
           }
           for (int i = 1; i < 11; i++)
           {
               thread[i].Join();
               Console.Write("\n joining " + i +" \n");
           }*/
            Console.Write("\ninside transofrm " + index + "of type " + type +  "\n");
        }


        [HttpGet("test/{id}", Name = "GetSearchTest")]
        public async Task<IActionResult> GetBookssInParallelInWithBatches(string id)
        {
            var tasks = new List<Task<String>>();
            List<Object> Object = new List<Object>();
            for (int index = 1; index < 11; index++)
            {

                tasks.Add(GetBooks("book",  index));
                tasks.Add(GetBooks("serie",  index));
                tasks.Add(GetBooks( "movie",  index));
                tasks.Add(GetBooks("game",  index));
                tasks.Add(GetBooks( "music", index));
            }

            for (int i = 0; i < tasks.Count(); i++)
            {
                if (tasks[i].Result.Contains(id, StringComparison.OrdinalIgnoreCase) == false)
                {
                    tasks.RemoveAt(i);
                }
               
                

            }
            string bid;
            string bt;
            string type;
            for (int i = 0; i < tasks.Count(); i++)
            {
                if (tasks[i].Result.Contains(id, StringComparison.OrdinalIgnoreCase) == false)
                {
                    tasks.RemoveAt(i);
                }
              
            }

            for (int i = 0; i < tasks.Count(); i++)
            {
                if (tasks[i].Result.Contains(id, StringComparison.OrdinalIgnoreCase) ){
                    string[] tabS = tasks[i].Result.Split("\"");

                    bid = tabS[2].Substring(1, tabS[2].Length - 2);
                    bt = tabS[5];
                    type = tabS[9];
                    List<Object> Obj = new List<Object>();
                    Obj.Add(new { bid, bt, type });

                    if (bt.Contains(id, StringComparison.OrdinalIgnoreCase) && Object.Contains(Obj) == false)
                    {

                        Object.Add(new { bid, bt, type });

                    }
                }
            }

            if (Object.Count() ==0)
            {
                bid = "0";
                bt = "no results";
                Object.Add(new { bid, bt});

            }
            return Ok(Object.ToList());

            //return (await Task.WhenAll(tasks)).ToList();
        }

        public async Task <string> GetBooks(String type, int index)
        {
            string stringResult ="";
            string bid;
            string bt;
            // Thread[] thread = new Thread[11]
           
                using (var client = new HttpClient())
                {

                    var response = await client.GetAsync("http://localhost:5000/api/" + type + "/title/" + index);

                    if (response.IsSuccessStatusCode)
                    {

                        stringResult = await response.Content.ReadAsStringAsync();
                        // var books = JsonConvert.DeserializeObject<BooksDTO>(stringResult);
                    /*if (stringResult.Contains(id, StringComparison.OrdinalIgnoreCase))
                     {
                         // Console.Write(stringResult);
                         string[] tabS = stringResult.Split("\"");

                         bid = tabS[2].Substring(1, tabS[2].Length - 2);
                         bt = tabS[5];
                         List<Object> Obj = new List<Object>();
                         Obj.Add(new { bid, bt, type });

                         if (bt.Contains(id, StringComparison.OrdinalIgnoreCase) && Object.Contains(Obj) == false)
                         {

                             Object.Add(new { bid, bt, type });


                         }
                     }*/

                }
                
                }
            return stringResult;
        }

            }
        }

//Console.Write("\n " + bid + "  " + bt + "\n");
//.Substring(1, stringResult.Length - 2));



// Object.Add(rawBooks);


//Console.Write("\n" + Object.X + "\n");
//Object.Add(rawBooks);
// rawBooks[0].canonicalTitle.conatins(id);
//Console.Write("\n" + b + "\n");
/*Object.Add(stringResult);
Console.Write("\n" +  Object + "\n"); */

/*  for(int i =0; i< stringResult.Length; i++)
    {
        int j = stringResult.IndexOf(@":");
        int k = stringResult.IndexOf(@",");

      Console.Write("\n "+ j + "  " + k + "\n");

      bid = stringResult.Substring(j+1, k-j-1);
      Console.Write("\n " + bid + "\n");
  }*/
// stringResult = stringResult.Replace("\\n", "");
// BookTitleDTO b = new BookTitleDTO();
//b.data.id = int.Parse(bid);
//b.data.attributes.canonicalTitle = bt;

//Object.Add(stringResult);
//Object.Add(stringResult.Substring(1,stringResult.Length -2));
//Console.Write("\n" + rawBooks.GetType() + "\n");
//int i = rawBooks.Find(e => (rawBooks[2] == index));
