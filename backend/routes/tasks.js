const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.project);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.members.includes(req.user._id) && !project.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized for this project' });
    }

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      project: project._id,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
    });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create task', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user._id },
      ],
    }).populate('project', 'title').populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load tasks', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!task.project.members.includes(req.user._id) && !task.project.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized for this task' });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.assignedTo = req.body.assignedTo || task.assignedTo;
    task.dueDate = req.body.dueDate || task.dueDate;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update task', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!task.project.owner.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only project owner or admin can delete task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete task', error: error.message });
  }
});

router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load project tasks', error: error.message });
  }
});

module.exports = router;
