import { setupWorker } from 'msw/browser';
import { channelsApiMockHandlers } from './channels-api-mock';

export const worker = setupWorker(...channelsApiMockHandlers);
