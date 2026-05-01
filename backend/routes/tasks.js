const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, project: projectId, assignedTo, status, dueDate } = req.body;
    
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    const isOwner = project.owner.equals(req.user._id);
    const isMember = project.members.some(m => m.equals(req.user._id));
    
    if (!isOwner && !isMember) {
      return res.status(403).json({ message: 'Not authorized for this project' });
    }

    const taskData = {
      title,
      description,
      project: project._id,
      dueDate,
      status: status || 'todo'
    };

    if (assignedTo && assignedTo.trim()) {
      taskData.assignedTo = assignedTo;
    }

    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid ID format for ${error.path}` });
    }
    res.status(500).json({ message: 'Unable to create task' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const userProjects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id }
      ]
    });
    
    const projectIds = userProjects.map(p => p._id);

    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user._id },
        { project: { $in: projectIds } }
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
    const project = task.project;
    const isOwner = project.owner.equals(req.user._id);
    const isMember = project.members.some(m => m.equals(req.user._id));

    if (!isOwner && !isMember) {
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
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid ID format for ${error.path}` });
    }
    res.status(500).json({ message: 'Unable to update task' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const project = task.project;
    if (!project.owner.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only project owner or admin can delete task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: `Invalid ID format for ${error.path}` });
    }
    res.status(500).json({ message: 'Unable to delete task' });
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
