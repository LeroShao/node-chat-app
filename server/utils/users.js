class Users {
  constructor() {
    this.userList = [];
  }
  addUser(id, name, bubble) {
    var user = {id, name, bubble};
    this.userList.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);
    if(user) {
      this.userList = this.userList.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.userList.filter((user) => user.id === id)[0];
  }
  getUserList(bubble) {
    var bubbleUsers = this.userList.filter((user) => user.bubble === bubble);
    var namesArr = bubbleUsers.map((user) => user.name);
    return namesArr;
  }
}

module.exports = {Users};
