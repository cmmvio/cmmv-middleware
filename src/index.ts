import EventEmitter from "node:events";
import { IncomingMessage, ServerResponse } from "node:http";
import * as merge from "utils-merge";

async function _(this: any, fn?, hook = "onRequest") {
    return (req, res, next) => {
        if (req.app && typeof req.app.addHook === 'function') {
            req.app.addHook(hook, processMiddleware.bind({ fn }));
        } else {
            next();
        }
    }
}

async function processMiddleware(this: any, req, res, payload, done) {
    let handle = this.fn;
    const request = createMockRequest(req);
    const response = createMockResponse(res);

    handle(request, response, (...args) => {
        req.app.addHook("onSend", (req, res, payload, next) => {
            try{
                response.body = payload;
                
                if (response._header || response.headersSent) 
                    return; 
                
                if (response && typeof response.writeHead === 'function')
                    response.writeHead.call(response, res.statusCode)
                            
                if(typeof next === "function")
                    next.call(this, null, payload);

                return payload;
            }
            catch(err){
                if(typeof next === "function")
                    next.call(this, null, payload);

                return payload;
            }
        });

        if(typeof next === "function")
            next.bind(this);

        return payload;
    });
}

function createMockRequest(req) {
    const request = Object.create(IncomingMessage.prototype);
    merge(request, EventEmitter);

    Object.keys(req).forEach((key) => {
        request[key] = req[key];
    });

    [
        "on", "emit", "pipe", "unpipe", "pause", "resume",
        "query", "querystring", "search", "socket",
        "protocol", "headers", "url", "origin", "href",
        "secure", "method", "path", "host", "hostname",
        "URL", "idempotent", "ip",
        "ips", "length", "subdomains", "xhr", "cookies",
        "signedCookies", "header", "get", "accept",
        "type", "accepts", "acceptsEncodings", "acceptsCharsets",
        "acceptsLanguages", "range", "is"
    ].forEach((method) => {
        if (typeof req[method] === 'function') {
            request[method] = req[method].bind(req);
        } else if (req[method] !== undefined) {
            request[method] = req[method];
        }
    });

    return request;
}

function createMockResponse(res) {
    const response = Object.create(ServerResponse.prototype);

    Object.keys(res).forEach((key) => {
        response[key] = res[key];
    });

    [
        "setHeader", "getHeader", "removeHeader", 
        "writeHead", "end", "write", "statusCode", 
        "on", "emit", "get"
    ].forEach((method) => {
        if (typeof res[method] === 'function') {
            response[method] = res[method].bind(res);
        } else if (res[method] !== undefined) {
            response[method] = res[method];
        }
    });

    response.status = (statusCode: number) => {
        //return response.statusCode = statusCode;
    }

    response.setHeader = response.setHeader || ((name, value) => {
        if (!response.headers) {
            response.headers = {};
        }
        response.headers[name.toLowerCase()] = value;
    });

    response.getHeader = response.getHeader || ((name) => {
        return response.headers ? response.headers[name.toLowerCase()] : undefined;
    });

    response.removeHeader = response.removeHeader || ((name) => {
        if (response.headers) {
            delete response.headers[name.toLowerCase()];
        }
    });

    response.writeHead = response.writeHead || ((statusCode, statusMessage, headers) => {
        response.statusCode = statusCode;
        if (typeof statusMessage === 'string') {
            response.statusMessage = statusMessage;
            if (headers) {
                Object.assign(response.headers, headers);
            }
        } else {
            Object.assign(response.headers, statusMessage);
        }
    });

    return response;
}

export default _;
