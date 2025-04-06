import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner, Alert, Badge, Carousel, Row, Col, Button } from 'react-bootstrap';
import { FaStar, FaHeart, FaShoppingCart, FaDesktop, FaMemory, FaGamepad, FaWindows, FaApple, FaLinux, FaPlaystation, FaXbox } from 'react-icons/fa';
import './GameDetail.css';

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  const API_KEY = '5c6d7973715c4594ac3e60b947ea7bbc';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGameDetails();
    fetchGameScreenshots();
  }, [id]);

  const fetchGameDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setGame(data);
    } catch (err) {
      console.error('Error fetching game details:', err);
      setError('Failed to load game details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGameScreenshots = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`);
      if (response.ok) {
        const data = await response.json();
        setScreenshots(data.results || []);
      }
    } catch (err) {
      console.error('Error fetching screenshots:', err);
    }
  };

  const getPlatformIcons = (platforms) => {
    if (!platforms) return null;
    
    const icons = {
      pc: <FaWindows className="platform-icon" title="Windows" key="windows" />,
      mac: <FaApple className="platform-icon" title="macOS" key="mac" />,
      linux: <FaLinux className="platform-icon" title="Linux" key="linux" />,
      playstation: <FaPlaystation className="platform-icon" title="PlayStation" key="playstation" />,
      xbox: <FaXbox className="platform-icon" title="Xbox" key="xbox" />
    };

    return platforms.map(platform => {
      const name = platform.platform.slug;
      for (const key in icons) {
        if (name.includes(key)) return icons[key];
      }
      return null;
    }).filter(Boolean);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getGenreBadges = (genres) => {
    if (!genres || !genres.length) return 'N/A';
    return genres.map(genre => (
      <Badge bg="secondary" className="genre-badge" key={genre.id}>
        {genre.name}
      </Badge>
    ));
  };
  const mockPrice = () => {
    if (!game) return null;
    if (game.added > 5000) return '$59.99';
    if (game.added > 2000) return '$39.99';
    if (game.added > 1000) return '$19.99';
    return '$9.99';
  };

  const mockSystemRequirements = () => {
    return {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-2500K / AMD FX-6300',
        memory: '8 GB RAM',
        graphics: 'Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB',
        storage: '50 GB available space'
      },
      recommended: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
        memory: '16 GB RAM',
        graphics: 'Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
        storage: '50 GB available space'
      }
    };
  };

  if (loading) {
    return (
      <div className="game-detail loading-container">
        <Spinner animation="border" variant="light" />
        <p className="loading-text">Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-detail">
        <Alert variant="danger">{error}</Alert>
        <Link to="/" className="btn btn-primary back-button">
          Back to Games
        </Link>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="game-detail">
        <Alert variant="warning">Game not found</Alert>
        <Link to="/" className="btn btn-primary back-button">
          Back to Games
        </Link>
      </div>
    );
  }

  const systemRequirements = mockSystemRequirements();

  return (
    <div className="game-detail">
      {}
      <div className="game-hero" style={{ backgroundImage: `url(${game.background_image})` }}>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="game-title">{game.name}</h1>
              <div className="game-meta">
                <div className="platform-icons">
                  {getPlatformIcons(game.platforms)}
                </div>
                <div className="release-date">
                  Released: {formatDate(game.released)}
                </div>
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{game.rating}/5</span> ({game.ratings_count} ratings)
                </div>
              </div>
              <div className="game-genres">
                {getGenreBadges(game.genres)}
              </div>
              <div className="hero-buttons">
                <Button variant="primary" className="buy-button">
                  <FaShoppingCart /> Buy Now: {mockPrice()}
                </Button>
                <Button variant="primary" className="wishlist-button">
                  <FaHeart /> Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="container game-content">
        <div className="game-tabs">
          <Button 
            variant={activeTab === 'about' ? 'primary' : 'dark'}
            onClick={() => setActiveTab('about')}
            className="tab-button"
          >
            About
          </Button>
          <Button 
            variant={activeTab === 'screenshots' ? 'primary' : 'dark'}
            onClick={() => setActiveTab('screenshots')}
            className="tab-button"
          >
            Screenshots
          </Button>
          <Button 
            variant={activeTab === 'system' ? 'primary' : 'dark'}
            onClick={() => setActiveTab('system')}
            className="tab-button"
          >
            System Requirements
          </Button>
        </div>

        <div className="tab-content">
          {activeTab === 'about' && (
            <div className="about-content">
              <h2>About the Game</h2>
              <div className="game-description" dangerouslySetInnerHTML={{ __html: game.description }}></div>
              
              <div className="game-details">
                <Row>
                  <Col md={6}>
                    <div className="detail-card">
                      <h3>Game Details</h3>
                      <ul className="detail-list">
                        <li><strong>Developer:</strong> {game.developers?.map(dev => dev.name).join(', ') || 'Unknown'}</li>
                        <li><strong>Publisher:</strong> {game.publishers?.map(pub => pub.name).join(', ') || 'Unknown'}</li>
                        <li><strong>Release Date:</strong> {formatDate(game.released)}</li>
                        <li><strong>Metacritic Score:</strong> {game.metacritic || 'N/A'}</li>
                        <li><strong>ESRB Rating:</strong> {game.esrb_rating?.name || 'Not Rated'}</li>
                        <li><strong>Platforms:</strong> {game.platforms?.map(p => p.platform.name).join(', ') || 'Unknown'}</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-card">
                      <h3>Price &amp; Purchase</h3>
                      <div className="price-section">
                        <div className="price-tag">{mockPrice()}</div>
                        <div className="price-buttons">
                          <Button variant="success" className="buy-button-full">
                            <FaShoppingCart /> Buy Now
                          </Button>
                          <Button variant="outline-secondary" className="wishlist-button-full">
                            <FaHeart /> Add to Wishlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}

          {activeTab === 'screenshots' && (
            <div className="screenshots-content">
              <h2>Screenshots</h2>
              {screenshots.length > 0 ? (
                <Carousel className="screenshots-carousel">
                  {screenshots.map(screenshot => (
                    <Carousel.Item key={screenshot.id}>
                      <img
                        className="d-block w-100"
                        src={screenshot.image}
                        alt={`Screenshot of ${game.name}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p>No screenshots available for this game.</p>
              )}
            </div>
          )}

          {activeTab === 'system' && (
            <div className="system-content">
              <h2>System Requirements</h2>
              <div className="requirements-section">
                <Row>
                  <Col md={6}>
                    <div className="requirements-card minimum">
                      <h3>Minimum Requirements</h3>
                      <ul className="requirements-list">
                        <li><FaWindows /> <strong>OS:</strong> {systemRequirements.minimum.os}</li>
                        <li><FaDesktop /> <strong>Processor:</strong> {systemRequirements.minimum.processor}</li>
                        <li><FaMemory /> <strong>Memory:</strong> {systemRequirements.minimum.memory}</li>
                        <li><FaGamepad /> <strong>Graphics:</strong> {systemRequirements.minimum.graphics}</li>
                        <li><FaMemory /> <strong>Storage:</strong> {systemRequirements.minimum.storage}</li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="requirements-card recommended">
                      <h3>Recommended Requirements</h3>
                      <ul className="requirements-list">
                        <li><FaWindows /> <strong>OS:</strong> {systemRequirements.recommended.os}</li>
                        <li><FaDesktop /> <strong>Processor:</strong> {systemRequirements.recommended.processor}</li>
                        <li><FaMemory /> <strong>Memory:</strong> {systemRequirements.recommended.memory}</li>
                        <li><FaGamepad /> <strong>Graphics:</strong> {systemRequirements.recommended.graphics}</li>
                        <li><FaMemory /> <strong>Storage:</strong> {systemRequirements.recommended.storage}</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetail;