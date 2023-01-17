require("reflect-metadata");
require("module-alias/register");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ticket = require("./ticket");
const signature = require("./verifySignature");
const api = require("./api");
const payloads = require("./payloads");
const { Container } = require("inversify");
const {
    CommandInspectionService,
} = require("@service/slacks/command/CommandInspectionService");
const { MakePropertyApiService } = require("@service/make/MakePropertyService");
const { MakeApiService } = require("@service/make/base/MakeApiService");
const { HttpClient } = require("@base/HttpClientBase");
const debug = require("debug")("slash-command-template:index");

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

app.get("/", (req, res) => {
    res.send(
        "<h2>The Slash Command and Dialog app is running</h2> <p>Follow the" +
            " instructions in the README to configure the Slack App and your environment variables.</p>",
    );
});

/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post("/inspection", async (req, res) => {
    //Verify the signing secret
    if (!signature.isVerified(req)) {
        debug("Verification token mismatch");
        return res.status(404).send();
    }

    const container = new Container();
    container.bind(HttpClient.name).to(HttpClient);
    container.bind(MakeApiService.name).to(MakeApiService);
    container.bind(MakePropertyApiService.name).to(MakePropertyApiService);
    container.bind(CommandInspectionService.name).to(CommandInspectionService);

    /** @type {CommandInspectionService} */
    const service = container.get(CommandInspectionService.name);

    const payload = await service.payload({
        trigger: {
            id: req.body["trigger_id"],
        },
    });

    console.log(payload);

    let result = await api.callAPIMethod("views.open", payload);

    debug("views.open: %o", result);
    return res.sendStatus(200);
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
app.post("/interactive", (req, res) => {
    // Verify the signing secret
    if (!signature.isVerified(req)) {
        debug("Verification token mismatch");
        return res.status(404).send();
    }

    const body = JSON.parse(req.body.payload);
    res.send("");
    ticket.create(body.user.id, body.view);
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(
        "Express server listening on port %d in %s mode",
        server.address().port,
        app.settings.env,
    );
});
