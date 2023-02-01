import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './util/extract-query-params.js';

//query parameters: url stateful => filtros, paginação, não obrigatorios
//route parameters: Identificação de recurso
//request body: Envio de informações de um formulário,  passa pelo (HTTPs)

//http://localhost:3333/users?userId=1&name=Tales
//http://localhost:3333/users/1
//http://localhost:3333/users

const server = http.createServer(async (request, response) => {
  
  const { method, url } = request;
  await json(request, response);
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {

    const routeParams = request.url.match(route.path);

    const {query, ...params} = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end();

});

server.listen(3333);
