"use server";

export async function buildUrlBucket(fileName: string) {
  const port = process.env.MINIO_PORT;
  const httpOrHttps = checkSSL() ? "https://" : "http://";

  return `${httpOrHttps}${process.env.MINIO_ENDPOINT}:${port}/${process.env.MINIO_BUCKET_NAME}/${fileName}`;
}

function checkSSL(): boolean {
  const ssl = process.env.MINIO_USE_SSL;
  if (ssl == "false") {
    return false;
  }
  return true;
}
