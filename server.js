const fastify = require('fastify')({ logger: true });

// Sample data
let items = [
    { id: '1', name: 'Roman', email: 'roman@exateks.com' },
    { id: '2', name: 'Abir', email: 'abir@exateks.com' },
    { id: '3', name: 'Saki', email: 'saki@exateks.com' },
    { id: '4', name: 'Rahmat', email: 'rahmat@exateks.com' }
];


// Get all items
fastify.get('/items', async (request, reply) => {
    return items;
});

// Get a specific item by ID
fastify.get('/items/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const item = items.find(item => parseInt(item.id) === id);
    if (!item) {
        return reply.code(404).send({ message: 'Item not found' });
    }
    return item;
});

// Create a new item
fastify.post('/items', async (request, reply) => {
    const newItem = request.body;
    items.push(newItem);
    return newItem;
});

// Update an existing item
fastify.put('/items/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const updatedItem = request.body;
    console.log(`Uptader Item=> ${request}`);
    let found = false;
    items = items.map(item => {
        if (parseInt(item.id) === id) {
            found = true;
            return { ...item, ...updatedItem };
        }
        return item;
    });
    if (!found) {
        return reply.code(404).send({ message: 'Item not found' });
    }
    return { message: 'Item updated successfully' };
});

// Delete an item
fastify.delete('/items/:id', async (request, reply) => {
    const id = parseInt(request.params.id);
    const initialLength = items.length;
    items = items.filter(item => parseInt(item.id) !== id);
    if (items.length === initialLength) {
        return reply.code(404).send({ message: 'Item not found' });
    }
    return { message: 'Item deleted successfully' };
});

// Start the server
fastify.listen({ port: 5000 }, (err) => {
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
