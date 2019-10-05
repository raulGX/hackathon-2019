import { useState } from 'react';

export const useFilters = initialSelectedFilters => {
  const [selectedFilters, setSelectedFilters] = useState(initialSelectedFilters);

  const handleChange = (filter, onSelectedFiltersChanged) => {
    let newSelectedFilters;
    const option = selectedFilters.find(selectedFilter => selectedFilter.id === filter.id);

    if (option) {
      newSelectedFilters = selectedFilters.filter(
        selectedFilter => selectedFilter.id !== filter.id
      );
    } else {
      newSelectedFilters = [...selectedFilters, filter];
    }

    setSelectedFilters(newSelectedFilters);
    onSelectedFiltersChanged(newSelectedFilters);
  };

  return {
    selectedFilters,
    setSelectedFilters,
    handleChange
  };
};

export const useFiltersVisibility = () => {
  const [allFiltersCollapsed, setCollapseAll] = useState(true);
  const [filtersActive, setFiltersActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const mapFiltersToggle = () => {
    setCollapseAll(selectedFilters.length === 0);
    setFiltersActive(!filtersActive);
  };

  const openFilters = () => {
    setCollapseAll(false);
    setFiltersActive(!filtersActive);
  };

  const closeFilters = () => {
    if (filtersActive && selectedFilters.length === 0) {
      setCollapseAll(true);
    }
    setFiltersActive(false);
  };

  const onClearFilters = () => {
    setSelectedFilters([]);
    !filtersActive && setCollapseAll(true);
  };

  const onFiltersChange = currentFilters => {
    if (!filtersActive && currentFilters.length === 0) {
      setCollapseAll(true);
    }
    setSelectedFilters(currentFilters);
  };

  return {
    allFiltersCollapsed,
    filtersActive,
    mapFiltersToggle,
    openFilters,
    onClearFilters,
    onFiltersChange,
    selectedFilters,
    closeFilters
  };
};
