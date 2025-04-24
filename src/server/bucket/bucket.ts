import * as Minio from "minio";
import { UploadInput } from "@/server/interfaces/bucket/upload-input";
let bucketStorage: Minio.Client;
let bucketName: string;

/**
 * Inicializa o cliente Minio com as variáveis de ambiente.
 * Deve ser chamado antes de usar upload ou remove.
 */
export function initMinioClient() {
  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;
  const endPoint = process.env.MINIO_ENDPOINT!;
  const port = Number(process.env.MINIO_PORT);
  const useSSL = process.env.MINIO_USE_SSL === "true";
  bucketName = process.env.MINIO_BUCKET_NAME!;

  bucketStorage = new Minio.Client({
    endPoint,
    port,
    useSSL,
    accessKey,
    secretKey,
  });
}

/**
 * Verifica se o bucket existe e loga erro caso não.
 */
async function checkBucketExists(): Promise<void> {
  const exists = await bucketStorage.bucketExists(bucketName);
  if (!exists) {
    console.error(`MinioAdapter: o bucket ${bucketName} não existe`);
  }
}

/**
 * Faz upload de um arquivo para o bucket configurado.
 * @param input - objeto contendo nome do arquivo e dados (buffer)
 * @returns true se upload bem-sucedido, false caso contrário
 */
export async function upload(input: UploadInput): Promise<boolean> {
  try {
    await checkBucketExists();
    const output = await bucketStorage.putObject(
      bucketName,
      input.fileName,
      input.data,
      input.data.length
    );
    const uploaded = Object.values(output || {});
    return uploaded.length > 0;
  } catch (error) {
    console.error(
      `MinioAdapter:upload - Erro ao tentar enviar imagem ${
        input.fileName
      }.\nErro: ${JSON.stringify(error, undefined, 2)}`
    );
    return false;
  }
}

/**
 * Remove um arquivo do bucket configurado.
 * @param filename - nome do arquivo a ser removido
 * @returns true se remoção bem-sucedida, false caso contrário
 */
export async function remove(filename: string): Promise<boolean> {
  try {
    await checkBucketExists();
    await bucketStorage.removeObject(bucketName, filename);
    return true;
  } catch (error) {
    console.error(
      `MinioAdapter:remove - Erro ao tentar remover imagem ${filename}.\nErro: ${JSON.stringify(
        error,
        undefined,
        2
      )}`
    );
    return false;
  }
}
