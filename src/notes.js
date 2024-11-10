const notes = [];
const { title, tags, body } = request.payload;
const note = {
    id: generateId(), // Anda perlu membuat fungsi untuk generate ID
    title: title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: tags,
    body: body
};

// Menambahkan note baru ke array notes
notes.push(note);

module.exports = notes;