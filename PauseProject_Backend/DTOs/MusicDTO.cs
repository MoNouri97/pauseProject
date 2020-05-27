using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PauseProject.DTOs
{
    public class MusicDTO
    {
        [JsonProperty("id")]
        public int MusicID { get; set; }
        [JsonProperty("title")]
        public string title { get; set; }
        [JsonProperty("release_date")]
        public string release_date { get; set; }
        public int Duration { get; set; }
        public Artist Artist { get; set; }
        public Album Album { get; set; }
        public string type { set; get; }
    }

    public class Album
    {
        [JsonProperty("id")]
        public int id { get; set; }
        public string title { get; set; }
        public string cover { get; set; }
    }

    public class Artist
    {
        [JsonProperty("id")]
        public int id { get; set; }
        public string name { get; set; }
        public string picture { get; set; }

    }
}
