/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/v1/accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["accountsFindAllV1"];
        put?: never;
        post: operations["accountsCreateV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get: operations["accountsFindOneV1"];
        put?: never;
        post?: never;
        delete: operations["accountsRemoveV1"];
        options?: never;
        head?: never;
        patch: operations["accountsUpdateV1"];
        trace?: never;
    };
    "/api/v1/channels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all channels */
        get: operations["channelsFindPaginatedV1"];
        put?: never;
        /** Create a new channel */
        post: operations["channelsCreateV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/channels/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        /** Get a channel by id */
        get: operations["channelsFindOneV1"];
        put?: never;
        post?: never;
        /** Delete a channel */
        delete: operations["channelsRemoveV1"];
        options?: never;
        head?: never;
        /** Update a channel */
        patch: operations["channelsUpdateV1"];
        trace?: never;
    };
    "/api/v1/automations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["automationsFindPaginatedV1"];
        put?: never;
        post: operations["automationsCreateV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get: operations["automationsFindOneV1"];
        put?: never;
        post?: never;
        delete: operations["automationsRemoveV1"];
        options?: never;
        head?: never;
        patch: operations["automationsUpdateV1"];
        trace?: never;
    };
    "/api/v1/automations/{id}/steps": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["automationsCreateStepV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/bulk-update-step-positions": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["automationsBulkUpdateStepPositionsV1"];
        trace?: never;
    };
    "/api/v1/automations/{id}/steps/{stepId}/task": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                stepId: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["automationsUpdateStepTaskV1"];
        trace?: never;
    };
    "/api/v1/automations/{id}/steps/{stepId}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                stepId: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["automationsDeleteStepV1"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/connections": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["automationsCreateConnectionV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/connections/{connectionId}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                connectionId: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["automationsDeleteConnectionV1"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateAccountDto: Record<string, never>;
        UpdateAccountDto: Record<string, never>;
        PaginatedDto: {
            total: number;
            limit: number;
            offset: number;
        };
        CreateChannelDto: {
            type: string;
            name: string;
            token: string;
        };
        ChannelDto: {
            id: string;
            type: string;
            name: string;
            createdAt: string;
            updatedAt: string;
            accountId: string;
            token: string;
        };
        PaginatedChannelsDto: {
            total: number;
            limit: number;
            offset: number;
            results: components["schemas"]["ChannelDto"][];
        };
        UpdateChannelDto: {
            name?: string;
            token?: string;
        };
        MutateAutomationDto: {
            name: string;
        };
        AutomationStepPosition: {
            x: number;
            y: number;
        };
        TelegramSendMessageTask: {
            message: string;
            quickReplies: string[];
        };
        AutomationTask: {
            telegram_sendMessage?: components["schemas"]["TelegramSendMessageTask"];
        };
        AutomationStep: {
            id: string;
            position: components["schemas"]["AutomationStepPosition"];
            task: components["schemas"]["AutomationTask"];
        };
        AutomationConnection: {
            id: string;
            sourceStepId: string;
            sourceHandleId?: string;
            targetStepId: string;
            targetHandleId?: string;
        };
        Automation: {
            id: string;
            name: string;
            steps: components["schemas"]["AutomationStep"][];
            connections: components["schemas"]["AutomationConnection"][];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        AutomationsPaginatedDto: {
            total: number;
            limit: number;
            offset: number;
            results: components["schemas"]["Automation"][];
        };
        CreateStepDto: {
            step: components["schemas"]["AutomationStep"];
            connection?: components["schemas"]["AutomationConnection"];
        };
        UpdateStepPositionsDto: {
            stepId: string;
            position: components["schemas"]["AutomationStepPosition"];
        };
        BulkUpdateStepPositionsDto: {
            steps: components["schemas"]["UpdateStepPositionsDto"][];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    accountsFindAllV1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    accountsCreateV1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAccountDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    accountsFindOneV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    accountsRemoveV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    accountsUpdateV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAccountDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    channelsFindPaginatedV1: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Return paginated channels */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedChannelsDto"];
                };
            };
        };
    };
    channelsCreateV1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateChannelDto"];
            };
        };
        responses: {
            /** @description Channel created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChannelDto"];
                };
            };
        };
    };
    channelsFindOneV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Return a channel */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChannelDto"];
                };
            };
        };
    };
    channelsRemoveV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Channel deleted successfully */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    channelsUpdateV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateChannelDto"];
            };
        };
        responses: {
            /** @description Channel updated successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChannelDto"];
                };
            };
        };
    };
    automationsFindPaginatedV1: {
        parameters: {
            query?: {
                offset?: number;
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationsPaginatedDto"];
                };
            };
        };
    };
    automationsCreateV1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MutateAutomationDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsFindOneV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsRemoveV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsUpdateV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MutateAutomationDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsCreateStepV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateStepDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsBulkUpdateStepPositionsV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BulkUpdateStepPositionsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsUpdateStepTaskV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                stepId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AutomationTask"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsDeleteStepV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                stepId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsCreateConnectionV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AutomationConnection"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
    automationsDeleteConnectionV1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                connectionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Automation"];
                };
            };
        };
    };
}
export enum ApiPaths {
    accountsCreateV1 = "/api/v1/accounts",
    accountsFindAllV1 = "/api/v1/accounts",
    accountsFindOneV1 = "/api/v1/accounts/:id",
    accountsUpdateV1 = "/api/v1/accounts/:id",
    accountsRemoveV1 = "/api/v1/accounts/:id",
    channelsCreateV1 = "/api/v1/channels",
    channelsFindPaginatedV1 = "/api/v1/channels",
    channelsFindOneV1 = "/api/v1/channels/:id",
    channelsUpdateV1 = "/api/v1/channels/:id",
    channelsRemoveV1 = "/api/v1/channels/:id",
    automationsCreateV1 = "/api/v1/automations",
    automationsFindPaginatedV1 = "/api/v1/automations",
    automationsFindOneV1 = "/api/v1/automations/:id",
    automationsUpdateV1 = "/api/v1/automations/:id",
    automationsRemoveV1 = "/api/v1/automations/:id",
    automationsCreateStepV1 = "/api/v1/automations/:id/steps",
    automationsBulkUpdateStepPositionsV1 = "/api/v1/automations/:id/bulk-update-step-positions",
    automationsUpdateStepTaskV1 = "/api/v1/automations/:id/steps/:stepId/task",
    automationsDeleteStepV1 = "/api/v1/automations/:id/steps/:stepId",
    automationsCreateConnectionV1 = "/api/v1/automations/:id/connections",
    automationsDeleteConnectionV1 = "/api/v1/automations/:id/connections/:connectionId"
}
