import io

from google.cloud import videointelligence_v1p3beta1 as videointelligence

path = 'path_to_file'
output_uri = 'gs://path_to_output'

client = videointelligence.StreamingVideoIntelligenceServiceClient()

# Set streaming config specifying the output_uri.
# The output_uri is the prefix of the actual output files.
storage_config = videointelligence.StreamingStorageConfig(
    enable_storage_annotation_result=True,
    annotation_result_storage_directory=output_uri,
)
# Here we use label detection as an example.
# All features support output to GCS.
config = videointelligence.StreamingVideoConfig(
    feature=(videointelligence.StreamingFeature.STREAMING_LABEL_DETECTION),
    storage_config=storage_config,
)

# config_request should be the first in the stream of requests.
config_request = videointelligence.StreamingAnnotateVideoRequest(
    video_config=config
)

# Set the chunk size to 5MB (recommended less than 10MB).
chunk_size = 5 * 1024 * 1024

# Load file content.
stream = []
with io.open(path, "rb") as video_file:
    while True:
        data = video_file.read(chunk_size)
        if not data:
            break
        stream.append(data)

def stream_generator():
    yield config_request
    for chunk in stream:
        yield videointelligence.StreamingAnnotateVideoRequest(input_content=chunk)

requests = stream_generator()

# streaming_annotate_video returns a generator.
# The default timeout is about 300 seconds.
# To process longer videos it should be set to
# larger than the length (in seconds) of the stream.
responses = client.streaming_annotate_video(requests, timeout=600)

for response in responses:
    # Check for errors.
    if response.error.message:
        print(response.error.message)
        break

    print("Storage URI: {}".format(response.annotation_results_uri))