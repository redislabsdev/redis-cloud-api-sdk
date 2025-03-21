import { SubscriptionMemoryStorage, SubscriptionCloudProvider } from '../responses/subscription'
import { DatabaseProtocol, DatabaseDataPersistence, DatabaseThroughputMeasurement } from '../responses/database'
import { Alert, CreateRegionActiveActiveDatabaseParameters, DatabaseBackupParameters, LocalThroughputMeasurement, Module } from './database'
import { SubscriptionPaymentMethod } from '../responses/general'

/**
 * The parameters needed to create a subscription
 * @param name Optional. Subscription name
 * @param dryRun Optional. When 'false’: Creates a deployment plan and deploys it (creating any resources required by the plan). When 'true’: creates a read-only deployment plan without any resource creation. Default: ‘true’
 * @param paymentMethodId Required. A valid payment method (credit card, wire transfer etc) pre-defined in the current account. It will be billed for any charges related to the created subscription)
 * @param deploymentType Optional. The deployment types for the subscription. Default: single-region.
 * @param memoryStorage Optional. Memory storage preference: either ‘ram’ or a combination of 'ram-and-flash’. Default: ‘ram’
 * @param persistentStorageEncryption Optional. Encrypt data stored in persistent storage. Required for a GCP subscription. Default: ‘false’
 * @param cloudProviders Required. 
 * @param databases Required. 
 */
export type CreateSubscriptionParameters = {
    name?: string,
    dryRun?: boolean,
    paymentMethod?: SubscriptionPaymentMethod
    paymentMethodId?: number,
    deploymentType?: DeploymentType,
    memoryStorage?: SubscriptionMemoryStorage,
    persistentStorageEncryption?: boolean,
    cloudProviders: CloudProvider[],
    databases: DatabaseParameters[]
}

/**
 * The subscription cloud provider 
 * @param provider Optional. Cloud provider. Default: ‘AWS’
 * @param cloudAccountId Optional. Cloud account identifier. Default: Redis internal cloud account (using Cloud Account Id = 1 implies using Redis internal cloud account). Note that a GCP subscription can be created only with Redis internal cloud account.
 * @param regions Required. Cloud networking details, per region (single region or multiple regions for Active-Active cluster only) 
 */
export type CloudProvider = {
    provider?: SubscriptionCloudProvider,
    cloudAccountId?: number,
    regions: CloudProviderRegion[]
}

/**
 * The subscription cloud provider region
 * @param region Required. Deployment region as defined by cloud provider
 * @param multipleAvailabilityZones Optional. Support deployment on multiple availability zones within the selected region. Default: ‘false’
 * @param preferredAvailabilityZones Optional. Availability zones deployment preferences (for the selected provider & region). Example = '['us-east-1a’, 'us-east-1c’, ‘us-east-2e’]'
 * @param networking Required. The networking of the subscription
 * @param networking.deploymentCIDR Required. Deployment CIDR mask. Default: If using Redis internal cloud account, 192.168.0.0/24
 * @param networking.vpcId Optional. Either an existing VPC Id (already exists in the specific region) or create a new VPC (if no VPC is specified). VPC Identifier must be in a valid format (for example: ‘vpc-0125be68a4625884ad’) and existing within the hosting account
 */
export type CloudProviderRegion = {
    region: string,
    multipleAvailabilityZones?: boolean,
    preferredAvailabilityZones?: string[],
    networking: {
        deploymentCIDR: string,
        vpcId?: string
    }
}

