import jwt from 'jsonwebtoken';
export function generateToken(userInfo) {
  if (!userInfo) {
    return null;
  }

  return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(username, token) {
  return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
    if (error) {
      return { verified: false, message: 'Invalid token' };
    }
    if (response.username !== username) {
      return {
        verified: false,
        message: 'Invalid user',
      };
    }
    return {
      verified: true,
      message: 'Verified',
    };
  });
}
