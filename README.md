# Quick URL Copy - Firefox Extension

A simple Firefox extension that copies the current tab's URL to your clipboard using a keyboard shortcut, just like ARC Browser.

## Features

- **Quick URL copying** with keyboard shortcut
- **Cross-platform shortcuts**: 
  - macOS: `Command + Shift + U`
  - Windows/Linux: `Ctrl + Shift + U`
- **Visual feedback** with a brief notification
- **No clicking required** - works from any tab

## Installation

### Install from Files (Developer Mode)

1. Download or clone these extension files
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension folder

### Required Files

Make sure you have these files in your extension folder:
- `manifest.json`
- `background.js`
- `README.md` (this file)

### Optional: Add Icons

To complete the extension, add these icon files to the folder:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)  
- `icon128.png` (128x128 pixels)

You can create simple square icons or use any 16x16, 48x48, and 128x128 pixel PNG images.

## Usage

1. Navigate to any webpage in Firefox
2. Press the keyboard shortcut:
   - **macOS**: `Command + Shift + U`
   - **Windows/Linux**: `Ctrl + Shift + U`
3. The URL will be copied to your clipboard
4. You'll see a brief notification confirming the copy

## How It Works

The extension uses Firefox's WebExtensions API to:
- Listen for the keyboard command
- Get the active tab's URL
- Copy it to the clipboard using the Clipboard API
- Show a notification with the copied URL

## Permissions

- **activeTab**: To access the current tab's URL
- **clipboardWrite**: To copy text to the clipboard
- **notifications**: To show copy confirmation

## Compatibility

- Firefox 57+ (supports WebExtensions)
- Works on all platforms (Windows, macOS, Linux)

## Troubleshooting

If the shortcut doesn't work:
1. Check that the extension is enabled in `about:addons`
2. Make sure no other extension is using the same shortcut
3. Try reloading the extension in `about:debugging`

## Development

To modify or improve the extension:
1. Edit the files as needed
2. Go to `about:debugging` → "This Firefox"
3. Click "Reload" next to the extension to apply changes