import datetime
import os

from google.cloud import storage
#os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"file_with_keys.json"


def generate_download_signed_url_v4(bucket_name, blob_name, data_end) -> list:
    """Generates a v4 signed URL for downloading a blob.

    Note that this method requires a service account key file. You can not use
    this if you are using Application Default Credentials from Google Compute
    Engine or from the Google Cloud SDK.
    """

    # bucket_name = 'your-bucket-name'
    # blob_name = 'your-object-name'

    if not bucket_name or not blob_name or not data_end:
        return [None]

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v2",
        # This URL is valid for data_end
        expiration=data_end,
        # Allow GET requests using this URL.
        method="GET",
    )
    list_url = []
    list_url.append(url)
    print("Generated GET signed URL:")
    print(url)
    print("You can use this URL with any user agent, for example:")
    print("curl '{}'".format(url))
    return list_url
