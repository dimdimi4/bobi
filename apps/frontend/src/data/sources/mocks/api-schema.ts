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
        get: operations["automationsListPaginatedV1"];
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
        get: operations["automationsFindOneForUpdateV1"];
        put?: never;
        post?: never;
        delete: operations["automationsRemoveV1"];
        options?: never;
        head?: never;
        patch: operations["automationsUpdateV1"];
        trace?: never;
    };
    "/api/v1/automations/{id}/overview": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get: operations["automationsFindOneOverviewV1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/discard-changes": {
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
        post: operations["automationsDiscardChangesV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/publish": {
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
        post: operations["automationsPublishChangesV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/activate": {
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
        post: operations["automationsActivateV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/deactivate": {
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
        post: operations["automationsDeactivateV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
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
        delete: operations["automationsDeleteStepsV1"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/automations/{id}/update-steps-positions": {
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
        patch: operations["automationsUpdateStepsPositionsV1"];
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
        delete: operations["automationsDeleteConnectionsV1"];
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
        TriggerReceivedMessageTask: {
            condition: string;
            templates?: string[];
        };
        CreateAutomationDto: {
            name: string;
            trigger?: components["schemas"]["TriggerReceivedMessageTask"];
        };
        AutomationPosition: {
            x: number;
            y: number;
        };
        TelegramQuickReplyButton: {
            id: string;
            text: string;
            url?: string;
        };
        TelegramTimeout: {
            duration: number;
            unit: string;
        };
        TelegramSendMessageTask: {
            message: string;
            quickReplyButtons: components["schemas"]["TelegramQuickReplyButton"][];
            timeout?: components["schemas"]["TelegramTimeout"];
        };
        AutomationTask: {
            trigger_receivedMessage?: components["schemas"]["TriggerReceivedMessageTask"];
            action_telegram_sendMessage?: components["schemas"]["TelegramSendMessageTask"];
        };
        AutomationStep: {
            id: string;
            position: components["schemas"]["AutomationPosition"];
            task: components["schemas"]["AutomationTask"];
        };
        AutomationConnection: {
            id: string;
            sourceStepId: string;
            sourceHandleId?: string;
            targetStepId: string;
            targetHandleId?: string;
        };
        AutomationDto: {
            steps: components["schemas"]["AutomationStep"][];
            connections: components["schemas"]["AutomationConnection"][];
            hasDraftVersion: boolean;
            hasPublishedVersion: boolean;
            /** @enum {string} */
            versionType: "main" | "draft" | "revision";
            id: string;
            name: string;
            /** @enum {string} */
            status: "ACTIVE" | "INACTIVE";
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        AutomationBaseDto: {
            id: string;
            name: string;
            /** @enum {string} */
            status: "ACTIVE" | "INACTIVE";
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        AutomationsPaginatedDto: {
            total: number;
            limit: number;
            offset: number;
            results: components["schemas"]["AutomationBaseDto"][];
        };
        AutomationVersionOverviewDto: {
            id: string;
            /** Format: date-time */
            publishedAt?: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            steps: components["schemas"]["AutomationStep"][];
            connections: components["schemas"]["AutomationConnection"][];
        };
        AutomationOverviewDto: {
            publishedVersion?: components["schemas"]["AutomationVersionOverviewDto"];
            draftVersion?: components["schemas"]["AutomationVersionOverviewDto"];
            id: string;
            name: string;
            /** @enum {string} */
            status: "ACTIVE" | "INACTIVE";
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        UpdateAutomationDto: {
            name: string;
        };
        CreateStepDto: {
            step: components["schemas"]["AutomationStep"];
            connection?: components["schemas"]["AutomationConnection"];
        };
        StepPositionDto: {
            stepId: string;
            position: components["schemas"]["AutomationPosition"];
        };
        UpdateStepsPositionsDto: {
            steps: components["schemas"]["StepPositionDto"][];
        };
        DeleteStepsDto: {
            stepIds: string[];
        };
        DeleteConnectionsDto: {
            connectionIds: string[];
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
    automationsListPaginatedV1: {
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
                "application/json": components["schemas"]["CreateAutomationDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
                };
            };
        };
    };
    automationsFindOneForUpdateV1: {
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
                    "application/json": components["schemas"]["AutomationDto"];
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
                content?: never;
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
                "application/json": components["schemas"]["UpdateAutomationDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationBaseDto"];
                };
            };
        };
    };
    automationsFindOneOverviewV1: {
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
                    "application/json": components["schemas"]["AutomationOverviewDto"];
                };
            };
        };
    };
    automationsDiscardChangesV1: {
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
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
                };
            };
        };
    };
    automationsPublishChangesV1: {
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
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
                };
            };
        };
    };
    automationsActivateV1: {
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
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
                };
            };
        };
    };
    automationsDeactivateV1: {
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
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
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
                    "application/json": components["schemas"]["AutomationDto"];
                };
            };
        };
    };
    automationsDeleteStepsV1: {
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
                "application/json": components["schemas"]["DeleteStepsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
                };
            };
        };
    };
    automationsUpdateStepsPositionsV1: {
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
                "application/json": components["schemas"]["UpdateStepsPositionsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
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
                    "application/json": components["schemas"]["AutomationDto"];
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
                    "application/json": components["schemas"]["AutomationDto"];
                };
            };
        };
    };
    automationsDeleteConnectionsV1: {
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
                "application/json": components["schemas"]["DeleteConnectionsDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AutomationDto"];
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
    automationsListPaginatedV1 = "/api/v1/automations",
    automationsFindOneForUpdateV1 = "/api/v1/automations/:id",
    automationsUpdateV1 = "/api/v1/automations/:id",
    automationsRemoveV1 = "/api/v1/automations/:id",
    automationsFindOneOverviewV1 = "/api/v1/automations/:id/overview",
    automationsDiscardChangesV1 = "/api/v1/automations/:id/discard-changes",
    automationsPublishChangesV1 = "/api/v1/automations/:id/publish",
    automationsActivateV1 = "/api/v1/automations/:id/activate",
    automationsDeactivateV1 = "/api/v1/automations/:id/deactivate",
    automationsCreateStepV1 = "/api/v1/automations/:id/steps",
    automationsDeleteStepsV1 = "/api/v1/automations/:id/steps",
    automationsUpdateStepsPositionsV1 = "/api/v1/automations/:id/update-steps-positions",
    automationsUpdateStepTaskV1 = "/api/v1/automations/:id/steps/:stepId/task",
    automationsCreateConnectionV1 = "/api/v1/automations/:id/connections",
    automationsDeleteConnectionsV1 = "/api/v1/automations/:id/connections"
}
