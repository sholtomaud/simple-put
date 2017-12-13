# Simple node server to take a PUT stream of data from file

## RUN

Run server with:

```bash
    node index.js
```

## CALL

Call the server with curl:

```bash
     curl -T data.txt http://localhost:8082/[1-1000]
```
