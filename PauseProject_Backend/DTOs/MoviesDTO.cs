using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PauseProject.DTOs
{
    public class MoviesDTO
    {
        [JsonProperty("id")]
        public int id { get; set; }

        [JsonProperty("backdrop_path")]
        public string img { get; set; }
        [JsonProperty("release_date")]
        public string release_date { get; set; }
        [JsonProperty("title")]
        public string title { get; set; }

       
    }
}
