import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';
import GameCard from './GameCard';
import './GameGrid.css';

function GameGrid({ filters, searchTerm }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('Popular Games');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [totalGames, setTotalGames] = useState(0);

  const categoryMap = {
    'Action': 'action', 'Adventure': 'adventure', 'RPG': 'role-playing-games-rpg',
    'Strategy': 'strategy', 'Simulation': 'simulation', 'Sports': 'sports',
    'Puzzle': 'puzzle', 'Racing': 'racing', 'Fighting': 'fighting'
  };

  const tagMap = {
    'Singleplayer': 'singleplayer', 'Multiplayer': 'multiplayer', 'Open World': 'open-world',
    'First-Person': 'first-person', 'Third-Person': 'third-person', 'Sci-Fi': 'science-fiction',
    'Fantasy': 'fantasy', 'Horror': 'horror', 'Shooter': 'shooter'
  };

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const API_KEY = '5c6d7973715c4594ac3e60b947ea7bbc';

      let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12&page=${page}`;

      if (searchTerm && searchTerm.trim() !== '') {
        url += `&search=${encodeURIComponent(searchTerm.trim())}`;
        setTitle(`Search Results for "${searchTerm}"`);
      } else {
        setTitle('Popular Games');
      }

      if (filters.categories.length > 0) {
        const genreSlugs = filters.categories.map(cat => categoryMap[cat]).filter(Boolean);
        if (genreSlugs.length > 0) url += `&genres=${genreSlugs.join(',')}`;
      }

      if (filters.tags.length > 0) {
        const tagSlugs = filters.tags.map(tag => tagMap[tag]).filter(Boolean);
        if (tagSlugs.length > 0) url += `&tags=${tagSlugs.join(',')}`;
      }

      const [startYear, endYear] = filters.yearRange || [2000, 2023];
      url += `&dates=${startYear}-01-01,${endYear}-12-31`;

      if (filters.rating > 0) {
        url += `&metacritic=${Math.floor(filters.rating * 20)},100`;
      }

      url += '&ordering=-rating';

      const response = await fetch(url);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();

      setGames(data.results || []);
      setTotalGames(data.count || 0);
      setHasNextPage(!!data.next);

    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to fetch games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page to 1 on filters/search change
  }, [searchTerm, filters]);

  useEffect(() => {
    fetchGames();
  }, [page, searchTerm, filters]);

  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="game-grid">
      <div className="game-grid-header">
        <h2 className="section-title">{title}</h2>
        {!loading && !error && totalGames > 0 && (
          <div className="games-count">
            <span>{totalGames.toLocaleString()} games found</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="loader-container">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && games.length === 0 && (
        <Alert variant="info">No games found matching your criteria.</Alert>
      )}

      {!loading && !error && games.length > 0 && (
        <>
          <div className="games-container">
            {games.map(game => (
              <div key={game.id} className="game-card-wrapper">
                <GameCard game={game} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <Button 
              variant="secondary" 
              onClick={handlePrev} 
              disabled={page === 1}
              className="pagination-button"
            >
              Previous
            </Button>
            <div className="pagination-info">
              <span>Page {page} of {Math.ceil(totalGames / 12)}</span>
              <div className="pagination-range">
                Showing {((page - 1) * 12) + 1}-{Math.min(page * 12, totalGames)} of {totalGames.toLocaleString()}
              </div>
            </div>
            <Button 
              variant="secondary" 
              onClick={handleNext} 
              disabled={!hasNextPage}
              className="pagination-button"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GameGrid;