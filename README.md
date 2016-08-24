# Webpack + React + Redux + Firebase

Starter Kit / Boilerplate to use React, Redux and Firebase in an ES2015 codebase compiled with Webpack.  

A version of this app is visible at [vkammerer.github.io/react-redux-firebase](http://vkammerer.github.io/react-redux-firebase)  

This was originally an adaptation of the article [http://blog.krawaller.se/posts/a-react-redux-firebase-app-with-authentication](http://blog.krawaller.se/posts/a-react-redux-firebase-app-with-authentication), but the application and the code have been simplified afterwards.

## Install
Clone the repo and then:
```javascript
npm i
```  
## Dev
Run an express server using Webpack with Hot Module Replacement:
```javascript
npm run dev
```
## Prod
Build the production version of your assets in the 'static' directory
```javascript
npm run build
```
# TODO
- Replace redux-thunk with redux-saga.  
- Replace custom express server with webpack-dev-server.  

If anyone if up for sending a PR, I would gladly review it and merge it.

