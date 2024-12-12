import cmmv from '@cmmv/server';
import * as path from "node:path";
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as expressSession from 'express-session';
import * as cookieSession from 'cookie-session';
import * as cookieParser from 'cookie-parser';
import * as responseTime from 'response-time';
import * as timeout from 'connect-timeout';
import * as morgan from 'morgan';
import * as serveStatic from 'serve-static';
import * as serveFavicon from 'serve-favicon';
import * as vhost from 'vhost';
import helmet from 'helmet';
import _ from "./index";

const app = cmmv();

app.use(_(cors()));
app.use(_(helmet()));
app.use(_(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 }
})));

app.use(_(cookieSession({ name: "session", secret: "123" })));
app.use(_(cookieParser()));
app.use(_(responseTime()));
app.use(_(timeout('5s')));
app.use(_(bodyParser.urlencoded({ extended: false })));
app.use(_(bodyParser.json()));
app.use(_(morgan("combined")));
app.use(_(serveFavicon(path.join(__dirname, "..", "public", "favicon.ico"))));
//app.use(_(serveStatic(path.join(__dirname, "..", "public"))));
//app.use(_(compression({ threshold: 0 })));

serveFavicon

app.use(vhost('mail.example.com', function (req, res) {
    // handle req + res belonging to mail.example.com
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello from mail!')
}));

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
});