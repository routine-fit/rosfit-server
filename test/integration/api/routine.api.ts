/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoutineExerciseInput, ScheduleRoutineInput } from '../../../src/interfaces/routine';
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

export const createScheduleRoutine = async (token: string, body: ScheduleRoutineInput) => {
  const title = `SCHEDULE ROUTINE - ${body.routineId}`;
  try {
    const response = await integrationClient.post('/routine/schedule', body, {
      headers: { Authorization: token },
    });
    logData(title, response);
    logInformation(`ROUTINE SCHEDULED ${response.data.data.id}`);
    return response.data.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};

export const getScheduleRoutines = async (token: string) => {
  const title = 'GET SCHEDULE ROUTINES';
  try {
    const response = await integrationClient.get('/routine/schedule', {
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

export const getScheduleRoutinesByDay = async (token: string, day: string) => {
  const title = `GET SCHEDULE ROUTINES BY DAY - ${day}`;
  try {
    const response = await integrationClient.get(`routine/schedule?day=${day}`, {
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

export const deleteScheduleRoutine = async (token: string, routineId: string) => {
  const title = `DELETE SCHEDULE ROUTINE: ${routineId}`;
  try {
    const response = await integrationClient.delete(`/routine/schedule/${routineId}`, {
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
