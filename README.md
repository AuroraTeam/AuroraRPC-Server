# AuroraRPC-Server

## Description

This is the server implementation for Aurora RPC.  
The server is based on the websocket protocol. It uses the [ws](https://github.com/websockets/ws) library.  
The client implementation is available in [AuroraRPC-Client](https://github.com/AuroraTeam/AuroraRPC-Client).

## Installation

```bash
npm i aurora-rpc-server
```

## Usage

```ts
import { Server } from 'aurora-rpc-server';

const debug = false; // Set to true to enable debug output

const server = new Server({
    // websocket server options
    port: 8080,
}, debug);

// --- Create a request handler ---

import { AbstractRequest, ResponseResult } from 'aurora-rpc-server';

class HelloRequest extends AbstractRequest {
    method = "hello"

    invoke(): ResponseResult {
        return "Hello Aurora RPC!";
    }
}

// --- Register request handlers ---

server.registerRequest(new HelloRequest());
```
