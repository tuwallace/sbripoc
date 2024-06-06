import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { createHash } from "crypto";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
  },
});

const uploadFileToS3 = async (
  buffer: Buffer,
  fileName: string,
  contentType: string,
  origin: string,
  name: string,
  type: string
) => {
  const fileBuffer = buffer;

  const hash = createHash("sha256");
  const checkSum = hash.update(buffer).digest("base64");
  const assetKey = `${crypto.randomUUID()}-${Date.now()}`;
  crypto.randomUUID();
  const params: PutObjectCommandInput = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: assetKey,
    Body: fileBuffer,
    ContentType: contentType,
    Metadata: {
      AssetOrigin: origin,
      AssetName: name,
      AssetType: type,
      OriginalFileName: fileName,
    },
    ChecksumSHA256: checkSum,
  };
  const command = new PutObjectCommand(params);
  const rc = await s3Client.send(command);
  //assetObj is the data for the ledger entry
  const assetObj = {
    assetId: rc.ETag?.split('"')[1],
    assetCheckSum: checkSum,
    assetName: name,
    assetType: type,
  };
  console.log(rc.ETag?.split('"'));
  console.log(assetObj);
  return fileName;
};

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file")! as File;
    const origin = formData.get("origin") as string;
    const assetName = formData.get("name") as string;
    const assetType = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(
      buffer,
      file.name,
      file.type,
      origin,
      assetName,
      assetType
    );

    return NextResponse.json(
      { msg: `File Uploaded ${fileName}` },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
