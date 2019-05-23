using Newtonsoft.Json;
using StoryToRequests.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

namespace StoryToRequests.Requests
{
    public class ServerDefaults
    {
        public static string ServerUrl = @"http://ec2-18-220-99-193.us-east-2.compute.amazonaws.com:9190";
        public static string LoginRoute = @"/tfm_login";
        public static string ClearContentRoute = @"/tfm_clear_content";
        public static string AddStoriesRoute = @"/tfm_add_stories";
        public static string AddChaptersRoute = @"/tfm_add_chapters";
        public static string AddChaptersLinkingsRoute = @"/tfm_add_chapters_linkings";

        public static string AdminUserName = "tfm_content_admin";
        public static string AdminPassword = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
    }

    public interface IServerRequests
    {
        UserLogin Login();
        void ClearContent(string authenticationToken);
        void AddStories(IList<Story> stories, string authenticationToken);
        void AddChapters(IList<Chapter> chapters, string authenticationToken);
        void AddChaptersLinkings(IList<ChaptersLinking> chaptersLinkings, string authenticationToken);
    }

    public class ServerRequests : IServerRequests
    {
        public UserLogin Login()
        {
            var request = (HttpWebRequest)WebRequest.Create(ServerDefaults.ServerUrl + ServerDefaults.LoginRoute);
            request.ContentType = "application/json";
            request.Method = "POST";

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                var json = JsonConvert.SerializeObject(new
                {
                    user_name = ServerDefaults.AdminUserName,
                    password = ServerDefaults.AdminPassword
                });

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var response = (HttpWebResponse)request.GetResponse();
            UserLogin loginResponse = null;

            using (var streamReader = new StreamReader(response.GetResponseStream()))
            {
                var data = streamReader.ReadToEnd();
                loginResponse = JsonConvert.DeserializeObject<UserLogin>(data);
            }

            Console.WriteLine("Login ended with: " + response.StatusCode);
            return loginResponse;
        }

        public void ClearContent(string authenticationToken)
        {
            var request = (HttpWebRequest)WebRequest.Create(ServerDefaults.ServerUrl + ServerDefaults.ClearContentRoute);
            request.ContentType = "application/json";
            request.Method = "DELETE";
            request.Headers["TFMAuthentication"] = authenticationToken;

            var response = (HttpWebResponse)request.GetResponse();
            Console.WriteLine("Clear content ended with: " + response.StatusCode);
        }

        public void AddStories(IList<Story> stories, string authenticationToken)
        {
            var request = (HttpWebRequest)WebRequest.Create(ServerDefaults.ServerUrl + ServerDefaults.AddStoriesRoute);
            request.ContentType = "application/json";
            request.Method = "POST";
            request.Headers["TFMAuthentication"] = authenticationToken;

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                var json = JsonConvert.SerializeObject(new
                {
                    stories = stories
                });

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var response = (HttpWebResponse)request.GetResponse();
            Console.WriteLine("Add stories ended with: " + response.StatusCode);
        }

        public void AddChapters(IList<Chapter> chapters, string authenticationToken)
        {
            var request = (HttpWebRequest)WebRequest.Create(ServerDefaults.ServerUrl + ServerDefaults.AddChaptersRoute);
            request.ContentType = "application/json";
            request.Method = "POST";
            request.Headers["TFMAuthentication"] = authenticationToken;

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                var json = JsonConvert.SerializeObject(new
                {
                    chapters = chapters
                });

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var response = (HttpWebResponse)request.GetResponse();
            Console.WriteLine("Add chapters ended with: " + response.StatusCode);
        }

        public void AddChaptersLinkings(IList<ChaptersLinking> chaptersLinkings, string authenticationToken)
        {
            var request = (HttpWebRequest)WebRequest.Create(ServerDefaults.ServerUrl + ServerDefaults.AddChaptersLinkingsRoute);
            request.ContentType = "application/json";
            request.Method = "POST";
            request.Headers["TFMAuthentication"] = authenticationToken;

            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                var json = JsonConvert.SerializeObject(new
                {
                    chapters_linkings = chaptersLinkings
                });

                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var response = (HttpWebResponse)request.GetResponse();
            Console.WriteLine("Add chapters linkings ended with: " + response.StatusCode);
        }
    }
}
