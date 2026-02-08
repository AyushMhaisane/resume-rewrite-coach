const User = require('../models/User');
const generateTokens = require('../utils/generateTokens');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Create user (Password hashing happens automatically in Model)
        const user = await User.create({
            name,
            email,
            password
        });

        // 3. Generate Tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // 4. Save Refresh Token to Database (Hybrid Auth)
        user.refreshToken = refreshToken;
        await user.save();

        // 5. Respond
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            accessToken,   // Frontend stores in memory/variable
            refreshToken   // Frontend stores in localStorage/cookie
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check for user
        // We strictly need the password here, so we use .select('+password')
        const user = await User.findOne({ email }).select('+password');

        // 2. Check password match
        if (user && (await user.matchPassword(password))) {

            // 3. Generate new tokens
            const { accessToken, refreshToken } = generateTokens(user._id);

            // 4. Update Refresh Token in DB
            user.refreshToken = refreshToken;
            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isPro: user.isPro, // Send Pro status for UI logic
                accessToken,
                refreshToken
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    // req.user was set by our middleware!
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isPro: req.user.isPro
    });
};

module.exports = { registerUser, loginUser, getMe };