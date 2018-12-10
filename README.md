Make sure you have installed the latest versions of <b>Node.js</b> and <b>npm</b>.

To set up project write in the console (git bash or terminal) inside the project folder:
1. npm install pixi.js
2. npm install pixi-spine
3. npm install --save-dev webpack
4. npm install lodash
5. npm install resource-loader
6. npm install -g local-web-server

To run static version:
1. You need to have <b>static.js</b> as <b>entry</b> inside <b>webpack.config.js</b>
2. Write in the console:
   2.1. npm run build 
   2.2. ws --spa dist/index.html
3. Choose one of the <b>server links</b> after running ws --spa and open in your browser

To run animated version:
1. You need to have <b>animated.js</b> as <b>entry</b> inside <b>webpack.config.js</b>
2. Write in the console:
   2.1. npm run build 
   2.2. ws --spa dist/index.html
3. Choose one of the <b>server links</b> after running ws --spa and open in your browser