/**
 * @param name Required. Database name (Database name must be up to 40 characters long, include only letters, digits, or hyphen ('-'), start with a letter, and end with a letter or digit)
 * @param protocol Optional. Database protocol: either ‘redis’ or 'memcached’. Default: ‘redis’
 * @param memoryLimitInGb Required. Maximum memory usage for this specific database
 * @param supportOSSClusterApi Optional. Support Redis open-source (OSS) Cluster API. Default: ‘false’
 * @param dataPersistence Optional. Rate of database data persistence (in persistent storage). Default: ‘none’
 * @param replication Optional. Databases replication. Default: ‘true’
 * @param throughputMeasurement The throughput measurement of the database
 * @param throughputMeasurement.by Required. Throughput measurement method. Either ‘number-of-shards’ or ‘operations-per-second’
 * @param throughputMeasurement.value Required. Throughput value (as applies to selected measurement method)
 * @param modules Optional. Redis modules to be provisioned in the database
 * @param quantity Optional. Number of databases (of this type) that will be created. Default: 1
 * @param averageItemSizeInBytes Optional. Relevant only to ram-and-flash clusters. Estimated average size (measured in bytes) of the items stored in the database. Default: 1000
 * @param localThroughputMeasurement The Local Throughput Measurement object
 */
export type DatabaseParameters = {
    name: string,
    protocol?: DatabaseProtocol,
    memoryLimitInGb: number,
    supportOSSClusterApi?: boolean,
    dataPersistence?: DatabaseDataPersistence,
    replication?: boolean,
    throughputMeasurement?: DatabaseThroughputMeasurement,
    modules?: Module[],
    quantity?: number,
    averageItemSizeInBytes?: number,
    localThroughputMeasurement?: LocalThroughputMeasurement[]
}

/**
 * The parameters needed to update a subscription
 * @param name Optional. Subscription name
 * @param paymentMethodId Optional. Payment method Id
 */
export type SubscriptionUpdateParameters = {
    name?: string,
    paymentMethodId?: number
}

/**
 * The parameters needed to update the database CIDR whitelist
 * @param cidrIps Optional. CIDR values in an array format (example: [‘10.1.1.0/32’])
 * @param securityGroupIds Optional. AWS Security group identifier
 */
export type CidrUpdateParameters = {
    cidrIps?: string[],
    securityGroupIds?: string[]
}

/**
 * The parameters needed to create a VPC peering for a database
 * @param region Required. Deployment region as defined by cloud provider
 * @param awsAccountId Required. The AWS Account id of the VPC peering
 * @param vpcId Required. The id of the VPC peering
 * @param vpcCidr Required. The CIDR of the VPC peering */
export type VpcPeeringCreationParameters = {
    region: string,
    awsAccountId: string,
    vpcId: string,
    vpcCidr: string
}

/**
 * The deployment types for the subscription
 */
export type DeploymentType = 'single-region' | 'active-active';

/**
 * The parameters for creating VPC Peering request in GCP Active Active subscription
 * @param provider The cloud provider. Value must be 'gcp'
 * @param sourceRegion The GCP region for to connect in the Active Active subscription
 * @param vpcProjectUid The GCP project UID of the destination
 * @param vpcNetworkName The GCP network name of the destination
 */
export type ActiveActiveGcpVpcPeeringParameters = {
    provider: 'gcp',
    sourceRegion: string,
    vpcProjectUid: string,
    vpcNetworkName: string
};

/**
 * The parameters for creating VPC Peering request in AWS Active Active subscription
 * @param provider The cloud provider (optional)
 * @param awsAccountId The AWS Account ID where the destination machine deployed
 * @param destinationRegion The AWS region for the destination machine
 * @param sourceRegion The AWS region for to connect in the Active Active subscription
 * @param vpcCidr The VPC CIDR for the VPC Peering
 * @param vpcId The VPC ID of the destination machine
 */
export type ActiveActiveAwsVpcPeeringParameters = {
    provider?: 'aws',
    awsAccountId: string,
    destinationRegion: string,
    sourceRegion: string,
    vpcCidr: string,
    vpcId: string
};

/**
 * The parameters for create region in Active Active
 */
export type ActiveActiveCreateRegionParameters = {
    databases: CreateRegionActiveActiveDatabaseParameters[],
    dryRun?: boolean,
    region: string,
    deploymentCIDR: string
};


/**
 * The Active Active delete region parameters
 */
export type ActiveActiveDeleteRegionParameters = {
    dryRun?: boolean,
    regions: ActiveActiveRegion[]
};

/**
 * The region for active active
 */
export type ActiveActiveRegion = {
    region: string
};