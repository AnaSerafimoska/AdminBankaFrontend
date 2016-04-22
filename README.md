# admin-banka-frontend

This is the front end code for eBankingAdmin App

## Build & development

The front end code uses Angular as the JavaScript framework. Bower is used to manage packages and Grunt is the task runner which will take care of things like minification, testing, and reloading the browser.

Install bower and grunt (this requires node, npm, and git to be installed): npm install -g grunt-cli bower yo generator-karma generator-angular

Now run npm install (which installs everything in package.json), bower install (which installs everything in bower.json), and grunt build (which runs a series of tasks to get ready for serving the app).

Finally you can run grunt serve which should open a browser to the app. (localhost:9000)

## Testing

Running `grunt test` will run the unit tests with karma.

## Documentation app locally

Run 'grunt docs' and docs apps will be running under port 9002.

## Deployment

Run 'grunt build' and then copy the content from 'dist' folder into your root folder.
Copy LTEapp.js and place it in 'dist/scripts






This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
