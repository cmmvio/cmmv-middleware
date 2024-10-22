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