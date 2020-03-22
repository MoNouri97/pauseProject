using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace PauseProject.DTOs
{
    public class BooksDTO
    {
        [JsonProperty("data")]
        public Data data { get; set;}

       

    }

    public class Data
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("attributes")]
        public Attributes attributes { set; get; }

      //  [JsonProperty("relationships")]
      //  public Relationships relationships { set; get; }
    }

    public class Attributes
    {
        [JsonProperty("canonicalTitle")]
        public string canonicalTitle { set; get; }

        [JsonProperty("averageRating")]

        public string averageRating { set; get; }

        [JsonProperty("posterImage")]
        public Image img { set; get; }
    }

    public class Relationships
    {

    }
   public class Image
    {
        [JsonProperty("small")]
        public string small { set; get; }
        [JsonProperty("medium")]
        public string medium { set; get; }
        [JsonProperty("large")]
        public string large { set; get; }

    }
}
