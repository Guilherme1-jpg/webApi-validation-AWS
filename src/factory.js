const AWS = require("aws-sdk");
// IS_OFFLINE = true;

const isLocal = process.env.IS_OFFLINE;

if (isLocal) {
  //variaveis setadas no compose
  AWS.config.update({
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
  });
}

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
  endpoint: isLocal ? new AWS.Endpoint(`http://localhost:4566`) : undefined,
});
module.exports = {
  dynamoDB,
};
