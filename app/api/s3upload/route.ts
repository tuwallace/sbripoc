import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIATCKAS3K4YDO3OX2U",
    secretAccessKey: "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",
  },
});

const uploadFileToS3 = async (
  buffer: Buffer,
  fileName: string,
  contentType: string
) => {
  const fileBuffer = buffer;

  const params: PutObjectCommandInput = {
    Bucket: "sbri-webstorage",
    Key: `${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
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
    const fileName = await uploadFileToS3(buffer, file.name, file.type);

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
