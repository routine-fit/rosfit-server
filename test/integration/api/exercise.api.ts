/* eslint-disable @typescript-eslint/no-explicit-any */
import { logData, logInformation } from '../../utils/report-generation';
import { integrationClient } from '..';
import { modifyExercise } from '../mock-data';

export type ExerciseInput = {
  name: string;
  muscleGroup: string;
  links?: {
    create: {
      url: string;
    };
  };
};

export const createExercise = async (token: string, exercise: ExerciseInput) => {
  const title = `CREATE EXERCISE - ${exercise.name}`;
  try {
    const response = await integrationClient.post('/exercise', exercise, {
      headers: { Authorization: token },
    });
    logData(title, response);
    logInformation(`EXERCISE CREATED ${response.data.data.id} - ${response.data.data.name}`);
    return response.data.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const getExercises = async (token: string) => {
  const title = 'GET EXERCISES';
  try {
    const response = await integrationClient.get('/exercise', {
      headers: { Authorization: token },
    });
    logData(title, response);
    return response.data.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const getExerciseById = async (token: string, exerciseId: string) => {
  const title = `GET EXERCISE ID: ${exerciseId}`;
  try {
    const response = await integrationClient.get(`/exercise/${exerciseId}`, {
      headers: { Authorization: token },
    });
    logData(title, response);
    return response.data.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const editExercise = async (token: string, exerciseId: string) => {
  const title = `EDIT EXERCISE - ${exerciseId}`;
  try {
    const response = await integrationClient.put(`/exercise/${exerciseId}`, modifyExercise, {
      headers: { Authorization: token },
    });
    logData(title, response);
    logInformation(`EXERCISE EDITED ${response.data.data.id} - ${response.data.data.name}`);
    return response.data.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const deleteExercise = async (token: string, exerciseId: string) => {
  const title = `DELETE EXERCISE - ${exerciseId}`;
  try {
    const response = await integrationClient.delete(`/exercise/${exerciseId}`, {
      headers: { Authorization: token },
    });
    logData(title, response);
    logInformation(`EXERCISE DELETED ${response.data.data.id}`);
    return response.data.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};
