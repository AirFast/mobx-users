import { observer } from "mobx-react-lite";
import { useLocalObservable } from "mobx-react";
import RootStore from "./store/RootStore";

export const App = observer(() => {
  const store = useLocalObservable(() => RootStore);

  const handleRemoveUser = (userId) => {
    store.removeUser(userId);
  };

  const handleAddUserToList = (user) => {
    store.addUserToList(user);
  };

  const handleRemoveUserFromList = (userId) => {
    store.removeUserFromList(userId);
  };

  const handleToggleBlock = (user) => {
    user.toggleBlock();
  };

  const handleToggleEdited = (user) => {
    user.toggleEdited();
  };

  const isInList = (userId) => store.list.map(({ id }) => id).includes(userId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Users</h1>
      <ul>
        {store.users.map((user) => (
          <li key={user.id} className="mb-4 p-4 bg-gray-100 rounded-md shadow">
            <div className="flex justify-between gap-8 flex-col md:items-center md:flex-row">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {!user.blocked && (
                    <button
                      className="bg-green-500 hover:bg-green-400 text-white text-sm font-bold py-1 px-2 rounded"
                      onClick={() => handleToggleEdited(user)}
                    >
                      {!user.isEdited ? "Edit" : "Done"}
                    </button>
                  )}

                  {!user.isEdited ? (
                    <p className="text-lg font-semibold">{user.name}</p>
                  ) : (
                    <input
                      className="text-sm font-semibold py-1 px-3 rounded outline-green-500"
                      type="text"
                      value={user.name}
                      onChange={(e) => user.updateName(e.target.value)}
                    />
                  )}
                </div>
                <div className="flex gap-4">
                  <p className="text-sm text-gray-500">
                    Added to list: {isInList(user.id) ? "Yes" : "No"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Blocked: {user.blocked ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {!user.blocked &&
                  (!isInList(user.id) ? (
                    <button
                      className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleAddUserToList(user)}
                    >
                      Add to list
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleRemoveUserFromList(user.id)}
                    >
                      Remove from list
                    </button>
                  ))}

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleToggleBlock(user)}
                >
                  {!user.blocked ? "Block" : "Unblock"}
                </button>
                {!user.blocked && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
