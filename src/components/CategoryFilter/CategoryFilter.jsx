import classNames from 'classnames';

export const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onResetCategories,
}) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={classNames('button is-success mr-6', {
          'is-outlined': selectedCategories.length > 0,
        })}
        onClick={() => {
          onResetCategories();
        }}
      >
        All
      </a>

      {categories.map(category => (
        <a
          key={category.id}
          data-cy="Category"
          className={classNames('button mr-2 my-1', {
            'is-info': selectedCategories.includes(category.id),
          })}
          href="#/"
          onClick={() => {
            onCategoryToggle(category.id);
          }}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
