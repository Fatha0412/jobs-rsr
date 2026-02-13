import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../../backend/models/User';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mohammedfatha04_db_user:QE7Fi9fcWwt48IoJ@cluster0.hkgkqdv.mongodb.net/";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!mongoose.connection.readyState) {
    await mongoose.connect(MONGO_URI);
  }

  try {
    const { name, email, password, role, phone, company, designation } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      phone: phone || '',
    };
    if (role === 'hr') {
      userData.company = company || '';
      userData.designation = designation || '';
    }
    const user = await User.create(userData);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
