// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET, // Server-side only
}

// Upload function for client-side
export const uploadToCloudinary = async (file: File): Promise<string> => {
  // Validate environment variables
  if (!CLOUDINARY_CONFIG.cloudName) {
    throw new Error('Cloudinary cloud name is not configured')
  }
  if (!CLOUDINARY_CONFIG.uploadPreset) {
    throw new Error('Cloudinary upload preset is not configured')
  }

  // Validate file
  if (!file) {
    throw new Error('No file provided')
  }

  // Check file type
  const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a']
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}. Supported types: ${allowedTypes.join(', ')}`)
  }

  // Check file size (max 100MB)
  const maxSize = 100 * 1024 * 1024 // 100MB
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 100MB')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset)
  
  // For audio files, use 'video' resource type as Cloudinary treats audio as video
  formData.append('resource_type', 'video')
  formData.append('folder', 'portfolio-themes')
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/video/upload`,
      {
        method: 'POST',
        body: formData
      }
    )
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('Cloudinary upload error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })
      
      // Provide more specific error messages based on status code
      switch (response.status) {
        case 400:
          throw new Error('Bad request - check your Cloudinary configuration and file format')
        case 401:
          throw new Error('Unauthorized - check your Cloudinary API credentials')
        case 403:
          throw new Error('Forbidden - check your upload preset permissions')
        case 413:
          throw new Error('File too large')
        default:
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }
    }
    
    const result = await response.json()
    
    if (!result.secure_url) {
      throw new Error('Upload succeeded but no URL returned')
    }
    
    return result.secure_url
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Upload failed with unknown error')
  }
}

// Get compressed URL from Cloudinary
export const getCompressedUrl = (originalUrl: string): string => {
  if (!originalUrl.includes('cloudinary.com')) {
    return originalUrl // Return original URL if not from Cloudinary
  }

  // Extract the public ID from the URL
  const urlParts = originalUrl.split('/')
  const uploadIndex = urlParts.findIndex(part => part === 'upload')
  if (uploadIndex === -1) return originalUrl

  const publicId = urlParts.slice(uploadIndex + 2).join('/').split('.')[0]
  
  // Apply audio compression transformations
  // f_auto: auto format optimization (chooses best format)
  // q_auto: auto quality optimization (reduces file size while maintaining quality)
  // ac_none: no audio codec (for audio files, reduces overhead)
  // fl_attachment: force download (ensures proper file handling)
  const transformations = 'f_auto,q_auto,ac_none'
  
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/${transformations}/${publicId}.mp3`
}