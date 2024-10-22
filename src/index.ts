/*!
 * connect
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

async function _(this: any, route, fn?, hook = "onSend") {
    return (req, res, next) => {
        if (req.app && typeof req.app.addHook == 'function')
            req.app.addHook(hook, processMiddleware.bind({ route, fn }));
    }
}

async function processMiddleware(this: any, req, res, payload, done){
    let handle = this.fn;
    let path = this.route;

    if (typeof this.route !== 'string') {
        handle = this.route;
        path = '/';
    }

    if (req.path === path || path === "/") {
        handle(req, res, () => {
            done(); 
        });
    } else {
        done(); 
    }
}

export default _; 