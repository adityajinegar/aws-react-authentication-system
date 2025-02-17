import { buildResponse } from '../utils/util.mjs';
import { verifyToken } from '../utils/auth.mjs';

export function verify(requestBody) {
  if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
    return buildResponse(401, {
      verified: false,
      message: 'Incorrect request body',
    });
  }

  const user = requestBody.user;
  const token = requestBody.token;
  const verification = verifyToken(user.username, token);
  if (!verification.verified) {
    return buildResponse(401, verification);
  }
  return buildResponse(200, {
    verified: true,
    message: 'Success',
    user: user,
    token: token,
  });
}
