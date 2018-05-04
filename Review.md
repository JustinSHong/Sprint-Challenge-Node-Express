# Review Questions

## What is Node.js?

Node.js is a server-side JavaScript environment.

## What is Express?

Express is a framework for Node.js that extends its functionality.

## Mention two parts of Express that you learned about this week.

I learned about routers which are middleware that handle requests for a particular resource. I also learned about middleware and how it can be used to extend the functionality of Express.

## What is Middleware?

Middleware are functions that extend the functionality of Express which is minimalistic. Middleware can be from 3rd party packages or can also be custom functions.

## What is a Resource?

A resource are pieces of data represented by a URL in an API/web app.

## What can the API return to help clients know if a request was successful?

The API can return HTTP status codes to communicate to clients if a request was successful.

## How can we partition our application into sub-applications?

You can organize your file structure by type or by resource. Routers can also be used to separate requests for different resources.

## What is CORS and why do we need it?

CORS is Cross Origin Resource Sharing and refers to the mechanism by which APIs/web apps are given permission to acess resources that are on another server on a different domain. Real world apps often communicate with APIs in this manner. Browsers restrict this mechanism by default so 3rd party packages must be used to enable CORS.
