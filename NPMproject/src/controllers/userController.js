let users = [];

const user = {
  id: 0,
  username: "UserName",
  email: "userEmail@gmail.com".toLowerCase(),
  password: "UserPassword"
}

users.push({id: 1, username: "User1", email: "user1@gmail.com", password: "user1"})
users.push({id: 2, username: "User2", email: "user2@gmail.com", password: "user2"})
users.push({id: 3, username: "User3", email: "user3@gmail.com", password: "user3"})
users.push({id: 4, username: "User4", email: "user4@gmail.com", password: "user4"})
users.push({id: 5, username: "User5", email: "user5@gmail.com", password: "user5"})
users.push({id: 6, username: "User6", email: "user6@gmail.com", password: "user6"})

// 1. getMyProfile
function getMyProfile(req, res) {
  res.json(req.user);
}

// 2. getAllUsers
function getAllUsers(req, res) {
  // Add a limit param later
  res.json(users);

}

export { getMyProfile, getAllUsers };
export { users };