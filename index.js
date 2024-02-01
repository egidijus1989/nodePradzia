//core modules////
const fs = require("fs");
const http = require("http");
const url = require("url");
const findProductByName = require("./modules/findProductByName.js");
const findProductByFrom = require("./modules/findProductByFrom.js");
const minPrice = require("./modules/minprice.js");
const productSorting = require("./modules/productSorting.js");
// let textFromFile = fs.readFileSync(`${__dirname}/txt/input.txt`, 'utf-8', (error, data)=>{
//     console.lof(data)
// })

// let textSplit = textFromFile.split(" ")

// for (let word of textSplit){
//     if(word.slice(-2) === "ad"){
//         fs.appendFileSync(`${__dirname}/txt/validatesWords.txt`, word + "\n")
//     }
// }

let products = fs.readFileSync(`${__dirname}/products/products.json`, "utf-8");
let productsInJSON = JSON.parse(products);
//server //
const hostname = "localhost";
const port = "8888";

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  switch (pathname) {
    case "/":
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end("Hello world");
      break;
    //////////////////////////////////////////////////////////////////////////
    case "/api/products":
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(products);
      break;
    /////////////////////////////////////////////////////////////////////////////
    case `/api/product`:
      for (let product of productsInJSON) {
        if (product.id == query.id) {
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(product));
          break;
        }
      }
      break;
    /////////////////////////////////////////////////////////////////////////////////
    case "/api/products/cheapest":
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ cheapest: minPrice(productsInJSON) }));
      break;
    ///////////////////////////////////////////////////////////////////////////////
    case "/api/products/short":
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      productSorting(productsInJSON, query["order"]);
      res.end(JSON.stringify(productsInJSON));
      break;
    ///////////////////////////////////////////////////////////////////////////////
    case "/api/products/findByName":
      const foundedProduct = findProductByName(productsInJSON, query["name"]);
      if (foundedProduct.length === 0) {
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.end("Product not found");
        break;
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(foundedProduct));
        break;
      }
    ///////////////////////////////////////////////////////////////////////////////
    case "/api/products/findByFrom":
      const foundedProduct2 = findProductByFrom(productsInJSON, query["from"]);
      if (foundedProduct2.length === 0) {
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.end("Product not found");
        break;
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(foundedProduct2));
        break;
      }
    ///////////////////////////////////////////////////////////////////////////////
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end("Page not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is listening on port ${port}`);
});
