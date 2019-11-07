const path = require("path");
const Mali = require("mali");

const greetMe = async (ctx, next) => {
  ctx.res = { reply: `Hey ${ctx.req.name}!` };
  await next();
};

const logRequest = async (ctx, next) => {
  const start = new Date();

  await next();

  const ms = new Date() - start;
  console.log(`[${start.toLocaleString()}] Request ${ctx.name} took ${ms}ms`);
};

const app = new Mali(path.join(__dirname, "..", "greeter.proto"));

app.use(logRequest);
app.use({ greetMe });

app.start("0.0.0.0:50051");
