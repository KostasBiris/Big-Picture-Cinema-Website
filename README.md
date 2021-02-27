REQUIREMENTS

nodejs - https://github.com/nodesource/distributions/blob/master/README.md

yarn - https://classic.yarnpkg.com/en/docs/install/#debian-stable  
Note that yarn is install with npm which is the package manager for nodejs. This one is installed via nodejs installation.

Running instructions  
Open two terminal sessions from /react-flask-app dir.  
First terminal: yarn start (this starts reactjs server on local port 3000)
Second terminal: yarn start-api (this starts flask server on local port 5000)

Don't worry about the ports being different because in package.json the port 3000 is redirected via proxy to port 5000.