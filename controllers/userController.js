const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // BONUS: delete associated thoughts when deleted
      //  await Application.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
};


// const router = require('express').Router();
// const { User } = require('../../models');

// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findOne({ _id: req.params.id })
//             .select('-__v');
//         if (!user) {
//             return res.status(404).json({ message: 'No user with that ID' });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.put('/', async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.delete('/', async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;