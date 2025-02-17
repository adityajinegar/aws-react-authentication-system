import AWS from '@aws-sdk/client-s3';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth.mjs';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { buildResponse } from '../utils/util.mjs';
// AWS.config.update({
//   region: 'us-east-2',
// });

const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client);
const userTable = 'react-app-users';

export async function login(user) {
  const username = user.username;
  const password = user.password;
  if (!user || !username || !password) {
    return buildResponse(401, {
      message: 'Username and Password are required',
    });
  }
  const dynamoUser = await getUser(username.toLowerCase().trim());
  if (!dynamoUser || !dynamoUser.username) {
    return buildResponse(403, { message: 'User does not exist' });
  }
  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return buildResponse(403, { message: 'Password is incorrect' });
  }

  const userInfo = {
    username: dynamoUser.username,
    name: dynamoUser.name,
  };
  const token = generateToken(userInfo);
  const response = {
    user: userInfo,
    token: token,
  };
  return buildResponse(200, response);
}

async function getUser(username) {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };
  return await ddbDocClient.get(params).then(
    (response) => {
      return response.Item;
    },
    (error) => {
      console.error('There is an error getting user: ', error);
    },
  );
}
