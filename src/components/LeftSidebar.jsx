import React, { useState, useEffect } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import './LeftSidebar.css';

function LeftSidebar({
  filters = { categories: [], tags: [], yearRange: [2000, 2023], rating: 0 },
  onFilterChange
}) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const categoryMap = {
    'Action': 'action',
    'Adventure': 'adventure',
    'RPG': 'role-playing-games-rpg',
    'Strategy': 'strategy',
    'Simulation': 'simulation',
    'Sports': 'sports',
    'Puzzle': 'puzzle',
    'Racing': 'racing',
    'Fighting': 'fighting'
  };

  const tagMap = {
    'Singleplayer': 'singleplayer',
    'Multiplayer': 'multiplayer',
    'Open World': 'open-world',
    'First-Person': 'first-person',
    'Third-Person': 'third-person',
    'Sci-Fi': 'science-fiction',
    'Fantasy': 'fantasy',
    'Horror': 'horror',
    'Shooter': 'shooter'
  };

  const categories = Object.keys(categoryMap);
  const tags = Object.keys(tagMap);

  const handleCategoryChange = (category) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    setLocalFilters(prev => ({ ...prev, categories: newCategories }));
  };

  const handleTagChange = (tag) => {
    const newTags = localFilters.tags.includes(tag)
      ? localFilters.tags.filter(t => t !== tag)
      : [...localFilters.tags, tag];
    setLocalFilters(prev => ({ ...prev, tags: newTags }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    setIsSidebarOpen(false);
  };

  const resetFilters = () => {
    const reset = {
      categories: [],
      tags: [],
      yearRange: [2000, 2023],
      rating: 0
    };
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  return (
    <>
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Close' : 'Filters'}
      </button>
      
      <div className={`left-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-content">
          <h4 className="filter-heading">Filters</h4>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Categories</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {categories.map(category => (
                    <Form.Check
                      key={category}
                      type="checkbox"
                      id={`category-${category}`}
                      label={category}
                      onChange={() => handleCategoryChange(category)}
                      checked={localFilters.categories.includes(category) || false}
                      className="mb-2"
                    />
                  ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
              <Accordion.Header>Tags</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {tags.map(tag => (
                    <Form.Check
                      key={tag}
                      type="checkbox"
                      id={`tag-${tag}`}
                      label={tag}
                      onChange={() => handleTagChange(tag)}
                      checked={localFilters.tags.includes(tag) || false}
                      className="mb-2"
                    />
                  ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="2">
              <Accordion.Header>Release Year</Accordion.Header>
              <Accordion.Body>
                <Form.Label>
                  From {localFilters.yearRange[0]} to {localFilters.yearRange[1]}
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="number"
                    min="1980"
                    max={localFilters.yearRange[1]}
                    value={localFilters.yearRange[0]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        setLocalFilters(prev => ({
                          ...prev,
                          yearRange: [value, prev.yearRange[1]]
                        }));
                      }
                    }}
                  />
                  <Form.Control
                    type="number"
                    min={localFilters.yearRange[0]}
                    max="2023"
                    value={localFilters.yearRange[1]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        setLocalFilters(prev => ({
                          ...prev,
                          yearRange: [prev.yearRange[0], value]
                        }));
                      }
                    }}
                  />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="3">
              <Accordion.Header>Rating</Accordion.Header>
              <Accordion.Body>
                <Form.Label>Minimum Rating: {localFilters.rating}/5</Form.Label>
                <Form.Range
                  min="0"
                  max="5"
                  step="0.5"
                  value={localFilters.rating}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setLocalFilters(prev => ({
                      ...prev,
                      rating: value
                    }));
                  }}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        
        <div className="filter-actions">
          <Button variant="primary" className="w-100 mb-2" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline-secondary" className="w-100" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}

export default LeftSidebar;