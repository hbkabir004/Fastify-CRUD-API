const fastify = require('fastify')();

// Initialize an array to store data (simulating a database)
// const data = [];

const data = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" }
    //  curl -X PUT -H "Content-Type: application/json" -d '{ id: 1, name: "ABIR" }' http://localhost:3000/items/1
];

// const getNextId = () => Math.max(...data.map(item => item.id)) + 1;

// Create route for getting all items (Read operation)
fastify.get('/items', (request, reply) => {
    reply.send(data);
});

// Read a specific item by ID
fastify.get('/items/:id', (request, reply) => {
    const id = parseInt(request.params.id);
    const item = data.find(item => item.id === id);
    if (!item) {
        return reply.code(404).send({ message: 'Item not found' });
    }
    return item;
});

// Create route for adding an item (Create operation)
//Test Command: curl -X POST -H "Content-Type: application/json" -d '{"name": "New Item"}' http://localhost:3000/items
fastify.post('/items', (request, reply) => {
    const newItem = request.body;
    data.push(newItem);
    reply.code(201).send(newItem);
});

// Create route for updating an item (Update operation)
//Test Command: curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Item"}' http://localhost:3000/items/0
fastify.put('/items/:id', (request, reply) => {
    const { id } = request.params;
    const updatedItem = request.body;
    let found = false;
    data = data.map(item => {
        if (item.id === id) {
            found = true;
            reply.send({ ...item, ...updatedItem });
        }
        reply.send(item);
    });
    if (!found) {
        return reply.code(404).send({ message: 'Item not found' });
    }
    return { message: 'Item updated successfully' };
});

// Create route for deleting an item (Delete operation)
//Test Command: curl -X DELETE http://localhost:3000/items/0
fastify.delete('/items/:id', (request, reply) => {
    const { id } = request.params;
    const deletedItem = data.splice(id, 1)[0];
    reply.send(deletedItem);
});

// Start the server
fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is RUNNING`);
    // else {
    // reply.send({ message: 'Server is RUNNING' });
    // }
    // console.log(`Server is listening on ${port}`);
});

