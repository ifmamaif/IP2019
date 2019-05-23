using System.Collections.Generic;
using StoryToRequests.Models;

namespace StoryToRequests.Parsers
{
    class StoriesParser
    {
        public List<Story> ParseStories()
        {
            var stories = new List<Story>();

            Story story = new Story();
            story.id = 1;
            story.title = "Beggars Can't Be Choosers";
            story.cover_path = "images/beggarsNoChoosers.jpg";
            story.start_chapter_id = 1;

            stories.Add(story);
            return stories;
        }
    }
}
