import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSearch = () => {
    if (value.trim()) onSearch(value.trim());
  };

  const onKey = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <InputGroup className="search-bar">
      <Form.Control
        type="text"
        placeholder="Enter city name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKey}
        className="search-input"
      />
      <Button
        variant="primary"
        onClick={handleSearch}
        aria-label="search"
        className="search-button"
      >
        <FaSearch />
      </Button>
    </InputGroup>
  );
}
