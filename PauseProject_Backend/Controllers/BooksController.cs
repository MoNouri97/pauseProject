using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
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
        private static Semaphore _pool;
        private static int _padding;

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
        [HttpGet("old/{id}", Name = "GetBooksold")]
        public async Task<IActionResult> Get(int id)
        {
            _pool = new Semaphore(0, 1);
            using (var client = new HttpClient())

            {

                client.BaseAddress = new Uri("https://kitsu.io");
                List<Object> Objects = new List<Object>();
                List<Object> Object = new List<Object>();
                int i = (id - 1) * 20;
                int j = 0;

                while (j < 20)
                {

                    var handle = new EventWaitHandle(false, EventResetMode.ManualReset);


                    var thread = new Thread(async () =>
                    {
                        try
                        {
                            Object = Object.Distinct().ToList();
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e);
                        }

                        try
                        {
                            var response = await client.GetAsync("/api/edge/manga/" + i);
                            if (response.IsSuccessStatusCode)
                            {
                                var stringResult = await response.Content.ReadAsStringAsync();
                                var rawBook = JsonConvert.DeserializeObject<BooksDTO>(stringResult);
                                List<Object> Obj = new List<Object>();
                                Obj.Add(new { rawBook.data });

                                if (Object.Contains(Obj) == false)
                                {
                                    //_pool.WaitOne();
                                    Object.Add(Obj);
                                    j++;
                                    // _pool.Release();
                                }
                                else
                                {
                                    Console.WriteLine("yes it does contain");
                                    Object = Objects.Distinct().ToList();
                                }
                                Console.WriteLine("Thread{0} exits and it contains {0} elements", i, Object.Count());


                            }

                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e.Message);
                        }
                        handle.Set();
                    });


                    thread.Start();
                    i++;

                }



                Console.WriteLine("Main thread exits " + Object.Count());
                Object = Object.Distinct().ToList();
                Console.WriteLine("Main  2 " + Object.Count());

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
                return Ok(Object.Distinct().ToList());
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
        List<Object> ObjectTest = new List<Object>();

        [HttpGet("test", Name = "Test")]
        public async Task<IActionResult> Mainy()
        {

            // Create a semaphore that can satisfy up to three
            // concurrent requests. Use an initial count of zero,
            // so that the entire semaphore count is initially
            // owned by the main program thread.
            //
            _pool = new Semaphore(0, 1);
            _pool.Release(1);
            // Create and start five numbered threads. 
            //
            int i = 1;
            while (i < 6)
            {
                Thread t = new Thread(new ParameterizedThreadStart(Worker));

                // Start the thread, passing the number.
                //
                t.Start(i);
                i++;
            }
            Console.WriteLine(ObjectTest.Count());


            // Wait for half a second, to allow all the
            // threads to start and to block on the semaphore.
            //
            Thread.Sleep(1500);

            // The main thread starts out holding the entire
            // semaphore count. Calling Release(3) brings the 
            // semaphore count back to its maximum value, and
            // allows the waiting threads to enter the semaphore,
            // up to three at a time.
            //
            Console.WriteLine("Main thread calls Release(1).");

            Console.WriteLine("Main thread exits.");
            Console.WriteLine(ObjectTest.Count());
            return Ok(ObjectTest);
        }

        private void Worker(object num)
        {


            // Each worker thread begins by requesting the
            // semaphore.
            Console.WriteLine("Thread {0} begins " +
                "and waits for the semaphore.", num);
            _pool.WaitOne();

            // A padding interval to make the output more orderly.
            int padding = Interlocked.Add(ref _padding, 100);

            Console.WriteLine("Thread {0} enters the semaphore.", num);
            String T = " I am element " + num + "\n";
            ObjectTest.Add(T);
            // The thread's "work" consists of sleeping for 
            // about a second. Each thread "works" a little 
            // longer, just to make the output more orderly.
            //
            Thread.Sleep(1000 + padding);

            Console.WriteLine("Thread {0} releases the semaphore.", num);
            Console.WriteLine("Thread {0} previous semaphore count: {1}",
                num, _pool.Release());
        }

        [HttpGet("{id}", Name = "GetBooks")]

        public async Task<IEnumerable<BooksDTO>> GetBookssInParallelInWithBatches(int id)
        {
            var tasks = new List<Task<BooksDTO>>();
            int i;
            int j = (id - 1) * 20;
            for (i=j; i< j + 40; i++)
            {
                    tasks.Add(GetBooks(i));
            }

            // two loops are essentiel cuz one doesn't verify all , in fact we can have i and i+1 empty so it's safer to go with two loops , it doesn't take much time 
            for (i = 0; i < tasks.Count(); i++)
            {
                if (tasks[i].Result.data == null) // || tasks[i].Result.Equals(bookR))
                {
                    tasks.RemoveAt(i);
                    Console.WriteLine(i);
                }

            }
            for (i = 0; i < tasks.Count(); i++)
            {
                if (tasks[i].Result.data == null) // || tasks[i].Result.Equals(bookR))
                {
                    tasks.RemoveAt(i);
                    Console.WriteLine(i);
                }

            }
            
            //Console.WriteLine( "num is " + tasks.Count());
           
            Console.WriteLine("num is " + tasks.Count());
            if (tasks.Count() > 20)
                return (await Task.WhenAll(tasks)).ToList().GetRange(0, 20);
            else
                return (await Task.WhenAll(tasks)).ToList();
        }

        public async Task<BooksDTO> GetBooks(int ids)
        {
         
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://kitsu.io");
                var response = await client.GetAsync("/api/edge/manga/" + ids);
                if (response.IsSuccessStatusCode)
                {
                    string s = await response.Content.ReadAsStringAsync();  
                    var books = JsonConvert.DeserializeObject<BooksDTO>(s);
                    return books;
                }
              
                else
                {
                    BooksDTO book = new BooksDTO();
                    return book;
                }
                
            }
        }
    }
    
    
}
