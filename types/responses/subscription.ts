import { CrdbRegion } from '../parameters/database';
import { DeploymentType } from '../parameters/subscription';
import { Region } from './general';

/**
 * Subscription object
 * @param id The id of the subscription
 * @param status The status of the subscription
 * @param deploymentType The deployment types for the subscription
 * @param paymentMethodId The payment method id of the subscription
 * @param memoryStorage The memory storage of the subscription
 * @param storageEncryption The storage encryption of the subscription
 * @param numberOfDatabases The databases count of the subscription
 * @param subscriptionPricing The pricing of the subscription
 * @param cloudDetails The cloud details of the subscription
 */
export type SubscriptionResponse = {
    id: number,
    name: string,
    status: SubscriptionStatus,
    deploymentType: DeploymentType,
    paymentMethodId: number,
    memoryStorage: SubscriptionMemoryStorage,
    storageEncryption: boolean,
    numberOfDatabases: number,
    subscriptionPricing: SubscriptionPricing[],
    cloudDetails: SubscriptionCloudDetails[],
    [key: string]: any
}

/**
 * Subscription pricing object
 * @param type The type of the subscription pricing
 * @param quantity The quantity of the subscription pricing
 * @param quantityMeasurement The quantity measurement of the subscription pricing
 * @param databaseName The name of the database
 * @param typeDetails The details of the type measurement of the subscription pricing
 * @param pricePerUnit The price per unit of the type measurement of the subscription pricing
 * @param priceCurrency The currency of the price
 * @param pricePeriod The time period of the price
 * @param name The name of the region
 */
export type SubscriptionPricing = {
    type: string,
    quantity: number,
    quantityMeasurement: string,
    databaseName?: string,
    typeDetails?: string,
    pricePerUnit?: number,
    priceCurrency?: string,
    pricePeriod?: string,
    name?: string,
    [key: string]: any
}

/**
 * Subscription cloud details object
 * @param provider The provider of the cloud details
 * @param cloudAccountId The cloud account id of the cloud details
 * @param totalSizeInGb The total size in GB of the cloud details
 * @param regions The regions of the cloud details
 */
export type SubscriptionCloudDetails = {
    provider: SubscriptionCloudProvider,
    cloudAccountId: number,
    totalSizeInGb: number,
    regions: Region[],
    [key: string]: any
}

/**
 * Subscription CIDR whitelists
 * @param cidr_ips The list of the cidr ips
 * @param security_group_ids The list of the security groups
 * @param the list of the errors
 */
export type SubscriptionCidrWhitelist = {
    cidr_ips: string[],
    security_group_ids: string[],
    errors: any[]
}

/**
 * Subscription VPC Peering
 * @param vpcPeeringId The id of the vpc peering
 * @param status The status of the vpc peering
 * @param regionId The ID of the region (Optional)
 * @param regionName The name of the region (Optional)
 * @param awsAccountId The AWS account ID (Optional)
 * @param vpcUid The VPC ID (Optional)
 * @param vpcCidr The VPC CIDR (Optional)
 * @param vpcCidrs The multiple VPC CIDRs (Optional)
 * @param awsPeeringUid The AWS peering ID (Optional)
 * @param vpcProjectUid The GCP project ID (Optional)
 * @param vpcNetworkName The GCP network name (Optional)
 */
export type SubscriptionVpcPeering = {
    vpcPeeringId: number,
    status: SubscriptionVpcPeeringStatus,
    regionId?: number,
    regionName?: string,
    awsAccountId?: string,
    vpcUid?: string,
    vpcCidr?: string,
    vpcCidrs?: VpcCidr[],
    awsPeeringUid?: string,
    vpcProjectUid?: string,
    vpcNetworkName?: string,
    [key: string]: any
}

/**
 * The VPC CIDR information
 * @param vpcCidr The VPC CIDR address
 * @param status The VPC CIDR status
 */
export type VpcCidr = {
    vpcCidr: string,
    status: VpcCidrStatus,
    [key: string]: any
}

/**
 * The list of statuses for VPC CIDR
 */
export type VpcCidrStatus = 'pending-creation' | 'pending-deletion' | 'active' | 'deleted' | 'failed';

/**
 * The available subscription status
 * @param active Active status
 * @param pending Pending status
 * @param error Error status
 * @param 404 Delete status
 */
export type SubscriptionStatus = 'active' | 'pending' | 'error' | 'deleting' | 404;

/**
 * The available subscription vpc peering status
 * @param active Active status
 * @param inactive Inactive status
 * @param pending-acceptance Pending status
 * @param failed Error status
 */
export type SubscriptionVpcPeeringStatus = 'active' | 'inactive' | 'pending-acceptance' | 'failed' | 'initiating-request'
    | 'provisioning' | 'deleted' | 'expired' | 'rejected';

/**
 * The subscription memory storage types
 * @param ram Redis on RAM memory storage
 * @param ram-and-flash Redis on Flash memory storage
 */
export type SubscriptionMemoryStorage = 'ram' | 'ram-and-flash';

/**
 * The subscription cloud provider types
 * @param AWS Amazon Web Service cloud provider
 * @param GCP Google Cloud Platform cloud provider
 */
export type SubscriptionCloudProvider = 'AWS' | 'GCP';

/**
 * The VPC Peerings information for Active Active
 * @param subscriptionId The subscription ID
 * @param regions The VPC Peering information per regions
 */
export type ActiveActiveVpcPeeringsResponse = {
    subscriptionId: number,
    regions: ActiveActiveVpcPeeringsRegion[],
    [key: string]: any
};

/**
 * The VPC Peerings for Active Active region
 * @param id The ID of the VPC Peering
 * @param region The region of the VPC Peering
 * @param vpcPeerings The information of the VPC Peerings
 */
export type ActiveActiveVpcPeeringsRegion = {
    id: number,
    region: string,
    vpcPeerings: SubscriptionVpcPeering[],
    [key: string]: any
};

/**
 * The regions information for Active Active subscriptions
 * @param subscriptionId The subscription ID
 * @param regions The regions information
 */
export type ActiveActiveRegionsResponse = {
    subscriptionId: number,
    regions: ActiveActiveRegionInformation[],
    [key: string]: any
};

/**
 * The region (singular) information for Active Active subscriptions
 * @param regionId The region ID
 * @param region The region name
 * @param deploymentCidr The region CIDR value
 * @param vpcId The region VPC ID value
 * @param databases The region's databases
 */
export type ActiveActiveRegionInformation = {
    regionId: number,
    region: string,
    deploymentCidr: string,
    vpcId: string,
    databases: CrdbRegion[],
    [key: string]: any
};