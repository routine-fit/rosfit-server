declare module Express {
  export interface Request {
    firebaseUid: string;
    // TODO: Get type from FirebaseUser interface
    firebaseType: 'ADMIN' | 'NORMAL';
  }
}
