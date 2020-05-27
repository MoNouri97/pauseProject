using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace PauseProject.DTOs
{
    public class BookTitleDTO
    {
        [JsonProperty("data")]
        public DataT data { get; set; }

        
    }

   public class DataT
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("attributes")]
        public Attr attributes { set; get; }
        public string type { set; get; }
    }

    public class Attr
    {
        [JsonProperty("canonicalTitle")]
        public string canonicalTitle { set; get; }
    }
}
