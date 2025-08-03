import {createServer} from 'node:http';
import { request, RequestOptions , IncomingHttpHeaders} from 'http';


const server = createServer((req,res) => {

    if (req.method == 'GET' && req.url == '/'){
        res.writeHead(200,{'content-type' : 'application/json'});
        res.end(JSON.stringify({ message: "Welcome to the server" }));
    }
    else if (req.method == 'GET' && req.url == '/about'){
        res.writeHead(200,{'content-type' : 'application/json'});
        res.end(JSON.stringify({ message: "This is the about route" }));
    }
    else {
        res.writeHead(404,{'content-type' : 'application/json'});
     res.end(JSON.stringify({ message: "not found" }));
    }
    
})

const port = 3000;

server.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}/`);
});


// type strongResponse = {
//     statusCode : number | undefined;
//     headers : IncomingHttpHeaders;
//     body : JSON;
// }


function makeRequest(options : RequestOptions, data?  : any) : Promise<any> {
    return new Promise((resolve,reject)=>{

        const req = request(options, (res) => {
            let responseDate = '';
            res.on('data',(chunk) => {
                responseDate += chunk
            });
            res.on('end',()=> {
                //   try {
                    
                //     console.log('paring JSON');
                //     console.log(responseDate);
                //     const jsonResponse = JSON.parse(responseDate || '{}');
                    
                //     resolve({
                //         statusCode: res.statusCode,
                //         headers: res.headers,
                //         body: jsonResponse
                //     });
                // } catch (e) {
                //     resolve({
                //         statusCode: res.statusCode,
                //         headers: res.headers,
                //         body: JSON.stringify({"message" : "not JSON"})
                //     });
                // }

                 resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: responseDate
                    });
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();

    });
}


async function testApi() {
    console.log('start test ..............')

    try {

        const req = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/',
            method: 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('testing home rout');
        console.log(`response status code ${req.statusCode}\n`)
        console.log(`response body  ${req.body}\n`)

    } catch(err){
        console.error('Test 1 failed:', err);
    }


     try {

        const req = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/about',
            method: 'GET'
        });

        console.log('testing about rout');
        console.log(`response status code ${req.statusCode}\n`)
        console.log(`response body  ${req.body}\n`)

    } catch(err){
        console.error('Test 2 failed:', err);
    }

       try {

        const req = await makeRequest({
            hostname: 'localhost',
            port: 3000,
            path: '/anything',
            method: 'GET'
        });

        console.log('testing anything rout');
        console.log(`response status code ${req.statusCode}\n`)
        console.log(`response body  ${req.body}\n`)

    } catch(err){
        console.error('Test 3 failed:', err);
    }


    setTimeout(() => {
        server.close();
    }, 10000);
}



testApi();