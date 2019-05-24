using System;
using System.Collections.Generic;
using System.Text;

namespace CreateJson
{
    class Room
    {
        public int RoomId;
        public string Content;
        public string ImagePath;
        public string SoundPath;
        public string Bias;
        public string Title;
        public Edge[] Edges;

        
        public Room()
        {
            ImagePath = String.Empty;
            SoundPath = String.Empty;
            Bias = String.Empty;
            Content = String.Empty;
        }
        public Room(string title, Edge[] edges, string bias = "") : base()
        {
            Title = title;
            Bias = bias;
            Edges = edges;
            
        }


    }
}
