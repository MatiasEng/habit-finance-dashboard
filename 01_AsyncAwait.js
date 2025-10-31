// Basic usage of async / await

// 1. function that returns a promise

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({id: userId, name : `User ${userId}`});
      } else {
        reject(new Error('Invalid Request'));
      }

    }, 500);
  });
}



// 2. Using async/await
async function getUser(id) {
  try {
    const user = await fetchUser(id);
    console.log(user);
    return user;

  } catch (err) {
    console.error('Failed', err.message);
    throw err;
  }
}


getUser(3).then( u => console.log('Success'));



// pattern 
/*
async funcion name() {...} Always resturns a promise
await expression waits for the Promise
try / catch Error Handling

*/


// Try to get Posts from the api

const URL='https://jsonplaceholder.typicode.com/posts';

async function getUsers() {
  const response = await fetch(URL, {
    headers: {'Content-Type' : 'application/json'}
  })
  

  if (!response.ok) {
    throw new Error(`HTTPS ${response.status}`)
  }
  
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function print() {
  try {
    const posts = await getUsers();
    console.log(posts);
  } catch (err) {
    throw err;
  }
}

print();