/* tslint:disable */
/* eslint-disable */
/**
 * Autobot API
 * Autobot API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { ChannelDto } from '../models';
// @ts-ignore
import type { CreateChannelDto } from '../models';
// @ts-ignore
import type { PaginatedChannelsDto } from '../models';
// @ts-ignore
import type { UpdateChannelDto } from '../models';
/**
 * ChannelsApi - axios parameter creator
 * @export
 */
export const ChannelsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new channel
         * @param {CreateChannelDto} createChannelDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsCreateV1: async (createChannelDto: CreateChannelDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createChannelDto' is not null or undefined
            assertParamExists('channelsCreateV1', 'createChannelDto', createChannelDto)
            const localVarPath = `/api/v1/channels`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createChannelDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get a channel by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsFindOneV1: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('channelsFindOneV1', 'id', id)
            const localVarPath = `/api/v1/channels/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get all channels
         * @param {number} [offset] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsFindPaginatedV1: async (offset?: number, limit?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/channels`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a channel
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsRemoveV1: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('channelsRemoveV1', 'id', id)
            const localVarPath = `/api/v1/channels/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a channel
         * @param {string} id 
         * @param {UpdateChannelDto} updateChannelDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsUpdateV1: async (id: string, updateChannelDto: UpdateChannelDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('channelsUpdateV1', 'id', id)
            // verify required parameter 'updateChannelDto' is not null or undefined
            assertParamExists('channelsUpdateV1', 'updateChannelDto', updateChannelDto)
            const localVarPath = `/api/v1/channels/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateChannelDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ChannelsApi - functional programming interface
 * @export
 */
export const ChannelsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ChannelsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new channel
         * @param {CreateChannelDto} createChannelDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async channelsCreateV1(createChannelDto: CreateChannelDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ChannelDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.channelsCreateV1(createChannelDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChannelsApi.channelsCreateV1']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get a channel by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async channelsFindOneV1(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ChannelDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.channelsFindOneV1(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChannelsApi.channelsFindOneV1']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get all channels
         * @param {number} [offset] 
         * @param {number} [limit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async channelsFindPaginatedV1(offset?: number, limit?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedChannelsDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.channelsFindPaginatedV1(offset, limit, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChannelsApi.channelsFindPaginatedV1']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Delete a channel
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async channelsRemoveV1(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.channelsRemoveV1(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChannelsApi.channelsRemoveV1']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Update a channel
         * @param {string} id 
         * @param {UpdateChannelDto} updateChannelDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async channelsUpdateV1(id: string, updateChannelDto: UpdateChannelDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ChannelDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.channelsUpdateV1(id, updateChannelDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ChannelsApi.channelsUpdateV1']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ChannelsApi - factory interface
 * @export
 */
export const ChannelsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ChannelsApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new channel
         * @param {ChannelsApiChannelsCreateV1Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsCreateV1(requestParameters: ChannelsApiChannelsCreateV1Request, options?: RawAxiosRequestConfig): AxiosPromise<ChannelDto> {
            return localVarFp.channelsCreateV1(requestParameters.createChannelDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get a channel by id
         * @param {ChannelsApiChannelsFindOneV1Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsFindOneV1(requestParameters: ChannelsApiChannelsFindOneV1Request, options?: RawAxiosRequestConfig): AxiosPromise<ChannelDto> {
            return localVarFp.channelsFindOneV1(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get all channels
         * @param {ChannelsApiChannelsFindPaginatedV1Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsFindPaginatedV1(requestParameters: ChannelsApiChannelsFindPaginatedV1Request = {}, options?: RawAxiosRequestConfig): AxiosPromise<PaginatedChannelsDto> {
            return localVarFp.channelsFindPaginatedV1(requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a channel
         * @param {ChannelsApiChannelsRemoveV1Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsRemoveV1(requestParameters: ChannelsApiChannelsRemoveV1Request, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.channelsRemoveV1(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a channel
         * @param {ChannelsApiChannelsUpdateV1Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        channelsUpdateV1(requestParameters: ChannelsApiChannelsUpdateV1Request, options?: RawAxiosRequestConfig): AxiosPromise<ChannelDto> {
            return localVarFp.channelsUpdateV1(requestParameters.id, requestParameters.updateChannelDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for channelsCreateV1 operation in ChannelsApi.
 * @export
 * @interface ChannelsApiChannelsCreateV1Request
 */
export interface ChannelsApiChannelsCreateV1Request {
    /**
     * 
     * @type {CreateChannelDto}
     * @memberof ChannelsApiChannelsCreateV1
     */
    readonly createChannelDto: CreateChannelDto
}

/**
 * Request parameters for channelsFindOneV1 operation in ChannelsApi.
 * @export
 * @interface ChannelsApiChannelsFindOneV1Request
 */
export interface ChannelsApiChannelsFindOneV1Request {
    /**
     * 
     * @type {string}
     * @memberof ChannelsApiChannelsFindOneV1
     */
    readonly id: string
}

/**
 * Request parameters for channelsFindPaginatedV1 operation in ChannelsApi.
 * @export
 * @interface ChannelsApiChannelsFindPaginatedV1Request
 */
export interface ChannelsApiChannelsFindPaginatedV1Request {
    /**
     * 
     * @type {number}
     * @memberof ChannelsApiChannelsFindPaginatedV1
     */
    readonly offset?: number

    /**
     * 
     * @type {number}
     * @memberof ChannelsApiChannelsFindPaginatedV1
     */
    readonly limit?: number
}

/**
 * Request parameters for channelsRemoveV1 operation in ChannelsApi.
 * @export
 * @interface ChannelsApiChannelsRemoveV1Request
 */
export interface ChannelsApiChannelsRemoveV1Request {
    /**
     * 
     * @type {string}
     * @memberof ChannelsApiChannelsRemoveV1
     */
    readonly id: string
}

/**
 * Request parameters for channelsUpdateV1 operation in ChannelsApi.
 * @export
 * @interface ChannelsApiChannelsUpdateV1Request
 */
export interface ChannelsApiChannelsUpdateV1Request {
    /**
     * 
     * @type {string}
     * @memberof ChannelsApiChannelsUpdateV1
     */
    readonly id: string

    /**
     * 
     * @type {UpdateChannelDto}
     * @memberof ChannelsApiChannelsUpdateV1
     */
    readonly updateChannelDto: UpdateChannelDto
}

/**
 * ChannelsApi - object-oriented interface
 * @export
 * @class ChannelsApi
 * @extends {BaseAPI}
 */
export class ChannelsApi extends BaseAPI {
    /**
     * 
     * @summary Create a new channel
     * @param {ChannelsApiChannelsCreateV1Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChannelsApi
     */
    public channelsCreateV1(requestParameters: ChannelsApiChannelsCreateV1Request, options?: RawAxiosRequestConfig) {
        return ChannelsApiFp(this.configuration).channelsCreateV1(requestParameters.createChannelDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get a channel by id
     * @param {ChannelsApiChannelsFindOneV1Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChannelsApi
     */
    public channelsFindOneV1(requestParameters: ChannelsApiChannelsFindOneV1Request, options?: RawAxiosRequestConfig) {
        return ChannelsApiFp(this.configuration).channelsFindOneV1(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get all channels
     * @param {ChannelsApiChannelsFindPaginatedV1Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChannelsApi
     */
    public channelsFindPaginatedV1(requestParameters: ChannelsApiChannelsFindPaginatedV1Request = {}, options?: RawAxiosRequestConfig) {
        return ChannelsApiFp(this.configuration).channelsFindPaginatedV1(requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a channel
     * @param {ChannelsApiChannelsRemoveV1Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChannelsApi
     */
    public channelsRemoveV1(requestParameters: ChannelsApiChannelsRemoveV1Request, options?: RawAxiosRequestConfig) {
        return ChannelsApiFp(this.configuration).channelsRemoveV1(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a channel
     * @param {ChannelsApiChannelsUpdateV1Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ChannelsApi
     */
    public channelsUpdateV1(requestParameters: ChannelsApiChannelsUpdateV1Request, options?: RawAxiosRequestConfig) {
        return ChannelsApiFp(this.configuration).channelsUpdateV1(requestParameters.id, requestParameters.updateChannelDto, options).then((request) => request(this.axios, this.basePath));
    }
}

