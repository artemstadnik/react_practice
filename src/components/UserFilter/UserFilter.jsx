export const UserFilter = ({ users, selectedUserId, onUserSelect }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={selectedUserId === null ? 'is-active' : ''}
        onClick={() => {
          onUserSelect(null);
        }}
      >
        All
      </a>

      {users.map(user => (
        <a
          key={user.id}
          data-cy="FilterUser"
          href="#/"
          className={selectedUserId === user.id ? 'is-active' : ''}
          onClick={() => {
            onUserSelect(user.id);
          }}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
