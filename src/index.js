import { processFiles } from "./partA.js";
import { findMinimumUserSet } from "./partB.js";

processFiles()
  .then((result) => {
    console.log("Resultado Parte A:");
    console.log(JSON.stringify(result, null, 2));

    const minimumUserSet = findMinimumUserSet(result);
    console.log("Resultado Parte B:");
    console.log(minimumUserSet);
  })
  .catch((err) => {
    console.error(err);
  });
