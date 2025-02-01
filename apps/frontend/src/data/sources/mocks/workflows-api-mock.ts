import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

import { ApiPaths } from './api-schema';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(ApiPaths.workflowsFindAllV1, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];

export class WorkflowsApiMock {
  static getWorkflows() {
    return http.get(ApiPaths.workflowsFindAllV1, () => {
      return HttpResponse.json({});
    });
  }

  static makeFakeWorkflow() {
    return {
      id: faker,
      firstName: 'John',
      lastName: 'Maverick',
    };
  }
}
