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
import type { StepPosition } from './step-position';

/**
 * 
 * @export
 * @interface Step
 */
export interface Step {
    /**
     * 
     * @type {string}
     * @memberof Step
     */
    'id': string;
    /**
     * 
     * @type {StepPosition}
     * @memberof Step
     */
    'position': StepPosition;
    /**
     * Discriminator field to determine the type of step
     * @type {string}
     * @memberof Step
     */
    'type': StepTypeEnum;
}

export const StepTypeEnum = {
    StepTelegramSendMessage: 'StepTelegramSendMessage',
    StepTelegramCheckSubscription: 'StepTelegramCheckSubscription'
} as const;

export type StepTypeEnum = typeof StepTypeEnum[keyof typeof StepTypeEnum];


