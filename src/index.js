require("reflect-metadata");
require("module-alias/register");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controller/index");

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || "utf8");
    }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));
app.use((req, res, next) => {
    console.log("Request: ", req.url);

    // Verify the signing secret
    // if (!signature.isVerified(req)) {
    //     debug("Verification token mismatch");
    //     return res.status(404).send();
    // }
    next();
});

app.get("/", (req, res) => {
    res.send(
        "<h2>The Slash Command and Dialog app is running</h2> <p>Follow the" +
            " instructions in the README to configure the Slack App and your environment variables.</p>",
    );
});

// Routes
app.post("/events", controller.events);
app.post("/actions", controller.actions);

// Start the server
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(
        `Express server listening on port ${server.address().port} in ${
            app.settings.env
        } mode`,
    );
});
