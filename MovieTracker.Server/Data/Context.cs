using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MovieTracker.Server.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(connectionString:
                "Server=localhost;Port=5432;User Id=postgres;Password=password;Database=movies;Include Error Detail=true;");
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Movie> Movies { get; set; }

        public static List<Movie> LoadData()
        {
            string jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "movies.json");

            if (!File.Exists(jsonFilePath))
            {
                Console.WriteLine("JSON file not found: " + jsonFilePath);
                return new List<Movie>();
            }

            // Load and deserialize JSON file
            string jsonString = File.ReadAllText(jsonFilePath);
            List<Movie> movieList = JsonSerializer.Deserialize<List<Movie>>(jsonString);

            // Assign unique MovieId for each movie
            if (movieList != null)
            {
                for (int i = 0; i < movieList.Count; i++)
                {
                    movieList[i].MovieId = i + 1;
                }
            }

            return movieList ?? new List<Movie>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .HasKey(m => m.MovieId); // Define MovieId as the primary key

            // Load movies from JSON and seed data
            List<Movie> movieList = LoadData();
            if (movieList != null && movieList.Count > 0)
            {
                modelBuilder.Entity<Movie>().HasData(movieList);
            }

            base.OnModelCreating(modelBuilder);
        }

    }

}
