using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PauseProject.DTOs
{
    public class GameTitle
    {
        [JsonProperty("id")]
        public int gameId { get; set; }
        [JsonProperty("name")]
        public string name { get; set; }
        public string type { get; set; }

    }
}
