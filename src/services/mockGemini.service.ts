
interface GeminiReturn {
    image_url: string;
    measure_value: number;
}

async function mockGeminiReturn(base64Image: string): Promise<GeminiReturn> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                image_url: 'http://example.com/image1.jpg',
                measure_value: 123.45,
            });
        }, 1000);
    });
}