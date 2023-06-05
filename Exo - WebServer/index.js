// Importation du module HTTP st4
const http = require('http');

const port = 8001;

// Création du serveur st5
const server = http.createServer((req, res) => {

    
    console.log(req.url, req.method)
    // Récupération info routing st6
    const url = req.url.toLocaleLowerCase();
    const method = req.method;

    // Création d'une regex qui va récupérer APRÈS /product un id st7
    const productRegex = /(?<=^\/product\/)[0-9]+$/;

    //Routing st8
    if (method === 'GET' && url === '/') {
        const body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Demo</title>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
        </html>
    `;

    res.end(body);
    }

    else if (method === 'GET' && productRegex.test(url)) {
        const productId = productRegex.exec(url)
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Demo</title>
        </head>
        <body>
            <h1>Product Id : ${productId}</h1>
        </body>
        </html>
        `);
    }

    else {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Demo</title>
        </head>
        <body>
            <h1>Error 404</h1>
        </body>
        </html>
        `);
    }
});


// Démarrage du serveur st5
server.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
  