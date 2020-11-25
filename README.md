# XTRA Assignment - websockets

### Installation
server
```sh
$ npm i
```

client
enter into /client directory
```sh
$ npm i
```

Go back to root directory
```sh
$ npm run dev
```

This will start server at http://localhost:8000 and client at http://localhost:3000
Host page: http://localhost:3000/host
Participant page: http://localhost:3000/participant

when host clicks on a counter, websocket starts emiting event to participant every second till it reaches zero.