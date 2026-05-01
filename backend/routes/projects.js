const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const Project = require('../models/Project');
const User = require('../models/User');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      owner: req.user._id,
      members: req.body.members || [req.user._id],
    });
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create project', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id },
      ],
    }).populate('owner', 'name email role');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load projects', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.owner.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only owner or admin can update project' });
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.members = req.body.members || project.members;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update project', error: error.message });
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete project', error: error.message });
  }
});

router.get('/members', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load users' });
  }
});

module.exports = router;
