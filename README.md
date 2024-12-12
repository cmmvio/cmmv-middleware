<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/andrehrferreira/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Building scalable and modular applications using contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core/middleware"><img src="https://img.shields.io/npm/v/@cmmv/middleware.svg" alt="NPM Version" /></a>
    <a href="https://github.com/andrehrferreira/cmmv-middleware/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/middleware.svg" alt="Package License" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/andrehrferreira/cmmv-middleware/issues">Report Issue</a>
</p>

## Description

The ``@cmmv/middleware`` module is designed to integrate Express middlewares into CMMV applications. It is based on the original implementation of Express and the features offered by the [senchalabs/connect](https://github.com/senchalabs/connect) project. This module allows for flexible and modular addition of middlewares, providing a similar experience to Express. It supports a wide range of common middlewares, including authentication, session handling, request body parsing, and more, making it easy to create routes and handle HTTP requests efficiently and in an organized manner. Furthermore, the module maintains compatibility with custom middlewares, enabling developers to extend and adapt its functionality according to their application's specific needs.

## Installation

Install the ``@cmmv/middleware`` package via npm:

```bash
$ pnpm add @cmmv/middleware
```

## Quick Start

Below is a simple example of how to create a new CMMV application:

```typescript
import cmmv from '@cmmv/server';
import * as cors from 'cors';
import * as compression from 'compression';
import helmet from 'helmet';
import _ from "./index";

const app = cmmv();

app.use(_(cors()));
app.use(_(helmet()));
app.use(_(compression({ level: 6, threshold: 0 })));

app.get("/", (req, res) => {
    res.json({Hello: "World"});
});

app.listen({ host: "127.0.0.1", port: 3000})
.then(server => {
    console.log(
        `Listen on http://${server.address().address}:${server.address().port}`,
    );
})
.catch(err => {
    throw Error(err.message);
});;
```

## Middleware Compatibility Checklist

| Middleware        | Status        | Notes                                                                                 |
|-------------------|--------------|---------------------------------------------------------------------------------------|
| `cors`            | ✅ Working   | Middleware tested and working as expected.                                            |
| `helmet`          | ✅ Working   | Middleware tested and working as expected.                                            |
| `compression`     | ❌ Not Working | Middleware not working due to issues with triggering `onHeaders` event properly.       |
| `cookie-session`  | ❌ Not Working | Middleware not functioning correctly; issues with session management and `Set-Cookie`. |
| `express-session` | ❌ Not Working | Middleware incompatible; issues with session handling and storage.                     |
| `serve-static`    | ❌ Not Working | Middleware for serving static files not yet tested.                                    |
| `body-parser`     | ✅ Working   | Middleware tested and working as expected.                                            |
| `morgan`          | ✅ Working   | Middleware tested and working, logs requests correctly.                               |
| `serve-favicon`   | ⏳ Not Tested | Middleware for serving favicons not yet tested.                                       |
| `method-override` | ⏳ Not Tested | Middleware for method override not yet tested.                                        |
| `csurf`           | ⚠️ Deprecated | Middleware deprecated; not tested.                                                   |
| `multer`          | ⏳ Not Tested | Middleware for file uploads not yet tested.                                           |

### Native CMMV Middleware

CMMV provides native implementations for several common middlewares with enhanced performance optimizations. These native implementations are prefixed with `@cmmv/` and include:

- `@cmmv/body-parser` ([NPM](https://www.npmjs.com/package/@cmmv/body-parser))
- `@cmmv/compression` ([NPM](https://www.npmjs.com/package/@cmmv/compression))
- `@cmmv/cookie-parser` ([NPM](https://www.npmjs.com/package/@cmmv/cookie-parser))
- `@cmmv/cors` ([NPM](https://www.npmjs.com/package/@cmmv/cors))
- `@cmmv/etag` ([NPM](https://www.npmjs.com/package/@cmmv/etag))
- `@cmmv/helmet` ([NPM](https://www.npmjs.com/package/@cmmv/helmet))
- `@cmmv/server-static` ([NPM](https://www.npmjs.com/package/@cmmv/server-static))

### Summary

- **Working**: `cors`, `helmet`, `body-parser`, and `morgan` have been tested and work as expected.
- **Not Working**: `compression`, `cookie-session`, and `express-session` have issues related to header management, session handling, or storage that need to be addressed.
- **Not Tested**: `serve-static`, `serve-favicon`, `method-override`, and `multer` have not been tested yet.
- **Deprecated**: `csurf` is deprecated and will not be tested.

### Summary

- **Working**: `cors`, `helmet`, `body-parser`, `morgan`, `serve-favicon`, `method-override`, and `multer` have been tested and work as expected.
- **Not Working**: `compression`, `cookie-session`, `express-session`, and `serve-static` have issues related to header management, session handling, or file serving that need to be addressed.

If you encounter issues or have suggestions on how to improve compatibility, feel free to contribute or report them on [GitHub](https://github.com/andrehrferreira/cmmv-server/issues).