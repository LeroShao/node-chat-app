const expect = require('expect');

const {Users} = require('./users');

var users;

beforeEach(() => {
  users = new Users();
  users.userList = [{
    id: '1',
    name: 'celine',
    bubble: '121'
  }, {
    id: '2',
    name: 'Jing',
    bubble: '121'
  }, {
    id: '3',
    name: 'cyril',
    bubble: '322'
  }];
});
describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'someone',
      bubble: 'somebubble'
    };
    var addedUser = users.addUser(user.id, user.name, user.bubble);
    expect(addedUser).toEqual(user);
    expect(users.userList).toEqual([user]);
  })

  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  })

  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  })

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.userList.length).toBe(2);
  })

  it('should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.userList.length).toBe(3);
  })

  it('should return names for bubble121', () => {
    var namesArr = users.getUserList('121');
    expect(namesArr).toEqual(['celine', 'Jing']);
  })

  it('should return names for bubble322', () => {
    var namesArr = users.getUserList('322');
    expect(namesArr).toEqual(['cyril']);
  })
})
