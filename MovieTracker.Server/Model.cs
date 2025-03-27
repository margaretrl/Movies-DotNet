using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

public class Movie
{
    public int MovieId { get; set; }
    public string Title { get; set; }
    public string Overview { get; set; }
    public string PosterPath { get; set; } 
    public int Rating { get; set; }
    public string? Review { get; set; }

}