using System;
using StoryToRequests.Models;
using StoryToRequests.Requests;
using StoryToRequests.Parsers;
using System.Collections.Generic;

namespace StoryToRequests
{
    class Program
    {
        static void Main(string[] args)
        {
            IServerRequests serverRequests = new ServerRequests();
            StoriesParser storiesParser = new StoriesParser();
            RoomsParser roomsParser = new RoomsParser();

            try
            {
                // Login
                UserLogin userLogin = serverRequests.Login();

                // Clear content
                serverRequests.ClearContent(authenticationToken: userLogin.token);

                // Add stories
                IList<Story> stories = storiesParser.ParseStories();
                serverRequests.AddStories(stories: stories, authenticationToken: userLogin.token);

                // Add chapters and chapters linkings
                IList<Room> rooms = roomsParser.ParseRooms(folderPath: "Rooms");
                IList<Chapter> chapters = new List<Chapter>();
                IList<ChaptersLinking> chaptersLinkings = new List<ChaptersLinking>();
                int storyId = stories[0].id;

                foreach (var room in rooms)
                {
                    Chapter chapter = new Chapter();
                    chapter.id = room.RoomId;
                    chapter.setting = room.Content;
                    chapter.cover_path = @"/images/" + room.ImagePath;
                    chapter.character_path = @"/images/" + room.CharacterImagePath;
                    chapter.record_path = @"/audio/" + room.SoundPath;
                    chapter.story_id = storyId;
                    chapter.bias = room.Bias;

                    chapters.Add(chapter);

                    foreach (var edge in room.Edges)
                    {
                        ChaptersLinking chaptersLinking = new ChaptersLinking();
                        chaptersLinking.start_chapter_id = room.RoomId;
                        chaptersLinking.end_chapter_id = edge.Destination;
                        chaptersLinking.labels = edge.Labels;

                        chaptersLinkings.Add(chaptersLinking);
                    }
                }

                serverRequests.AddChapters(chapters: chapters, authenticationToken: userLogin.token);
                serverRequests.AddChaptersLinkings(chaptersLinkings: chaptersLinkings, authenticationToken: userLogin.token);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            Console.ReadKey();
        }
    }
}
