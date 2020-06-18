using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Microsoft.ML.Data;

namespace PauseProject.DTOs
{
    [FirestoreData]
    public class GameStarFSDTO
    {
        
        [FirestoreProperty]
        [LoadColumn(0)]
        public string userID { get; set; }

        [FirestoreProperty]
        [LoadColumn(1)]
        public int collectionID { get; set; }
        //this was int
        [FirestoreProperty]
        [LoadColumn(2)]
        public float value { get; set; }
    }
}
