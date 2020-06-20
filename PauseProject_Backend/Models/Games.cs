using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PauseProject.Models
{
    public class Games
    {
        public static List<Game> All = new List<Game>();
        public static string path = AppDomain.CurrentDomain.BaseDirectory + @"..\..\..\Data\recommendation-games.csv";
        public static Lazy<List<Game>> _games = new Lazy<List<Game>>(() => LoadGameData(path));

        public Games()
        {

        }
        /// <summary>
        /// Get a single movie.`
        /// </summary>
        /// <param name="id">The identifier of the movie to get.</param>
        /// <returns>The Movie instance corresponding to the specified identifier.</returns>   
        /// 
        public static Game Get(int id)
        {
            return _games.Value.Single(m => m.ID == id);
        }
        public static List<Game> LoadGameData(String moviesdatasetpath)
        {
            var result = new List<Game>();
            Stream fileReader = File.OpenRead(moviesdatasetpath);
            StreamReader reader = new StreamReader(fileReader);
            try
            {
                bool header = true;
                int index = 0;
                var line = "";
                while (!reader.EndOfStream)
                {
                    if (header)
                    {
                        line = reader.ReadLine();
                        header = false;
                    }
                    line = reader.ReadLine();
                    string[] fields = line.Split(',');
                    int gameID = Int32.Parse(fields[0].ToString().TrimStart(new char[] { '0' }));
                    string gameTitle = fields[1].ToString();
                    result.Add(new Game() { ID = gameID, Title = gameTitle });
                    index++;
                }
            }
            finally
            {
                if (reader != null)
                {
                    reader.Dispose();
                }
            }

            return result;
        }
    }
}
