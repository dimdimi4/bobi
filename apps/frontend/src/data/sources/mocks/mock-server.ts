import { setupServer } from 'msw/node';
import { channelsApiMockHandlers } from './channels-api-mock';

const server = setupServer(...channelsApiMockHandlers);

export default server;
