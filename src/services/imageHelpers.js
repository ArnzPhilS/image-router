import { readFile } from 'fs/promises';

// Helper function to convert an object to FormData
export function objectToFormData(obj) {
    const formData = new FormData()
    
    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined || value === null) return
        
        // Handle file uploads (image or mask)
        if ((key === 'image' || key === 'mask') && value) {
            if (Array.isArray(value) && key === 'image') {
                // Handle multiple images
                value.forEach(item => {
                    if (item.blob && item.filename) {
                        formData.append(`${key}[]`, item.blob, item.filename)
                    }
                })
            } else if (value.blob && value.filename) {
                // Handle single file
                formData.append(key, value.blob, value.filename)
            }
        } else {
            // For all other fields
            formData.append(key, value)
        }
    })
    
    return formData
}

// Utility function to process image files
export async function processSingleOrMultipleFiles(imageFiles) {
    if (Array.isArray(imageFiles)) {
        return processMultipleFiles(imageFiles)
    } else {
        return processSingleFile(imageFiles)
    }
}

export async function processSingleFile(file) {
    if (Array.isArray(file) && file.length > 1) {
        throw new Error('This model supports only one image input')
    }
    const actualFile = Array.isArray(file) ? file[0] : file
    const buffer = await readFile(actualFile.path);

    return {
        blob: new Blob([buffer], { type: actualFile.mimetype }),
        filename: actualFile.originalname
    }
}

export async function processMultipleFiles(files) {
    return await Promise.all(files.map(file => processSingleFile(file)))
}

// Function to get Google Gemini API key based on model and environment variables
export function getGeminiApiKey(model) {
    const geminiKeyString = process.env.GOOGLE_GEMINI_API_KEY
    let geminiKeyArray = []
    
    if (geminiKeyString) {
      geminiKeyArray = geminiKeyString.split(',').filter(key => key.trim() !== '')
    }
    
    // Make sure we have at least one key
    if (!geminiKeyArray.length) {
      throw new Error('No Google Gemini API key found')
    }
    
    // Use random API key for free models; use the first key for paid models
    if (model === 'gemini-2.0-flash-exp-image-generation' && geminiKeyArray.length > 1) {
        return geminiKeyArray[Math.floor(Math.random() * geminiKeyArray.length)]
    } else {
        return geminiKeyArray[0]
    }
}

export async function encodeFileToDataURI(file) {
  const buffer = await readFile(file.path)
  const mimeType = file.mimetype || 'image/png'
  const base64 = buffer.toString('base64')
  return `data:${mimeType};base64,${base64}`
}

export function postCalcRunware(imageResult) {
    try {
        // just return the cost, it's already in the result
        return imageResult.cost
    } catch (error) {
        console.error('Error calculating Runware price:', error)
        return 1 // return 1 for safety, this should never happen
    }
}