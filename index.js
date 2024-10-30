const express = require('express')
const { doSomeHeavytask } = require('./util')
const responseTime = require('response-time')
const client = require('prom-client');
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");

const options = {
    transports: [
        new LokiTransport({
            host: "http://127.0.0.1:3100"
        })
    ]
};
const logger = createLogger(options);

const app = express();
const PORT = process.env.PORT || 8000
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register })

const totalReqCounter = new client.Counter({
    name: "total_req_counter",
    help: 'Tell Total Request',
});


const reqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "How Much time taken",
    labelNames: ['method', 'route', 'status_code'],
    buckets: [1, 50, 100, 400, 500, 800, 1000, 2000],
})

app.use(responseTime((req, res, time) => {
    totalReqCounter.inc();
    reqResTime.labels({
        method: req.method,
        route: req.url,
        status_code: req.statusCode,
    })
        .observe(time)
}))

//! Normal Task
app.get('/', (req, res) => {
    logger.info("Request came from / root")
    return res.json({ message: `Hello from Express Server` })
})

//! For Heavy Task
app.get('/slow', async (req, res) => {
    logger.info("Request came from /slow root")
    try {
        const timeTaken = await doSomeHeavytask();
        return res.json({
            status: 'Sucess',
            message: `Heavy Task completed in ${timeTaken}`,
        })
    }
    catch (error) {
        logger.error(error.message)
        return res
            .status(500)
            .json({ status: 'Error', error: 'Internel Server Error' })
    }
})

//! Metrics
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType)
    const metrics = await client.register.metrics();
    res.send(metrics);
})
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})