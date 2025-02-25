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
import type { AutomationStepPosition } from './automation-step-position';
// May contain unused imports in some cases
// @ts-ignore
import type { AutomationTask } from './automation-task';

/**
 * 
 * @export
 * @interface AutomationStep
 */
export interface AutomationStep {
    /**
     * 
     * @type {string}
     * @memberof AutomationStep
     */
    'id': string;
    /**
     * 
     * @type {AutomationStepPosition}
     * @memberof AutomationStep
     */
    'position': AutomationStepPosition;
    /**
     * 
     * @type {AutomationTask}
     * @memberof AutomationStep
     */
    'task': AutomationTask;
}

