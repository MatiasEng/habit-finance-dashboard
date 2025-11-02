import users from "../data/users.js";

function getMyProfile(req, res) {
  res.json(req.user);

}

function updateProfile(req, res) {
  
}

function deleteAccount(req, res) {
  
}

function getAllUsers(req, res) {
  res.json(users);
}

export { getMyProfile, updateProfile, deleteAccount, getAllUsers};
