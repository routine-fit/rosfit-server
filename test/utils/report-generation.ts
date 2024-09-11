/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import * as fs from 'fs';

let number = 0;
const pathToFile = 'integration-test-report.md';

export function sliceDataLength(data: any, forConsole = false): string | boolean {
  if (!data) return false;

  let dataString = forConsole ? JSON.stringify(data) : JSON.stringify(data, null, 4);

  if (forConsole && dataString.length > 150) {
    dataString = dataString.slice(0, 150) + '...';
  }

  return forConsole ? dataString : `\`\`\`json\n${dataString}\n\`\`\``;
}

export function createFileReport(filePath = pathToFile): void {
  console.log('# TEST STARTED #\n\n');
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  fs.writeFileSync(filePath, '');

  if (fs.existsSync('report-info.txt')) {
    fs.unlinkSync('report-info.txt');
  }
  fs.writeFileSync('report-info.txt', '');
}

export function appendToReport(content: string, filePath = pathToFile): void {
  fs.appendFileSync(filePath, content);
}

export function logInformationTitle(data: string) {
  fs.appendFileSync('report-info.txt', '\n');
  fs.appendFileSync('report-info.txt', data.toUpperCase() + '\n');
  fs.appendFileSync('report-info.txt', '----------------------------------' + '\n');
}

export function logInformation(data: string) {
  fs.appendFileSync('report-info.txt', data + '\n');
}

export function logData(endpointName: string, response: AxiosResponse): void {
  const request = {
    url: response?.config.url,
    params: response?.config.params,
    method: response?.config.method,
    headers: response?.config.headers,
    body: isJSON(response?.config.data) ? JSON.parse(response?.config.data) : '',
  };
  const isoActualDate = new Date().toISOString();

  appendToReport(
    `\n## ${endpointName} \n\nTime: ${isoActualDate} \n\n### Request \n\n${sliceDataLength(
      request,
    )} \n\n### Response \n>Status: ${response?.status} \n\n${sliceDataLength(response?.data)} \n`,
  );

  number += 1;
  console.log(
    '\n'.padStart(154, '-') +
      `${number}: ${endpointName}\n\n${response?.config
        .url} - Status: ${response?.status}\n${sliceDataLength(response?.data, true)}\n`,
  );
}

export function logError(endpointName: string, error: any): void {
  const request = {
    url: error.config.url,
    params: error.config.params,
    method: error.config.method,
    headers: error.config.headers,
    body: isJSON(error.config.data) ? JSON.parse(error.config.data) : '',
  };
  const isoActualDate = new Date().toISOString();

  appendToReport(
    `\n## ${endpointName} \n\nTime: ${isoActualDate} \n\n### Request \n\n${sliceDataLength(
      request,
    )} \n\n### Error Response \n>Status: ${
      error.response ? error.response?.status : 'N/A'
    } \n\n${sliceDataLength(error.response ? error.response?.data : 'No response data')} \n`,
  );

  number += 1;
  console.log(
    '\n'.padStart(154, '-') +
      `${number}: ${endpointName}\n\n${error.config.url} - Status: ${
        error.response ? error.response?.status : 'N/A'
      }\n${sliceDataLength(error.response ? error.response?.data : 'No response data', true)}\n`,
  );
}

export function isJSON(str?: string): boolean {
  if (!str) return false;
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
