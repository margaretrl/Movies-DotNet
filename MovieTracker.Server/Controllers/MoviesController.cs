using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieTracker.Server.Data;

namespace MovieTracker.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly Context _context;

        public MoviesController(Context context)
        {
            _context = context;
        }

        // GET: api/movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            var movies = await _context.Movies.ToListAsync();
            return Ok(movies); // Wrap the result in Ok()
        }

        // GET: api/movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie); // Wrap single movie result in Ok()
        }

        ////POST: api/movies
        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovie(Movie movie)
        {
            // Assign a unique ID
            movie.MovieId = _context.Movies.Count() > 0 ? _context.Movies.Max(x => x.MovieId) + 1 : 0;

            // provide default values if not included
            movie.Title = movie.Title ?? "New Movie";
            movie.Overview = movie.Overview ?? "No overview";
            movie.PosterPath = movie.PosterPath ?? "https://media.istockphoto.com/id/995815438/vector/movie-and-film-modern-retro-vintage-poster-background.jpg?s=612x612&w=0&k=20&c=UvRsJaKcp0EKIuqDKp6S7Dwhltt0D5rbegPkS-B8nDQ=";
            movie.Rating = movie.Rating > 0 ? movie.Rating : 3;
            movie.Review = movie.Review ?? "No review";

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovie), new { id = movie.MovieId }, movie);
        }

        // PUT: api/movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, Movie updatedMovie)
        {
            // Find the existing movie by ID
            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.MovieId == id);
            if (movie == null)
            {
                return NotFound(); // Return 404 if the movie doesn't exist
            }

            // Update only the fields that are provided
            movie.Title = !string.IsNullOrWhiteSpace(updatedMovie.Title) ? updatedMovie.Title : movie.Title;
            movie.Overview = !string.IsNullOrWhiteSpace(updatedMovie.Overview) ? updatedMovie.Overview : movie.Overview;
            movie.PosterPath = !string.IsNullOrWhiteSpace(updatedMovie.PosterPath) ? updatedMovie.PosterPath : movie.PosterPath;
            movie.Rating = updatedMovie.Rating > 0 ? updatedMovie.Rating : movie.Rating;
            movie.Review = !string.IsNullOrWhiteSpace(updatedMovie.Review) ? updatedMovie.Review : movie.Review;

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return the updated movie as JSON
            return Ok(movie);
        }

        // DELETE: api/movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.MovieId == id);
        }
    }
}
