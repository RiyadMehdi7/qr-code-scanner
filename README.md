# QR Code Scanner

A modern, web-based QR code scanner application that uses your device camera to detect and decode QR codes in real-time.

## Features

- **Real-time QR Code Scanning**: Instant QR code detection using your device camera
- **Scan History**: Automatic saving of all scanned QR codes with timestamps
- **Content Type Detection**: Automatically identifies URLs, text, emails, and phone numbers
- **Contextual Actions**: Quick actions based on content type (open URLs, copy text, call numbers, compose emails)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Easy on the eyes in any lighting condition

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A modern web browser with camera support

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RiyadMehdi7/qr-code-scanner.git
cd qr-code-scanner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Click "Start Scanning" to activate your camera
2. Point your camera at a QR code
3. The code will be automatically detected and decoded
4. View your scan history in the sidebar
5. Click on any scanned item to see details or take actions

## Browser Compatibility

This application works best in modern browsers that support:
- WebRTC API (for camera access)
- Local Storage (for scan history)

Tested and working in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Vite
- QR code detection powered by ZXing library
- UI components from Radix UI
