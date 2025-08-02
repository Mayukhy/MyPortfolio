#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🌤️  Cloudinary Setup Helper')
console.log('============================\n')

const envPath = path.join(process.cwd(), '.env.local')

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists!')
  console.log('Please check if your Cloudinary configuration is correct.\n')
} else {
  console.log('📝 Creating .env.local file...\n')
}

const envTemplate = `# Cloudinary Configuration
# Replace these values with your actual Cloudinary credentials

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
`

console.log('📋 Environment Variables Template:')
console.log('==================================')
console.log(envTemplate)

console.log('🔧 Setup Instructions:')
console.log('=====================')
console.log('1. Create a .env.local file in your project root')
console.log('2. Add the environment variables above to the file')
console.log('3. Replace the placeholder values with your actual Cloudinary credentials')
console.log('4. Restart your development server')
console.log('\n📖 For detailed setup instructions, see: CLOUDINARY_SETUP.md')
console.log('🌐 Get your Cloudinary credentials from: https://cloudinary.com/console') 