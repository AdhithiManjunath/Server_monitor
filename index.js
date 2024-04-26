const express = require("express");
const responseTime = require("response-time");
const client = require("prom-client");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  
  transports: [
    new LokiTransport({
      labels :{appName:"express"},
      host: "http://127.0.0.1:3100"
    })
  ]
  
};
const logger = createLogger(options);
const { doSomeHeavyTask } = require("./util");

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize Prometheus metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics;

// Set up Prometheus metrics collection with default options
collectDefaultMetrics({ register: client.register });

// creating of custom metrics
const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "this tells us how much time is taken by req and res",
  labelNames:['method','route','status_code'],
  buckets:[1,50,100,200,400,500,800,1000,2000]  // gives data points in milli seconds 
});

app.use(responseTime((req,res,time)=>{
      reqResTime.labels({
        method:req.method,
        route: req.url,
        status_code: res.statusCode
      }).observe(time);
}))

app.get("/", (req, res) => {
  // Route handler for the root URL
  logger.info('Req came to / route');
  return res.json({ message: `Hello from Express server` });
});

app.get("/slow", async (req, res) => {
  
  try {
    logger.info('Req came to /slow route');
    const timeTaken = await doSomeHeavyTask();
    return res.json({
      status: "Success",
      message: `Heavy task completed in ${timeTaken}ms`,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: "Error", error: "Internal Server Error" });
  }
});



// Route to expose Prometheus metrics
app.get("/metrics", async (req, res) => {
  try {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
  } catch (error) {
    res.status(500).json({ status: "Error", error: "Internal Server Error" });
  }
});

app.listen(PORT, () =>
  console.log(`Express Server Started at http://localhost:${PORT}`)
);
