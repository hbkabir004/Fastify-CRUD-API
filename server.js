const app = require('fastify')({ logger: true });
const routes = require('./routes/app-routes');

app.register(routes);

// Start the server
app.listen({ port: 5000 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is RUNNING on port: ${app.server.address().port}`);
});
