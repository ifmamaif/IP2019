using System;
using Newtonsoft.Json;
using System.IO;
using System.Collections.Generic;

namespace CreateJson
{
    class Program
    {
        static void Main(string[] args)
        {
            
            if (!Directory.Exists("Rooms"))
            {
                Directory.CreateDirectory("Rooms");
            }

            do
            {
                Console.WriteLine("Do you want to create another room? Y/N");
                var answer = Console.ReadLine().ToLower();
                if (answer == "y")
                {
                    Console.Clear();
                    createRoomJson();
                }
                else
                {
                    break;
                }
            }
            while (true);
            
        }

        static int getUsableRoomId()
        {
            try
            {
                string[] filePaths = Directory.GetFiles("Rooms");
                return filePaths.Length;
            }
            catch(Exception ex)
            {
                return 0;
            }
            
        }
        static void createRoomJson()
        {
            var room = new Room();
            Console.WriteLine("Input Room Id");
            int roomId;
            int.TryParse(Console.ReadLine(), out roomId);
            room.RoomId = roomId;

            Console.WriteLine("Input room title");
            room.Title = Console.ReadLine();

            Console.WriteLine("Do you want bias? Y/N");
            var answer = Console.ReadLine().ToLower();
            if (answer == "y")
            {
                Console.WriteLine("Input room bias");
                room.Bias = Console.ReadLine();
            }

            Console.WriteLine("Do you want Content? Y/N");
            answer = Console.ReadLine().ToLower();
            if (answer == "y")
            {
                Console.WriteLine("Input room content");
                room.Content = Console.ReadLine();
            }

            var flag = true;
            var edges = new List<Edge>();
            do
            {
                
                Console.WriteLine("Do you want to add another Edge? Y/N");
                answer = Console.ReadLine().ToLower();
                if (answer == "y")
                {
                    var edge = new Edge();
                    Console.WriteLine("Input Destination RoomId");
                    if (!Int32.TryParse(Console.ReadLine(), out edge.Destination))
                    {
                        Console.WriteLine("You messed up! Going back to edge creation");
                        continue;
                    }

                    var labelsFlag = true;
                    var labels = new List<int>();
                    do
                    {
                        
                        Console.WriteLine("\tDo you want to add another Label for this Edge? Y/N");
                        answer = Console.ReadLine().ToLower();
                        if (answer == "y")
                        {
                            Console.WriteLine("\tInput Label Number");
                            int label;
                            if (!Int32.TryParse(Console.ReadLine(), out label))
                            {
                                Console.WriteLine("You messed up! Going back to label creation");
                                continue;
                            }

                            labels.Add(label);
                        }
                        else
                        {
                            edge.Labels = labels.ToArray();
                            labelsFlag = false;
                        }
                    }
                    while (labelsFlag);

                    edges.Add(edge);
                }
                else
                {
                    room.Edges = edges.ToArray();
                    break;
                }
                
            }
            while (flag);

            string output = JsonConvert.SerializeObject(room, Formatting.Indented);

            var fileName = String.Format("RoomID - {0} Title - {1}", room.RoomId, room.Title);
            var fullyQualifiedFileName = @"Rooms\" + fileName + ".json" ;
            File.WriteAllText(fullyQualifiedFileName, output);
            Console.WriteLine(String.Format("File {0} succesfully created", fileName));
        }
    }
}
