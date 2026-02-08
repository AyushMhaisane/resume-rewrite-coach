const jwt = require('jsonwebtoken');

const generateTokens = (id) => {
    // 1. Access Token: Short-lived (15m)
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });

    // 2. Refresh Token: Long-lived (7d)
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });

    return { accessToken, refreshToken };
};

module.exports = generateTokens;