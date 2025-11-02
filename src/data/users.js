const demo = {
  id: 0,
  username: "demoUser",
  email: "demoUser@gmail.com",
  password: "demouser12345",
  createdAt: Date.now(),
  isAdmin: false
}

let users = [];

users.push({id: 1, username: "john_doe", email:"john.doe@gmail.com", password: "password1", createdAt: "2025-01-15", isAdmin: true});
users.push({id: 2, username: "sarah_smith", email:"sarah.smith@gmail.com", password: "pass1234", createdAt: "2025-02-03", isAdmin: false});
users.push({id: 3, username: "mike_jones", email:"mike.jones@gmail.com", password: "mike2025", createdAt: "2025-02-18", isAdmin: false});
users.push({id: 4, username: "emily_wilson", email:"emily.wilson@gmail.com", password: "wilsonE!", createdAt: "2025-03-05", isAdmin: true});
users.push({id: 5, username: "alex_chen", email:"alex.chen@outlook.com", password: "chenALEX", createdAt: "2025-03-22", isAdmin: false});
users.push({id: 6, username: "lisa_garcia", email:"lisa.garcia@gmail.com", password: "lisaG#99", createdAt: "2025-04-10", isAdmin: false});
users.push({id: 7, username: "david_brown", email:"david.brown@gmail.com", password: "brownD2025", createdAt: "2025-04-28", isAdmin: false});
users.push({id: 8, username: "amy_taylor", email:"amy.taylor@gmail.com", password: "taylorA1", createdAt: "2025-05-14", isAdmin: true});
users.push({id: 9, username: "kevin_lee", email:"kevin.lee@gmail.com", password: "leeKevin@", createdAt: "2025-06-01", isAdmin: false});
users.push({id: 10, username: "rachel_martin", email:"rachel.martin@gmail.com", password: "martinR%", createdAt: "2025-06-19", isAdmin: false});

export default users;