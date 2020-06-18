using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using PauseProject.DTOs;
using System.IO;
using Newtonsoft.Json;
using ChoETL;
using Microsoft.ML;
using Microsoft.ML.Trainers;
using PauseProject.Models;

namespace PauseProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommenderController : ControllerBase
    {
        FirestoreDb database;
        
        [HttpGet]
        public async Task<GameStarFSDTO[]> Get()
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + @"pauseproject.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
            database = FirestoreDb.Create("pauseproject-349dd");
            var res = await GetCollection();
            string filepath = AppDomain.CurrentDomain.BaseDirectory;
            using (StreamWriter file = new System.IO.StreamWriter(filepath + @"\..\..\..\Data\users.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, res);
            }
            using (var r = new ChoJSONReader(filepath + @"\..\..\..\Data\users.json"))
            {
                using (var w = new ChoCSVWriter(filepath + @"\..\..\..\Data\" + "users.csv").WithFirstLineHeader())
                {
                    w.Write(r);
                }
            }
            return res;
        }

        // GET: api/Recommender/{id}
        [HttpGet("{id}", Name = "Get")]
        public async Task<List<int>> Get(string id)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + @"pauseproject.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
            database = FirestoreDb.Create("pauseproject-349dd");
            var res = await GetCollection(id);
            string filepath = AppDomain.CurrentDomain.BaseDirectory;
            using (StreamWriter file = new System.IO.StreamWriter(filepath + @"\..\..\..\Data\users.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, res);
            }
            using (var r = new ChoJSONReader(filepath + @"\..\..\..\Data\users.json"))
            {
                using (var w = new ChoCSVWriter(filepath + @"\..\..\..\Data\" + "users.csv").WithFirstLineHeader())
                {
                    w.Write(r);
                }
            }
            //start machine learning algorithm
            var mlContext = new MLContext();
            var trainingDataView = mlContext.Data.LoadFromTextFile<GameStarFSDTO>(filepath + @"..\..\..\Data\users.csv", hasHeader: true, separatorChar: ',');
            var testDataView = mlContext.Data.LoadFromTextFile<GameStarFSDTO>(filepath + @"..\..\..\Data\usersTest.csv", hasHeader: true, separatorChar: ',');

            var options = new MatrixFactorizationTrainer.Options
            {
                MatrixColumnIndexColumnName = "userIDEncoded",
                MatrixRowIndexColumnName = "collectionIDEncoded",
                LabelColumnName = "value",
                NumberOfIterations = 20,
                ApproximationRank = 100
            };

            var pipeline = mlContext.Transforms.Conversion.MapValueToKey(
                    inputColumnName: "userID",
                    outputColumnName: "userIDEncoded")
                .Append(mlContext.Transforms.Conversion.MapValueToKey(
                    inputColumnName: "collectionID",
                    outputColumnName: "collectionIDEncoded")
                .Append(mlContext.Recommendation().Trainers.MatrixFactorization(options)));

            var model = pipeline.Fit(trainingDataView);
            var predictions = model.Transform(testDataView);
            var metrics = mlContext.Regression.Evaluate(predictions, labelColumnName: "value", scoreColumnName: "Score");

            var predictionEngine = mlContext.Model.CreatePredictionEngine<GameStarFSDTO, GameRatingPrediction>(model);
            //predict specific game for a user
            /*
            var prediction = predictionEngine.Predict(
                new GameStarFSDTO()
                {
                    userID = "Xa5hyfP8HjaX9kbsLTnckuQfuaI3",
                    collectionID = 4200  
                }
            );
            Console.WriteLine($"  Score: {prediction.Score}");
            Console.WriteLine();
            */
            Games.LoadGameData(filepath + @"..\..\..\Data\recommendation-games.csv");
            //Console.WriteLine(Games._games.Value.Count);

            var top5 = (from m in Games._games.Value
                        let p = predictionEngine.Predict(
                           new GameStarFSDTO()
                           {
                               userID = id,
                               collectionID = m.ID
                           })
                        orderby p.Score descending
                        select (collectionID: m.ID, p.Score)).Take(10);
            List<int> gamesRecommended = new List<int>();
            foreach (var t in top5)
                gamesRecommended.Add((int)Games.Get(t.collectionID)?.ID);
                //Console.WriteLine($"  Score:{t.Score}\tMovie: {Games.Get(t.collectionID)?.ID}");
            
            return gamesRecommended;
        }

        async Task<string> GetDocString(string ID)
        {
            string result = "";
            DocumentReference docref = database.Collection("gameStars").Document(ID);
            DocumentSnapshot snap = await docref.GetSnapshotAsync();
            if (snap.Exists)
            {
                Dictionary<string, object> user = snap.ToDictionary();
                foreach (var item in user)
                {
                    result += string.Format("{0}: {1}\n", item.Key, item.Value);
                }
            }
            return result;
        }

        async Task<GameStarFSDTO> GetDocDTO(string ID)
        {
            DocumentReference docref = database.Collection("gameStars").Document(ID);
            DocumentSnapshot snap = await docref.GetSnapshotAsync();
            GameStarFSDTO gameStar = null;
            if (snap.Exists)
            {
                gameStar = snap.ConvertTo<GameStarFSDTO>();
            }
            return gameStar;
        }

        async Task<GameStarFSDTO[]> GetCollection()
        {
            List<GameStarFSDTO> gameStar = new List<GameStarFSDTO>();
            Query Qref = database.Collection("gameStars"); // whereEqualsTo
            QuerySnapshot snap = await Qref.GetSnapshotAsync();
            foreach (DocumentSnapshot item in snap)
            {
                gameStar.Add(item.ConvertTo<GameStarFSDTO>());
            }
            return gameStar.ToArray();
        }

        async Task<GameStarFSDTO[]> GetCollection(string ID)
        {
            List<GameStarFSDTO> gameStar = new List<GameStarFSDTO>();
            Query Qref = database.Collection("gameStars").WhereEqualTo("userID", ID);
            QuerySnapshot snap = await Qref.GetSnapshotAsync();
            foreach (DocumentSnapshot item in snap)
            {
                gameStar.Add(item.ConvertTo<GameStarFSDTO>());
            }
            return gameStar.ToArray();
        }

    }
}
