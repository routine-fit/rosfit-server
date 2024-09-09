import firebaseAdmin from 'firebase-admin';

import { FirebaseUser } from '../../src/interfaces/firebase';
import data from '../data';
import { padMessage } from './utils';

const createFirebaseUser = async (user: FirebaseUser) => {
  const userCreated = await firebaseAdmin.auth().createUser({ ...user });
  await firebaseAdmin.auth().setCustomUserClaims(userCreated.uid, {
    userType: user.type,
  });
  console.log('\x1b[37m', padMessage(`User: ${userCreated.email}`));
};

const deleteFirebaseUsers = async (nextPageToken?: string) => {
  const listUsersResult = await firebaseAdmin.auth().listUsers(100, nextPageToken);
  await firebaseAdmin.auth().deleteUsers(listUsersResult.users.map((user) => user.uid));
  if (listUsersResult.pageToken) {
    await deleteFirebaseUsers(nextPageToken);
  }
};

export const seedFirebaseDatabase = async () => {
  console.log('\x1b[36m', padMessage('⚡️ Removing data from firebase'));
  await deleteFirebaseUsers();
  console.log('\x1b[37m', padMessage('🚀 Firebase users removed'));

  console.log('\x1b[36m', padMessage('⚡️ Adding firebase users'));
  await Promise.all(data.firebaseUsers.map(async (user) => await createFirebaseUser(user)));
  console.log('\x1b[37m', padMessage('🚀 Firebase users added'));
};
