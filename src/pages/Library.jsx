import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/favoritesSlice';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './Library.css';

function Library() {
  const { user } = useUser();
  const dispatch = useDispatch();
  
  // Get bookmarked games from Redux store
  const bookmarkedGames = useSelector(state => state.favorites.bookmarkedGames);
  
  const handleRemoveFavorite = (gameId) => {
    dispatch(removeFavorite(gameId));
  };

  return (
    <div className="library-container">
      <h1>Your Game Library</h1>
      <p>Welcome back, {user?.firstName || 'User'}! Here are your bookmarked games:</p>
      
      {bookmarkedGames.length === 0 ? (
        <div className="empty-library">
          <p>You haven't bookmarked any games yet.</p>
          <p>Explore games and click the bookmark icon to add them to your library!</p>
        </div>
      ) : (
        <div className="bookmarked-games-grid">
          {bookmarkedGames.map(game => (
            <Card key={game.id} className="game-card h-100">
              <Link to={`/game/${game.id}`} className="card-link">
                <div className="image-container">
                  <Card.Img variant="top" src={game.background_image} alt={game.name} />
                </div>
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <div className="game-meta mb-2">
                    <span className="rating">
                      <FaStar className="star-icon" /> {game.rating || 'N/A'}
                    </span>
                    {game.metacritic && (
                      <span className={`metacritic metacritic-${Math.floor(game.metacritic / 10)}`}>
                        {game.metacritic}
                      </span>
                    )}
                    <span className="release-date">{game.released || 'TBA'}</span>
                  </div>
                </Card.Body>
              </Link>
              <Button 
                variant="danger" 
                className="remove-bookmark-btn"
                onClick={() => handleRemoveFavorite(game.id)}
              >
                Remove from Library
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;