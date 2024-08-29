import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { writeFileSync, unlink } from 'fs';
import { ServiceResponse } from "../types/ServiceResponse";


const API_KEY = process.env.GEMINI_API_KEY

const mediaPath = path.join(__dirname, 'media');
const filePath = mediaPath + '/tempFile';

interface GeminiReturn {
    image_url: string;
    measure_value: number;
}

function saveImageFromBase64(base64Image: string): string {
    // Extract the image extension
    const extension = base64Image.substring("data:image/".length, base64Image.indexOf(";base64"));

    // Remove the image type prefix
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    // Convert the base64 data to a buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Save the buffer to a file with the specified extension
    writeFileSync(filePath + '.' + extension, buffer);

    return extension;
}


// saveImageFromBase64(base64Image);

type uploadResponse = {
    uri: string;
    mimeType: string;
}


async function uploadImage(base64Image: string): Promise<uploadResponse> {
    const fileManager = new GoogleAIFileManager(API_KEY as string);
    const extension = saveImageFromBase64(base64Image);
    try {
        const uploadResponse = await fileManager.uploadFile(
        `${filePath}.${extension}`,
        {
          mimeType: `image/${extension}`,
          displayName: `image.${extension}`,
        },
        );
      console.log(
        `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
      );
      return {
        uri: uploadResponse.file.uri,
        mimeType: uploadResponse.file.mimeType,
      }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to upload image');

        
    } finally {
        unlink(filePath + '.' + extension, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

}

// uploadImage(base64Image);


async function runGemini(base64Image: string): Promise<ServiceResponse<GeminiReturn>> {
    const genAI = new GoogleGenerativeAI(API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const uploadResponse = await uploadImage(base64Image);

    try {
        const result = await model.generateContent([
            "What is the value of the measure or the value? Show without measure units.",
            {
                fileData: {
                fileUri: uploadResponse.uri,
                mimeType: '',
                },
            },
            ]);
        const value = parseFloat(result.response.text());
        console.log(value);
        return {
            success: true,
            data: {
                image_url: uploadResponse.uri,
                measure_value: value,
            },
        }

    } catch (error) {
        // if ((error as any).status === 503) {
        //     console.log(error);
        //     console.log('invalid data');
        //     return {
        //         success: false,
        //         data: {
        //             error_code: 'INVALID_DATA',
        //             error_description: 'Invalid base64 image',
        //         },
        //     }
        // }
        console.log((error as any).status);
        // console.log(error);
        // console.log('internal server error');
        return {
            success: false,
            data: {
                error_code: 'INTERNAL_SERVER_ERROR',
                error_description: 'Failed to generate content',
            },
        }
        
        
    }
}

// runGemini(base64Image);

export default { runGemini };