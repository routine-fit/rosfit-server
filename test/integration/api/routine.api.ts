/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoutineExerciseInput } from '../../../src/interfaces/routine';
import { logData, logInformation } from '../../utils/report-generation';
import { integrationClient } from '..';

export const createRoutine = async (token: string, routine: RoutineExerciseInput) => {
  const title = `CREATE ROUTINE WITH EXERCISES - ${routine.name}`;
  try {
    const response = await integrationClient.post('/routine', routine, {
      headers: { Authorization: token },
    });
    logData(title, response);
    logInformation(`ROUTINE WITH EXERCISES CREATED ${response.data.data.id}`);
    return response.data.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const getRoutines = async (token: string) => {
  const title = 'GET ROUTINES';
  try {
    const response = await integrationClient.get('/routine', {
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

export const getRoutineById = async (token: string, routineId: string) => {
  const title = `GET ROUTINE ID: ${routineId}`;
  try {
    const response = await integrationClient.get(`/routine/${routineId}`, {
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

export const editRoutine = async (token: string, routine: RoutineExerciseInput) => {
  const { id, ...restRoutine } = routine;
  const title = `EDIT ROUTINE: ${id}`;
  try {
    const response = await integrationClient.put(`/routine/${id}`, restRoutine, {
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

export const deleteRoutine = async (token: string, routineId: string) => {
  const title = `DELETE ROUTINE: ${routineId}`;
  try {
    const response = await integrationClient.delete(`/routine/${routineId}`, {
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
