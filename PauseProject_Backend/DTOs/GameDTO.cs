using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PauseProject.DTOs
{
    public class GameDTO
    {
        public int Count { get; set; }
        public int page { get; set; }
        public List<Result> Results { get; set; }
    }

    public class Result
    {
        [JsonProperty("id")]
        public int gameId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        public DateTime Released { get; set; }
        [JsonProperty("background_image")]
        public string background_image { get; set; }
        [JsonProperty("rating")]
        public float Rating { get; set; }
        public int PlayTime { get; set; }
        [JsonProperty("platforms")]
        public List<Platforms> Platforms { get; set; }
        public List<Genre> Genres { get; set; }
        public List<Tag> Tags { get; set; }
       
    }

    public class Tag
    {
        public string Name { get; set; }
    }

    public class Genre
    {
        public string Name { get; set; }
    }

    public class Platforms
    {
        public Platform Platform { get; set; }
    }

    public class Platform
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
