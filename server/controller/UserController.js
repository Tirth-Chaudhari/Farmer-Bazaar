const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken, verifyToken } = require('../authentication/token');

// Register a new user
exports.register = async (req, res) => {

  const { name, email, password, contactInfo } = req.body;
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contactInfo,
    });

    const user=await newUser.save();

    const token = generateToken(user._id);

    
    return res.status(201).json({ message: 'User registered successfully!',token });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user._id);
    
  return  res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Verify token middleware
exports.verifyTokenMiddleWare = (req, res) => {
  
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  try {
    const decoded = verifyToken(token);
  
    return res.status(200).json({message:'Valid Token',decoded})
  } catch (error) {
    return es.status(403).json({ message: 'Invalid token' });
  }
};
