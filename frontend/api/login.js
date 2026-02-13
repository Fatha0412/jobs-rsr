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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account has been deactivated' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      resume: user.resume,
      skills: user.skills,
      education: user.education,
      experience: user.experience,
      bio: user.bio,
      profileImage: user.profileImage,
      company: user.company,
      designation: user.designation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
