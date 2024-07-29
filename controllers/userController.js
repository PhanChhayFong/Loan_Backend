// controllers/userController.js
const { v4: uuidv4 } = require('uuid');
const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try { 
    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
    let imgBase64 = null;
    if (req.file) {
      imgBase64 = req.file.buffer.toString('base64');
    }
    
    const user = await User.create({
      id: uuidv4(),
      create_by: req.body.create_by,
      create_date: new Date(),
      modify_by: null,
      modify_date: null,
      status: req.body.status,
      dob: req.body.dob,
      username: req.body.username,
      passwordHash: hashedPassword,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      img: imgBase64,
      role_id: req.body.role_id,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        as: 'role',
        attributes: ['role_name'], // Only include role_name from Role
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        as: 'role',
        attributes: ['role_name'], // Only include role_name from Role
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if email already exists
    
    // Find the user by id
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (req.body.email && req.body.email !== user.email) {
      const existingUserWithEmail = await User.findOne({ where: { email: req.body.email } });
      if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        return res.status(400).json({ error: "Email already in use by another user" });
      }
    }
    // Update fields if they are provided in the request body
    if (req.body.password) {
      user.passwordHash = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.body.username !== undefined) {
      user.username = req.body.username;
    }
    if (req.body.email !== undefined) {
      user.email = req.body.email;
    }
    if (req.body.phonenumber !== undefined) {
      user.phonenumber = req.body.phonenumber;
    }
    if (req.body.dob !== undefined) {
      user.dob = req.body.dob;
    }
    if (req.body.address !== undefined) {
      user.address = req.body.address;
    }
    if (req.body.role_id !== undefined) {
      user.role_id = req.body.role_id;
    }
    
    // Update modify_by and modify_date
    user.modify_by = req.body.modify_by || null;
    user.modify_date = new Date();
    
    // Handle profile image update if provided
    if (req.file) {
      user.img = req.file.buffer.toString('base64');
    }

    // Save the updated user
    await user.save();
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by id
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.status !== undefined) {
      user.status = req.body.status;
    }

    // Save the updated user
    await user.save();
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      include: {
        model: Role,
        as: 'role',
        attributes: ['role_name'], // Only include role_name from Role
      },
    });
    const secret = process.env.SECRET;

    if (!user) {
      return res.status(400).send("This Email not found");
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.passwordHash);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_TIME }
      );

      res.status(200).send({
        user: user,
        token: token,
        role: user.role.role_name,
      });
    } else {
      res.status(400).send("Password is wrong!");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  updateUserStatus,
};
