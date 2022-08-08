import Http from 'http';

async function handler(request, response) {
  try {
    await Promise.reject('Erro dentro do handler');
    for await (const data of request) {
      try {

        await Promise.reject('Erro dentro do for');
      } catch (error) {
        console.log('A server error occurred', error);
        response.writeHead(500);
        response.write(JSON.stringify({ message: 'Internal Server Error' }));
      } finally {
        response.end();
      }
    }

  } catch (error) {
    console.log('A server error occurred', error);
    response.writeHead(500);
    response.write(JSON.stringify({ message: 'Internal Server Error' }));
    response.end();
  }
}

Http.createServer(handler).listen(5001, () => { console.log('Server running on port 5001') });