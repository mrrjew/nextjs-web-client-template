import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  //   GetObjectCommand,
} from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import uuid4 from "uuid4";
const Bucket = process.env.AWS_S3_BUCKET_NAME || "totel-images";
const s3 = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// endpoint to get the list of files in the bucket
// export async function GET() {
//   const response = await s3.send(new ListObjectsCommand({ Bucket }));
//   return NextResponse.json(response?.Contents ?? []);
// }

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const response = await Promise.all(
    files.map(async (file) => {
      // not sure why I have to override the types here
      const Body = (await file.arrayBuffer()) as Buffer;
      // generate a unique key for the file
      const fileName = `${uuid4()}-pacedream-${file.name?.trim()?.replace(/\s/g, "_").replaceAll("-", "_")}`;
      s3.send(
        new PutObjectCommand({
          Bucket,
          Key: fileName,
          Body,
          ContentType: file.type,
        }),
      );
      return fileName;
    }),
  );

  // delay for a few seconds to allow the file to be uploaded
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // generate urls for the uploaded files
  const result = await Promise.all(
    response.map(async (key) => {
      // const command = new GetObjectCommand({ Bucket, Key: key });
      // const url = await getSignedUrl(s3, command, { expiresIn: 0});
      // https://totel-images.s3.us-east-2.amazonaws.com
      return `https://${Bucket}.s3.us-east-2.amazonaws.com/${key}`;
    }),
  );
  return NextResponse.json({ result });
}
