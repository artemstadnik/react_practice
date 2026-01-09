import { ProductList } from '../ProductList/ProductList';

export const ProductTable = ({ products, sortField, sortOrder, onSort }) => {
  const getSortIcon = field => {
    if (sortField !== field) return 'fa-sort';

    return sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  if (products.length === 0) {
    return (
      <div className="box table-container">
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      </div>
    );
  }

  return (
    <div className="box table-container">
      <table
        data-cy="ProductTable"
        className="table is-striped is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                ID
                <a
                  href="#/"
                  onClick={e => {
                    e.preventDefault();
                    onSort('id');
                  }}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={`fas ${getSortIcon('id')}`}
                    />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Product
                <a
                  href="#/"
                  onClick={e => {
                    e.preventDefault();
                    onSort('name');
                  }}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={`fas ${getSortIcon('name')}`}
                    />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Category
                <a
                  href="#/"
                  onClick={e => {
                    e.preventDefault();
                    onSort('category');
                  }}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={`fas ${getSortIcon('category')}`}
                    />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                User
                <a
                  href="#/"
                  onClick={e => {
                    e.preventDefault();
                    onSort('user');
                  }}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={`fas ${getSortIcon('user')}`}
                    />
                  </span>
                </a>
              </span>
            </th>
          </tr>
        </thead>

        <ProductList products={products} />
      </table>
    </div>
  );
};
