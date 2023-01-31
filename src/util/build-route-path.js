export function buildRoutePath(path) {

  //busca na rota coisas que começam com dois 
  //+ que seja composto de A a Z maiucuslo ou minusculo, as letras podem repetir mais de uma vez
  //g forma global, todas as ocorrências
  // o parenteses significa que estamos fazendo uma sub pesquisa
  const routeParametersRegex = /:([a-zA-Z]+)/g; 

  return new RegExp(routeParametersRegex);
}