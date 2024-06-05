import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"


const s3Client = new S3Client({
    region:process.env.NEXT_PUBLIC_AWS_REGION!,
    credentials:{
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
    }
})
const uploadFileToS3 = async (buffer:Buffer, fileName:string, contentType:string) => {
    const fileBuffer = buffer
   
    const params:PutObjectCommandInput = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: `${fileName}-${Date.now()}`,
        Body: fileBuffer,
        ContentType: contentType
    }
   const command = new PutObjectCommand(params)
   await s3Client.send(command)
   return fileName
}
export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {

     try{
        const formData = await request.formData()
        const file = formData.get("file")! as File
        const origin = formData.get("origin") as string
        const assetName = formData.get("name") as string
        const assetType = formData.get("type") as string

        if(!file){
            return NextResponse.json({error:"File is required"},{status:400})
        }
       
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = await uploadFileToS3(buffer, file.name, file.type)
       
        return NextResponse.json({msg:`File Uploaded ${fileName}`},{status:201})

     }catch(error){
        console.log(error)
        return NextResponse.json({error: "Error uploading file"},{status:500})
     }
    
}