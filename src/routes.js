const routes = [
    {
      method: 'POST',
      path: '/notes',
      handler: addNoteHandler,
    },

    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },

];
const { addNoteHandler, getAllNotesHandler } = require('./handler');
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
});
   
module.exports = { addNoteHandler, getAllNotesHandler };
   
module.exports = routes;