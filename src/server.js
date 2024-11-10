'use strict';

const Hapi = require('@hapi/hapi');

// In-memory storage for notes
let notes = [];

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Route to create a new note
    server.route({
        method: 'POST',
        path: '/notes',
        handler: (request, h) => {
            const { title, content } = request.payload;
            const newNote = {
                id: notes.length + 1,
                title,
                content
            };
            notes.push(newNote);
            return h.response(newNote).code(201);
        }
    });

    // Route to get all notes
    server.route({
        method: 'GET',
        path: '/notes',
        handler: (request, h) => {
            return notes;
        }
    });

    // Route to get a single note by ID
    server.route({
        method: 'GET',
        path: '/notes/{id}',
        handler: (request, h) => {
            const note = notes.find(n => n.id === parseInt(request.params.id));
            if (!note) {
                return h.response({ message: 'Note not found' }).code(404);
            }
            return note;
        }
    });

    // Route to update a note by ID
    server.route({
        method: 'PUT',
        path: '/notes/{id}',
        handler: (request, h) => {
            const noteId = parseInt(request.params.id);
            const index = notes.findIndex(n => n.id === noteId);
            if (index === -1) {
                return h.response({ message: 'Note not found' }).code(404);
            }
            const { title, content } = request.payload;
            notes[index] = { id: noteId, title, content };
            return notes[index];
        }
    });

    // Route to delete a note by ID
    server.route({
        method: 'DELETE',
        path: '/notes/{id}',
        handler: (request, h) => {
            const noteId = parseInt(request.params.id);
            const index = notes.findIndex(n => n.id === noteId);
            if (index === -1) {
                return h.response({ message: 'Note not found' }).code(404);
            }
            notes.splice(index, 1);
            return h.response({ message: 'Note deleted' }).code(204);
        }
    });

    try {
        await server.start();
        console.log('Server running on %s', server.info.uri);
    } catch (err) {
        console.log(err);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// Initialize the server
init();