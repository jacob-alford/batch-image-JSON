# batch-image-JSON
(node.js) imports a batch of image files in a specific local folder, creates a useful JSON object with EXIF data.

## Node.js Dependencies
* fs
* jpeg-exif

## Configuration
* Set the directory in the constant "directory."
* Set the preference of coordinates (this implementation was to extract coordinates into a JSON file)
  * "dms" - Degrees, minutes, seconds.
  * "dec" - Degrees by decimal.

## Steps to deployment:
1. Install [Node.js](https://nodejs.org/en/)
1. Install [jpeg-exif](https://www.npmjs.com/package/jpeg-exif) using `npm i jpeg-exif` in the command-line, e.g. Terminal
 1. Note: code would have to be tweaked if other dependencies are desired.  I found this was because it was synchronous.
1. Place index.js and desired image batch into the same folder.
1. Specify directory at the top of index.js.
1. Open the command-line (terminal) and navigate to the proper directory using `cd <folder path>` where `<folder path>` is the location of the folder you placed index.js in.
1. Execute `node index.js`
 1. The default configuration is to list the files by name alongside their coordinate data found in the metadata of the image files.
