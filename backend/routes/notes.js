const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router()
const { body, validationResult } = require('express-validator');




//Router 1:get all the notes using 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred. Please try again.", message: err.message });
    }

});
//Router 2:add a new note ,login require
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid naem').isLength({ min: 3 }),
    body('description', 'enter valid description must be 5 char long').isLength({ min: 5 }),
    body('tag').exists(),

], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred. Please try again.", message: err.message });
    }
});
//Router 3: update an existing note
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter valid naem').isLength({ min: 3 }),
    body('description', 'enter valid description must be 5 char long').isLength({ min: 10 }),
    body('tag').exists(),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create  a new note object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        return res.json(note);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred. Please try again.", message: err.message });
    }

});


//router:4 delete note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).json({ error: "Not found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        await Notes.findByIdAndDelete(req.params.id);
       // res.json({ success: "Note has been deleted" });
        res.json(note)
        // res.json({"derfd":"wd3edewdx3ijf"});
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred. Please try again.", message: err.message });
    }
});

module.exports = router;