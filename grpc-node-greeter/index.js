const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const proto = protoLoader.loadSync(path.join(__dirname, "..", "greeter.proto"));
const definition = grpc.loadPackageDefinition(proto);

const greetMe = (call, callback) => {
  callback(null, { reply: `Hey ${call.request.name}!` });
};

const server = new grpc.Server();
server.addService(definition.GreeterService.service, { greetMe });
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), port => {
  server.start();
});
