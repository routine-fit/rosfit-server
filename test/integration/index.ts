import axios from 'axios';
import dotenv from 'dotenv';

import { appendToReport, createFileReport, logInformationTitle } from '../utils/report-generation';
import * as exerciseApi from './api/exercise.api';
import * as meApi from './api/me.api';
import * as routineApi from './api/routine.api';
import {
  modifyRoutine,
  newExercise,
  newExerciseWithLinks,
  newRoutine,
  userCredentials,
} from './mock-data';

dotenv.config();

export const integrationClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const generateReport = async () => {
  createFileReport();

  appendToReport('# Firebase\n\n');
  logInformationTitle('firebase user');

  const { idToken } = await meApi.signUpFirebase(userCredentials);
  // await meApi.signInFirebase(userCredentials);

  appendToReport('# User information\n\n');

  await meApi.createMyInformation(idToken);
  const { id: trainingPreferenceId } = await meApi.createMyTrainingPreference(idToken);
  await meApi.updateMyTrainingPreference(idToken, trainingPreferenceId);
  await meApi.createGrowthRecord(idToken);
  await meApi.createGrowthRecord(idToken);
  await meApi.createGrowthRecord(idToken);
  await meApi.getMyInformation(idToken);

  appendToReport('# Exercises\n\n');

  const createdExercise = await exerciseApi.createExercise(idToken, newExercise);
  const createdExerciseWithLink = await exerciseApi.createExercise(idToken, newExerciseWithLinks);

  await exerciseApi.getExercises(idToken);

  await exerciseApi.getExerciseById(idToken, createdExercise.id);
  await exerciseApi.getExerciseById(idToken, createdExerciseWithLink.id);

  await exerciseApi.editExercise(idToken, createdExercise.id);

  appendToReport('# Routines\n\n');

  const mockedRoutine = newRoutine(createdExercise.id, createdExerciseWithLink.id);
  const createdRoutine = await routineApi.createRoutine(idToken, mockedRoutine);

  await routineApi.getRoutines(idToken);

  await routineApi.getRoutineById(idToken, createdRoutine.id);

  const modifiedRoutine = modifyRoutine(createdRoutine, createdExercise, createdExerciseWithLink);
  await routineApi.editRoutine(idToken, modifiedRoutine);

  appendToReport('# Remove everything\n\n');

  await routineApi.deleteRoutine(idToken, createdRoutine.id);

  await exerciseApi.deleteExercise(idToken, createdExercise.id);
  await exerciseApi.deleteExercise(idToken, createdExerciseWithLink.id);
};

generateReport();
