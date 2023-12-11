import { types } from "mobx-state-tree";

const UserModel = types
  .model("UserModel", {
    id: types.identifier,
    name: types.string,
    blocked: types.boolean,
    isEdited: types.boolean,
  })
  .actions((self) => ({
    updateName(newName) {
      self.name = newName;
    },
    toggleBlock() {
      self.blocked = !self.blocked;
    },
    toggleEdited() {
      self.isEdited = !self.isEdited;
    },
  }));

export default UserModel;
