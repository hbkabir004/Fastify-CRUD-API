const members = require('../data/members.json');

function routes(app, opts, done) {
    app.get('/', (request, reply) => {
        reply.send(`Server is  Running Successfully!`);
    });

    // Get all members
    app.get('/members', (request, reply) => {
        return members;
    });

    // Get a specific member by ID
    app.get('/members/:id', (request, reply) => {
        const id = parseInt(request.params.id);
        const member = members.find(member => parseInt(member.id) === id);
        if (!member) {
            return reply.code(404).send({ message: 'member not found' });
        }
        return member;
    });

    // Create a new member
    //Test Command: curl -X POST -H "Content-Type: application/json" -d '{"name": "New Item"}' http://localhost:3000/items
    app.post('/members', (request, reply) => {
        const newmember = request.body;
        members.push(newmember);
        return newmember;
    });

    // Update an existing member's data
    //Test Command: curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Item"}' http://localhost:5000/items/0
    app.put('/members/:id', (request, reply) => {
        const id = parseInt(request.params.id);
        const updatedmember = request.body;
        console.log(`Uptader member=> ${request}`);
        let found = false;
        members = members.map(member => {
            if (parseInt(member.id) === id) {
                found = true;
                return { ...member, ...updatedmember };
            }
            return member;
        });
        if (!found) {
            return reply.code(404).send({ message: 'member not found' });
        }
        return { message: 'member updated successfully' };
    });

    // Delete an member
    //Test Command: curl -X DELETE http://localhost:5000/items/0
    app.delete('/members/:id', (request, reply) => {
        const id = parseInt(request.params.id);
        const initialLength = members.length;
        members = members.filter(member => parseInt(member.id) !== id);
        if (members.length === initialLength) {
            return reply.code(404).send({ message: 'member not found' });
        }
        return { message: 'member deleted successfully' };
    });

    done();
}

module.exports = routes;
