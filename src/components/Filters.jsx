import React from "react";
import { Card, Form } from "react-bootstrap";

const Filters = () => {
  return (
    <Card className="p-3">
      <h5>Filter Games</h5>
      
      {/* Category Filter */}
      <Form.Group className="mt-2">
        <Form.Label>Category</Form.Label>
        <Form.Select>
          <option>All</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>RPG</option>
        </Form.Select>
      </Form.Group>

      {/* Tags Filter */}
      <Form.Group className="mt-2">
        <Form.Label>Tags</Form.Label>
        <Form.Control type="text" placeholder="Search by tags..." />
      </Form.Group>

      {/* Release Year Filter */}
      <Form.Group className="mt-2">
        <Form.Label>Release Year</Form.Label>
        <Form.Control type="number" placeholder="Enter year" />
      </Form.Group>

      {/* Popularity Filter */}
      <Form.Group className="mt-2">
        <Form.Check type="checkbox" label="Most Popular" />
      </Form.Group>
    </Card>
  );
};

export default Filters;
