import { types } from "mobx-state-tree";
import UserModel from "./UserModel";

const RootStore = types
  .model("RootStore", {
    users: types.array(UserModel),
    list: types.array(UserModel),
  })
  .actions((self) => ({
    removeUser(userId) {
      self.users = self.users.filter((user) => user.id !== userId);
    },
    addUserToList(user) {
      const newUser = UserModel.create({
        ...user,
      });
      self.list.push(newUser);
    },
    removeUserFromList(userId) {
      self.list = self.list.filter((user) => user.id !== userId);
    },
  }));

const initialUsers = Array.from({ length: 10 }, (_, index) =>
  UserModel.create({
    id: index.toString(),
    name: `User ${index + 1}`,
    blocked: false,
    isEdited: false,
  })
);

export default RootStore.create({
  users: initialUsers,
});
