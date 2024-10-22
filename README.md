<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/andrehrferreira/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> A minimalistic framework for building scalable and modular applications using TypeScript contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Version" /></a>
    <a href="https://github.com/andrehrferreira/cmmv-server/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Package License" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/JEtDUbr1cNkGRxfKFJo7oR/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/JEtDUbr1cNkGRxfKFJo7oR/tree/main.svg?style=svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/andrehrferreira/cmmv-server/issues">Report Issue</a>
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

## Documentation

The complete documentation is available [here](https://cmmv.io).

## Support

CMMV is an open-source project, and we are always looking for contributors to help improve it. If you encounter a bug or have a feature request, please open an issue on [GitHub](https://github.com/andrehrferreira/cmmv-server/issues).

## Stay in Touch

- Author - [André Ferreira](https://github.com/andrehrferreira)
- Twitter - [@andrehrferreira](https://twitter.com/andrehrferreira)
- Linkdin - [@andrehrf](https://www.linkedin.com/in/andrehrf)
- Youtube - [@Andrehrferreira](https://www.youtube.com/@Andrehrferreira)

## License

CMMV is [MIT licensed](LICENSE).
