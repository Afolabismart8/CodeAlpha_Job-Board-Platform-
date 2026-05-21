const User = require ("../models/userModel");
const bcrypt =require ("bcrypt");
const jwt = require ("jsonwebtoken");


exports.Register = async (req,res) => {
    try {  const { name, email, password, role} = req.body;
           const existingUser = await User.findOne({email})
           if (existingUser) {
            return res.status(406).json({status: "error", message:"User already exist"})
           };

           const hashpassword = await bcrypt.hash (password, 10);
           const user = await User.create({
            name,
            email,
            password: hashpassword,
            role
           })
           res.status(201).json({status: "Success", message:user})

    }
      catch (error) {console.log(error); res.status(500).json({
    status: "error",
    message: error.message
  });
}
}


exports.Login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};