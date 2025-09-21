// 1. Import the built-in HTTP module
const http = require('http');

// 2. Define the port number our server will listen on
const port = 7777;

// 3. Create the server
// This function runs every time a request is received
const server = http.createServer((request, response) => {
  // The 'request' object contains info about the user's request (e.g., the URL)
  // The 'response' object is what we use to send data back to the user

  // Simple routing based on the URL
  if (request.url === '/getSecretData') {
    // End the response and send back a message
    response.end('There is no secret data');
  } else {
    // For all other URLs, send 'Hello World'
    response.end('Hello World');
  }
});

// 4. Start the server and make it listen for requests on our port
server.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});