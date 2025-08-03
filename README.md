# Next.js Portfolio with Cloud Storage
A modern portfolio website built with Next.js, featuring theme customization and cloud storage for audio files.

## Features

- 🎨 **Theme Customization** - Create and customize themes with colors, audio, and tags
- ☁️ **Cloud Storage** - Support for multiple cloud storage providers (Cloudinary, Firebase, AWS S3)
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎵 **Audio Integration** - Upload and play custom audio files with themes
- 🎭 **Smooth Animations** - Beautiful transitions powered by Framer Motion
- 🧠 **Emojisphere** - Interactive 3D emoji animations that respond to scroll position

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
npm run setup-env
```

This will create a `.env.local` file with all the necessary environment variables. You'll need to:

1. **Choose a cloud storage provider** (Cloudinary recommended for beginners)
2. **Get your credentials** from the provider's dashboard
3. **Update the `.env.local` file** with your actual values

### 3. Start Development Server
```bash
npm run dev
```

## Cloud Storage Setup

This project supports multiple cloud storage providers for audio files:

### 🌟 Cloudinary
- Easy setup
- Generous free tier
- No server-side code needed

### Setup Instructions

1. **Run the setup script:**
   ```bash
   npm run setup-env
   ```

2. **Choose your provider and get credentials:**
   - [Cloudinary Console](https://cloudinary.com/console)

3. **Update `.env.local` with your credentials**

4. **For detailed setup instructions, see:** `CLOUDINARY_SETUP.md`

## 🧠 Emojisphere Feature

The Emojisphere is an interactive feature that adds floating 3D emojis to your portfolio:

### How to Use
1. **Click on the hero banner text** ("Creative Developer") to activate the Emojisphere
2. **Scroll through different sections** to see emojis change based on the content:
   - **Hero**: 👏 ✨ 💖 🎉 (Appreciation vibes)
   - **About**: 👨‍💻 🧠 🛠️ 💡 (Coding & Dev vibes)
   - **Projects**: 📚 🧩 🔧 📁 (Library & Tools)
   - **Testimonials**: 🙏 🌟 💬 💝 (Gratitude & Praise)

### Technical Details
- Built with **GSAP** for smooth animations
- **3D effects** with CSS transforms and drop shadows
- **Scroll-triggered** transitions between emoji sets
- **Responsive design** that works on all devices

## Environment Variables

The following environment variables are supported:

### Cloudinary
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```


## Project Structure

```
src/
├── components/
│   ├── modals/
│   │   ├── CreateThemeModal.tsx    # Theme creation modal
│   │   └── MusicSelectionModal.tsx # Music selection modal
│   ├── ui/
│   │   └── StorageStatus.tsx       # Storage provider indicator
│   └── theme/
│       └── ThemeProvider.tsx       # Theme context provider
├── utils/
│   └── cloudinary.ts               # Cloud storage utilities
└── hooks/
    ├── useSounds.ts                # Audio hooks
    └── use-toast.ts               # Toast notifications
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup-env` - Setup environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
