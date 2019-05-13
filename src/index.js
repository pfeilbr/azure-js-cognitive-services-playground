require("dotenv").config();

const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const {
  ComputerVisionClient,
  ComputerVisionModels,
  ComputerVisionMappers
} = require("@azure/cognitiveservices-computervision");
const fs = require("fs");
const path = require("path");

const handwritingSampleFormURL = `https://www.researchgate.net/profile/Khurram_Khurshid2/publication/311211875/figure/fig10/AS:668652579876867@1536430606108/A-sample-filled-form-from-the-NIST-database-6.png`;
const handwritingSampleFormFileName = "handwriting-sample-form.png";
const handwritingSampleFormPath = path.join(
  __dirname,
  "..",
  "assets",
  "images",
  handwritingSampleFormFileName
);

const log = s => {
  const outputString = typeof s === "string" ? s : JSON.stringify(s, null, 2);
  console.log(outputString);
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const runHandwrittenOCRForURL = async () => {
  const clientId = process.env["CLIENT_ID"];
  const secret = process.env["APPLICATION_SECRET"];
  const tenantId = process.env["DOMAIN"];
  const subscriptionId = process.env["SUBSCRIPTION_ID"];
  const cognitiveServicesEndpoint = process.env[`COGNITIVE_SERVICES_ENDPOINT`];

  const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(
    clientId,
    secret,
    tenantId
  );
  creds.authContext;
  const client = new ComputerVisionClient(creds, cognitiveServicesEndpoint);

  try {
    // this was needed to get to work, but looks like an issue
    // see https://github.com/Azure/azure-sdk-for-js/issues/2715
    const requestOptions = {
      customHeaders: {
        "Ocp-Apim-Subscription-Key": process.env.COGNITIVE_SERVICES_KEY
      }
    };

    const models = await client.listModels(requestOptions);
    log(models);

    // async operation
    const batchReadFileResp = await client.batchReadFile(
      "Handwritten",
      handwritingSampleFormURL,
      requestOptions
    );
    log(batchReadFileResp);
    const operationId = batchReadFileResp.operationLocation
      .split("/")
      .reverse()[0];

    // poll for results
    let readOperationResultResp;
    do {
      readOperationResultResp = await client.getReadOperationResult(
        operationId,
        requestOptions
      );
      /*
        shape(s)

        {
            "status": "Running"
        }

        {
            "status": "Succeeded"
            "recognitionResults": { ... }
        }
        */
      const sleepInSeconds = 1;
      log(`sleeping ${sleepInSeconds} seconds while image is processed ...`);

      await sleep(sleepInSeconds * 1000);
    } while (
      readOperationResultResp.status &&
      readOperationResultResp.status !== "Succeeded"
    );
    log(readOperationResultResp);
  } catch (e) {
    console.error(e);
  }
};

runHandwrittenOCRForURL();
