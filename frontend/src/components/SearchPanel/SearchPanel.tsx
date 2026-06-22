import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Filters {
  make?: string;
  model?: string;
  priceRange?: [number, number];
  financeOnly?: boolean;
}

interface SearchPanelProps {
  onChange: (filters: Filters) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onChange }) => {
  const [filters, setFilters] = useState<Filters>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onChange({ ...filters, [name]: value });
  };

  return (
    <motion.div
      className="sticky top-0 z-20 bg-darkBg bg-opacity-80 backdrop-blur-md py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap gap-4 items-center justify-center px-4">
        <input
          name="make"
          placeholder="Make"
          className="rounded px-3 py-2 bg-gray-800 text-white"
          onChange={handleInputChange}
        />
        <input
          name="model"
          placeholder="Model"
          className="rounded px-3 py-2 bg-gray-800 text-white"
          onChange={handleInputChange}
        />
        <input
          name="priceMin"
          type="number"
          placeholder="Min Price"
          className="rounded px-3 py-2 bg-gray-800 text-white"
          onChange={handleInputChange}
        />
        <input
          name="priceMax"
          type="number"
          placeholder="Max Price"
          className="rounded px-3 py-2 bg-gray-800 text-white"
          onChange={handleInputChange}
        />
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            name="financeOnly"
            className="mr-2"
            onChange={handleInputChange}
          />
          Finance Only
        </label>
      </div>
    </motion.div>
  );
};

export default SearchPanel;
