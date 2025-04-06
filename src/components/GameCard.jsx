import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import './GameCard.css';

function GameCard({ game }) {
  const dispatch = useDispatch();
  const bookmarkedGames = useSelector(state => state.favorites.bookmarkedGames);
  const isBookmarked = bookmarkedGames.some(bookmarkedGame => bookmarkedGame.id === game.id);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    if (isBookmarked) {
      dispatch(removeFavorite(game.id));
    } else {
      dispatch(addFavorite(game));
    }
  };

  return (
    <Card className="game-card h-100">
      <Link to={`/game/${game.id}`} className="card-link">
        <div className="image-container">
          <Card.Img variant="top" src={game.background_image} alt={game.name} />
          <button 
            className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} 
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? "Remove from favorites" : "Add to favorites"}
          >
            <FaBookmark />
          </button>
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
          <div className="game-categories mb-2">
            {game.genres && game.genres.length > 0 ? (
              game.genres.slice(0, 3).map(genre => (
                <Badge key={genre.id} bg="primary" className="me-1">{genre.name}</Badge>
              ))
            ) : (
              <Badge bg="primary" className="me-1">Uncategorized</Badge>
            )}
          </div>
          <div className="game-tags">
            {game.tags && game.tags.length > 0 ? (
              game.tags.slice(0, 3).map(tag => (
                <Badge key={tag.id} bg="secondary" className="me-1">{tag.name}</Badge>
              ))
            ) : null}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default GameCard;