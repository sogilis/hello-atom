# atom-shell example app

This is an example atom-shell app based off these instructions:
- https://github.com/atom/atom-shell/blob/master/docs/tutorial/quick-start.md

# Installation
To install all required components do the following:

```
$ ./install.sh`
```

OR manually:

Install grunt if you haven't already

```
$ npm install -g grunt-cli
```

Then run the following to download version 0.12.2 of atom-shell
```
$ cd ./build
$ npm install
$ grunt download-atom-shell
```

# Run
To run the app:

```
./run.sh
```

# How to debug browser

Run node-inspector:

```
$ npm install node-inspector
$ node-inspector
```

Enable debug mode when executing your app:

```
$
```

Show debug logs with Chrome:

```
http://127.0.0.1:8080/debug?port=5858
```
