import { NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2Output,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
  },
});

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const params: ListObjectsV2CommandInput = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    MaxKeys: 20,
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
