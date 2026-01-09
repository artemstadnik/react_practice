/* eslint-disable */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { UserFilter } from './components/UserFilter/UserFilter';
import { SearchFilter } from './components/SearchFilter/SearchFilter';
import { CategoryFilter } from './components/CategoryFilter/CategoryFilter';
import { ProductTable } from './components/ProductTable/ProductTable';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    cat => cat.id === product.categoryId,
  );

  const selectedUser = usersFromServer.find(
    user => user.id === category.ownerId,
  );

  return {
    ...product,
    category,
    user: selectedUser,
  };
});

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleCategoryToggle = categoryId => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSort = field => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder(null);
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const resetAllFilters = () => {
    setSelectedUserId(null);
    setSearchQuery('');
    setSelectedCategories([]);
    setSortField(null);
    setSortOrder(null);
  };

  let filteredProducts = [...products];

  if (selectedUserId) {
    filteredProducts = filteredProducts.filter(
      product => product.user.id === selectedUserId,
    );
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category.id),
    );
  }

  if (sortField && sortOrder) {
    filteredProducts = filteredProducts.sort((a, b) => {
      let aValue;
      let bValue;

      switch (sortField) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = a.category.title.toLowerCase();
          bValue = b.category.title.toLowerCase();
          break;
        case 'user':
          aValue = a.user.name.toLowerCase();
          bValue = b.user.name.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        if (sortOrder === 'asc') {
          return -1;
        }

        return 1;
      }

      if (aValue > bValue) {
        if (sortOrder === 'asc') {
          return 1;
        }

        return -1;
      }

      return 0;
    });
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserFilter
              users={usersFromServer}
              selectedUserId={selectedUserId}
              onUserSelect={setSelectedUserId}
            />

            <SearchFilter query={searchQuery} onQueryChange={setSearchQuery} />

            <CategoryFilter
              categories={categoriesFromServer}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onResetCategories={() => setSelectedCategories([])}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => resetAllFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <ProductTable
          products={filteredProducts}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};
