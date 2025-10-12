/*
Exercise: User Management System

You're building a simple user management system. Create a program that manages users and their posts with the following requirements:
Requirements:
Part 1: Basic Data Structures

    Create user objects with: id, name, email, isActive (boolean)
    Create post objects with: id, userId, title, content, likes
    Create arrays to store users and posts

Part 2: Core Functions

    Add new users to the system
    Find users by ID or email
    Add posts for specific users
    Get all posts from a specific user
    Like a post (increment likes count)
    Get active users only

Part 3: Advanced Operations

    User statistics - function that returns: total users, active users, most active user (most posts)
    Search posts by keyword in title or content
    Transform data - get array of post titles with author names

Part 4: Async/Await Simulation

    Simulate API calls with delays
    Fetch user data asynchronously
    Fetch user posts asynchronously
    Get user profile with posts (combine user + their posts)
*/


let IDUSER = 1;
let IDPOST = 1;

const user = {
  id: 1,
  name: "User1",
  email: "user1@gmail.com",
  isActive: true,
  postAmount: 0
};

const post = {
  id: 1,
  userId: 1,
  title: "post n.1",
  content: "Money is not the final destination, but is the current goal",
  likes: 100

};

const users = [];
const posts = [];


// Add new user
function addUser(name, email, isActive) {
  const newUser = {};

  newUser.id = IDUSER++;
  newUser.name = name;
  newUser.email = email;
  newUser.isActive = isActive;
  newUser.postAmount = 0;
  
  users.push(newUser);
}

// Find user by Id
function findUserById(idToFind) {
  for (let i = 0; i < users.length; i++) {
    let { id } = users[i];
    
    if (id === idToFind) {
      return i;
    }
    
  }
  return undefined;
}

// Find user by email
function findUserByEmail(emailToFind) {
  for (let i = 0; i < users.length; i++) {
    let { email } = users[i];
    
    if (email === emailToFind) {
      return users[i];
    }
  }
  
  return undefined;
}

// Add new post for a user
function addPost(idUser, title, content) {
  const user = findUserById(idUser);

  if (user === undefined) {
    return "Fail to create Post"
  }
  
  const newPost = {};
  newPost.id = IDPOST++;
  newPost.userId = idUser;
  newPost.title = title;
  newPost.content = content;
  newPost.likes = 0;
  
  users[user].postAmount += 1;
  posts.push(newPost);

}

function findPostById(idToFind) {
  for (let i = 0; i < posts.length; i++) {
    let { id } = posts[i];
    
    if (id === idToFind) {
      return i;
    }
    
  }
  return undefined;
}

// For a better consisntency create a array of liked posts in each user and verify
// that the user hasn't like the post already
// Like a post
function likeAPost(userId, postId) {
  const user = findUserById(userId);
  const post = findPostById(postId);
  

  if (user != undefined && post != undefined) {
    posts[post].likes++;
    return "Post Liked";
  } else {
    return "Post or User not valid";
  }
  
}

// Get all Active users
function getAllActiveUsers() {
  return users.filter(user => user.isActive === true);
}


// GetUserStatistics
/**
 * Return a object with the following data
 * totalUsers : number
 * totalActiveUsers : number
 * mostActiveUser : name
 * totalPost : posts in the system
 */


function getUserStatistics() {
  const statistics = {};
  
  // find most active user
  const mostActiveUser = users.reduce((highest, current) => {
    return current.postAmount > highest.postAmount ? current : highest;
  });
  
  statistics.users = users.length;
  statistics.activeUsers = getAllActiveUsers().length;
  statistics.mostActiveUser = mostActiveUser.name;
  statistics.posts = posts.length;

  return statistics;
  
}


// SearchPost
/**
 * Return array of posts that match keywords
 */

// GetPostsWithAuthors
/**
 * return postTitle, author and likes
 */

// Tests
addUser("user1", "user1@gmail.com", true);
addUser("user2", "user2@gmail.com", true);
addUser("user3", "user3@gmail.com", false);

addPost(1, "post1U1", "DescriptionP1U1");
addPost(1, "post2U1", "DescriptionP2U1");
addPost(2, "post1U2", "DescriptionP2U1");
addPost(2, "post2U2", "DescriptionP2U2");
addPost(2, "post32U2", "DescriptionP3U2");

likeAPost(1, 1);
likeAPost(2, 2);
likeAPost(1, 3);
likeAPost(2, 1);

console.log(getUserStatistics());

