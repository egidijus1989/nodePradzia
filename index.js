//core modules////
const fs = require("fs");
const http = require("http");
const url = require('url');
const findproduct = require('./modules/findProduct')
// let textFromFile = fs.readFileSync(`${__dirname}/txt/input.txt`, 'utf-8', (error, data)=>{
//     console.lof(data)
// })

// let textSplit = textFromFile.split(" ")

// for (let word of textSplit){
//     if(word.slice(-2) === "ad"){
//         fs.appendFileSync(`${__dirname}/txt/validatesWords.txt`, word + "\n")
//     }
// }

let products = fs.readFileSync(`${__dirname}/products/products.json`, 'utf-8')
let productsInJSON = JSON.parse(products)
//server //
const hostname = "localhost"
const port = '8888'

const server = http.createServer((req, res) =>{
    const {query, pathname} = url.parse(req.url, true);
    switch(pathname){
        case "/":
            res.writeHead(200,{
                "Content-Type": 'text/html',
                'my-header': 'I like node'
            })
            res.end("Hello world");
            break;
        case "/api/products":
            res.writeHead(200,{
                "Content-Type": 'application/json',
                'my-header': 'I like node'
            })
            res.end(products);
            break;
        case `/api/product`:
            for(let product of productsInJSON){
                if(product.id == query.id){
                    res.writeHead(200,{
                        "Content-Type": 'application/json',
                        'my-header': 'I like node'
                    })
                    res.end(JSON.stringify(product));
                    break
                }
            }
            break;
        case `/api/min`:
            const minPrice = 0 
                for(let product of productsInJSON){
                    if(){
                        res.writeHead(200,{
                            "Content-Type": 'application/json',
                            'my-header': 'I like node'
                        })
                        res.end(JSON.stringify(product));
                        break
                    }
                }
                break
        default:
            res.writeHead(404,{
                "Content-Type": 'text/html',
                'my-header': 'I like node'
            })
            res.end("Page not found");
    }
})

server.listen(port, hostname, ()=>{
    console.log(`Server is listening on port ${port}`)
})