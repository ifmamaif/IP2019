using Newtonsoft.Json;
using StoryToRequests.Models;
using System.Collections.Generic;
using System.IO;

namespace StoryToRequests.Parsers
{
    public class RoomsParser
    {
        public List<Room> ParseRooms(string folderPath)
        {
            string[] filePaths = Directory.GetFiles(folderPath);
            var rooms = new List<Room>();

            foreach (var filePath in filePaths)
            {
                string json = File.ReadAllText(filePath);
                Room room = JsonConvert.DeserializeObject<Room>(json);
                rooms.Add(room);
            }

            return rooms;
        }
    }
}
