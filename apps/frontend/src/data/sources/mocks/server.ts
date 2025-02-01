import { setupServer } from 'msw/node';
import { channelsApiMockHandlers } from './channels-api-mock';

export const server = setupServer(...channelsApiMockHandlers);
