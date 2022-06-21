import boto3
import warnings
import os
import sys

def download_s3_file(client, bucket_name, s3_path, local_path):
    try:
        print(f'Downloading {s3_path}:')
        client.download_file(bucket_name, s3_path, local_path)
    except Exception as ex:
        raise ValueError(f'Error while {s3_path} downloading:\n{ex}')

def download_files_from_s3(paths, directory_path, aws_access_key_id, aws_secret_access_key, endpoint_url, bucket_name, prefix_path):

    s3_client = boto3.client('s3', aws_access_key_id=aws_access_key_id,
                             aws_secret_access_key=aws_secret_access_key,
                             endpoint_url=endpoint_url)
    s3_resource = boto3.resource('s3', aws_access_key_id=aws_access_key_id,
                                 aws_secret_access_key=aws_secret_access_key,
                                 endpoint_url=endpoint_url)
    bucket = s3_resource.Bucket(bucket_name)

    for file_path in paths:
        print("prefix_path + directory_path: ", prefix_path + directory_path)
        if not os.path.isdir(prefix_path + directory_path):
            os.makedirs(prefix_path + directory_path)

        print("prefix_path + file_path: ", prefix_path + file_path)
        if not os.path.isfile(prefix_path + file_path):
            download_s3_file(s3_client, bucket_name, file_path, prefix_path + file_path)
        else:
            print(file_path, ' already exsists. It will not be downloaded')

def main(argv):
    aws_access_key_id = argv[0]
    aws_secret_access_key = argv[1]
    endpoint_url = argv[2]
    bucket_name = argv[3]
    paths_to_load = argv[4].split(',')
    directory_path = argv[5]
    destination_path = argv[6]

    download_files_from_s3(paths_to_load, directory_path, aws_access_key_id, aws_secret_access_key, endpoint_url, bucket_name, destination_path + '/')

if __name__ == '__main__':
    main(sys.argv[1:])