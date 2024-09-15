/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { logData, logInformation } from '../../utils/report-generation';
import { integrationClient } from '..';

export type UserCredentials = { email: string; password: string };

export const signUpFirebase = async (user: UserCredentials) => {
  const title = 'FIREBASE SIGN-UP';
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
      user,
    );

    logData(title, response);
    logInformation(`${title} Sign up with email: ${user.email} and password: ${user.password}`);
    return response.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const signInFirebase = async (user: UserCredentials) => {
  const title = 'FIREBASE SIGN-IN';
  try {
    const response = await axios.post<{
      kind: string;
      localId: string;
      email: string;
      displayName: string;
      idToken: string;
      registered: boolean;
      refreshToken: string;
      expiresIn: string;
    }>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      user,
    );
    logData(title, response);
    logInformation(`${title} Sign in with email: ${user.email}`);

    return response.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const getMyInformation = async (token: string) => {
  const title = 'GET ME';
  try {
    const response = await integrationClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    logData(title, response);
    logInformation(`${title} GET - MY PERSONAL INFORMATION`);
    return response.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};
