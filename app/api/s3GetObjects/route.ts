import { NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2Output,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIATCKAS3K4YDO3OX2U",
    secretAccessKey: "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",
  },
});

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const params: ListObjectsV2CommandInput = {
    Bucket: "sbri-webstorage",
    MaxKeys: 10,
  };
  try {
    const command = new ListObjectsV2Command(params);
    const rc: ListObjectsV2Output = await s3Client.send(command);
    return NextResponse.json(
      { msg: `Get Lists of Object Successed`, result: rc.Contents },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ Error: "Get Lists of Objects Failed" });
  }
}
