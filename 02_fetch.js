// fetch(url, options)
// 1. Returns a Promise 
// 2. You must read the responde with .json() or .text()


const URL='https://jsonplaceholder.typicode.com/posts';

const response = await fetch(`${URL}/1`)
const data = await response.json(); // Turn JSON string to JS object

console.log(data);


// Options
/*
method:
  * GET
  * POST
  * PUT
  * PATCH
  * DELETE
  
headers:
  Metadata (content-type, auth, etc)
    * { 'Content-Type' : 'application/json' }
    
body:
  Data to Send only for (POST / PUT / PATCH)
    JSON.stringiy(data)

cache, mode:
  rarely needed
*/

// Examples Send Data
const post = {
  title: 'My post',
  body: 'Hello',
  userId: 1
};

fetch(URL, {
  method: 'POST',
  headers: {'Content-Type' : 'application/json'},
  body: JSON.stringify(post) // From object to JSON String
})

const res = await fetch(URL);
const posts = await response.json(); // From JSON String to JS Object
