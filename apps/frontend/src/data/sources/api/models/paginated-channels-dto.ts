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


// May contain unused imports in some cases
// @ts-ignore
import type { ChannelDto } from './channel-dto';

/**
 * 
 * @export
 * @interface PaginatedChannelsDto
 */
export interface PaginatedChannelsDto {
    /**
     * 
     * @type {number}
     * @memberof PaginatedChannelsDto
     */
    'total': number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedChannelsDto
     */
    'limit': number;
    /**
     * 
     * @type {number}
     * @memberof PaginatedChannelsDto
     */
    'offset': number;
    /**
     * 
     * @type {Array<ChannelDto>}
     * @memberof PaginatedChannelsDto
     */
    'results': Array<ChannelDto>;
}

