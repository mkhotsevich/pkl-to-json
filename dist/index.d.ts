declare type S3Credentials = {
    accessKeyId: string;
    secretAccessKey: string;
    endpointUrl: string;
    bucketName: string;
    pathsToLoad: string[];
    directoryPath: string;
    destinationPath: string;
};
export declare function downloadFromS3({ accessKeyId, secretAccessKey, endpointUrl, bucketName, pathsToLoad, directoryPath, destinationPath, }: S3Credentials): Promise<string[]>;
export declare function convert(fromPkl: string, toJson: string): Promise<string>;
export declare function read<T>(jsonPath: string): Promise<T>;
export {};
