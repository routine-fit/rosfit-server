import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

import data from '../data';
import { seedFirebaseDatabase } from './firebase';
import { padMessage } from './utils';

const prisma = new PrismaClient();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

const ENV = process.env['ENV'];
const FIREBASE_AUTH_EMULATOR_HOST = process.env['FIREBASE_AUTH_EMULATOR_HOST'];

(async () => {
  try {
    console.log();
    console.log('\x1b[36m', padMessage('-----------------------', ' '));
    console.log('\x1b[36m', padMessage('| Board configuration |'));
    console.log('\x1b[36m', padMessage('-----------------------', ' '));
    console.log('\x1b[36m'.padStart(10), 'Seeding env:', `\x1b[37m${ENV}\n`);
    console.log(
      '\x1b[36m'.padStart(10),
      'Connected to emulators:',
      `\x1b[36m${FIREBASE_AUTH_EMULATOR_HOST ? '✅' : '🛑'}\n`,
    );
    console.log('\x1b[36m', padMessage('-----------------------', '-').replace(/\s/gi, '-'), '\n');

    console.log('\x1b[36m', padMessage('⚡️ Removing data from database'));

    await prisma.summaryRoutineExerciseSerie.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Summary RExercises Series removed'));
    await prisma.summaryRoutineExercise.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Summary RExercises removed'));
    await prisma.summaryRoutine.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Summary Routines removed'));

    await prisma.serieRoutineExercise.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 RExercises Series removed'));
    await prisma.routineExercise.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 RExercises removed'));

    await prisma.scheduleRoutine.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Scheduled Routines removed'));

    await prisma.routine.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Routines removed'));

    await prisma.exerciseLink.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Exercise links removed'));
    await prisma.exercise.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Exercises removed'));
    await prisma.growthRecord.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Growth records removed'));
    await prisma.trainingPreference.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Training preferences removed'));
    await prisma.userInfo.deleteMany({});
    console.log('\x1b[37m', padMessage('🚀 Users info removed'));

    console.log();

    await seedFirebaseDatabase();

    console.log();

    console.log('\x1b[36m', padMessage('⚡️ Adding new data to database'));

    await prisma.userInfo.createMany({ data: data.usersInfo });
    console.log('\x1b[37m', padMessage('🚀 Users info added'));
    await prisma.growthRecord.createMany({ data: data.growthRecords });
    console.log('\x1b[37m', padMessage('🚀 Growth records added'));
    await prisma.trainingPreference.createMany({ data: data.trainingPreferences });
    console.log('\x1b[37m', padMessage('🚀 Training preferences added'));
    await prisma.exercise.createMany({ data: data.exercises });
    console.log('\x1b[37m', padMessage('🚀 Exercises added'));
    const exercises = await prisma.exercise.findMany({});
    await prisma.exerciseLink.createMany({ data: data.generateExerciseLinks(exercises) });
    console.log('\x1b[37m', padMessage('🚀 Exercise links added'));
    await prisma.routine.createMany({ data: data.routines });
    console.log('\x1b[37m', padMessage('🚀 Routines added'));
    await prisma.routineExercise.createMany({ data: data.routineExercises });
    console.log('\x1b[37m', padMessage('🚀 Routines Exercises added'));
    await prisma.serieRoutineExercise.createMany({ data: data.routineExercisesSeries });
    console.log('\x1b[37m', padMessage('🚀 Routines Exercises Series added'));
    await prisma.scheduleRoutine.createMany({ data: data.scheduleRoutines });
    console.log('\x1b[37m', padMessage('🚀 Scheduled Routines added'));
    await prisma.summaryRoutine.createMany({ data: data.summaryRoutines });
    console.log('\x1b[37m', padMessage('🚀 Summary Routines added'));
    await prisma.summaryRoutineExercise.createMany({ data: data.summaryRoutineExercises });
    console.log('\x1b[37m', padMessage('🚀 Summary Routines Exercises added'));
    await prisma.summaryRoutineExerciseSerie.createMany({
      data: data.summaryRoutineExerciseSeries,
    });
    console.log('\x1b[37m', padMessage('🚀 Summary Routines Exercises Serie added'));

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.log('\n \x1b[0m 🛑', error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
