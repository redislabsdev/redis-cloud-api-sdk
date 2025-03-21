import { SubscriptionPricing, SubscriptionVpcPeering } from "./responses/subscription";


/**
 * Task object
 * @param taskId The id of the task
 * @param status The status of the task
 * @param description The description of the task
 * @param timestamp The timestamp of the task
 * @param response The response of the task
 */
export type TaskObject = {
    taskId: string,
    status: TaskStatus,
    description: string,
    timestamp: string,
    response: TaskResponse,
    [key: string]: any
}

/**
 * Task response object
 * @param resourceId The resource id
 * @param error The error of the task
 * @param resource The resource of the task (Returned when dryRun = true OR for GET VPC Peerings requests)
 */
export type TaskResponse = {
    resourceId: number,
    error?: ErrorResponse,
    resource?: {
        pricing?: SubscriptionPricing[]
        peerings?: SubscriptionVpcPeering[],
        [key: string]: any
    }
    [key: string]: any
}

/**
 * Task error response
 * @param type The type of the error
 * @param status The status of the error
 * @param description The description of the error
 */
export type ErrorResponse = {
    type?: string,
    status?: string,
    description?: string,
    [key: string]: any
}

/**
 * The task status
 * @param processing-completed Completed status
 * @param processing-error Error status
 */
export type TaskStatus = 'processing-completed' | 'processing-error';