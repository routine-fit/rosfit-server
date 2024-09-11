/* eslint-disable @typescript-eslint/no-explicit-any */
import { logData, logInformation } from '../../utils/report-generation';
import { integrationClient } from '..';

export const createMyInformation = async (token: string) => {
  const title = 'CREATE MY INFORMATION';
  try {
    const response = await integrationClient.post('/onboarding/new', undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    logData(title, response);
    logInformation(title);
    return response.data;
  } catch (error: any) {
    console.error(`ERROR ${title}:`, error.response?.data);
    logData(`${title} - Test error`, error.response);
    throw error;
  }
};
