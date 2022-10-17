"use strict";

const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, ".not-organic");
  }

  return output;
};

const tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((request, response) => {
  const pathName = request.url;

  // Overview page
  if (pathName === "/overview" || pathName === "/") {
    response.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObject
      .map((element) => replaceTemplate(tempCard, element))
      .join("");

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    response.end(output);
  }

  // Product page
  else if (pathName === "/product") {
    response.end("This is the PRODUCT.");
  }

  // API
  else if (pathName === "/api") {
    response.writeHead(200, {
      "Content-type": "application/json",
      "my-own-header": "api",
    });
    response.end(data);
  }

  // Not found
  else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    response.end("<h1>This page cannot be found.</h1>");
  }

  // response.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
