import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue);

  const handleSearch = () => {
    if (value.trim()) onSearch(value.trim());
  };

  const onKey = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <InputGroup className="shadow-sm rounded-3">
      <Form.Control
        type="text"
        placeholder="Enter city name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKey}
        className="py-2"
        style={{
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
        }}
      />
      <Button
        variant="primary"
        onClick={handleSearch}
        aria-label="search"
        style={{
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px',
          padding: '0 1rem',
        }}
      >
        <FaSearch />
      </Button>
    </InputGroup>
  );
}
