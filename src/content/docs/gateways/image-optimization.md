---
title: "Image Optimization"
description: "Pinata Darkroom Functionality"
---

# 🪄 Image Optimization

### Pinata Image Optimization

Pinata image optimizations provides image optimization functionality directly through your [Dedicated Gateway](broken-reference). These capabilities can significantly improve the load time and experience when viewing image content.

Any image you have uploaded can be manipulated with query string parameters. ‌The query string options are defined below. ‌&#x20;

#### Options ‌&#x20;

At least one option must be specified. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated. ‌&#x20;

* img-width=x&#x20;
  * Specifies maximum width of the image in pixels. Exact behavior depends on the fit mode (described below).&#x20;
* img-height=x&#x20;
  * Specifies maximum height of the image in pixels. Exact behavior depends on the fit mode (described below).&#x20;
* img-dpr=x&#x20;
  * Device Pixel Ratio. Default 1. Multiplier for width/height that makes it easier to specify higher-DPI sizes in .&#x20;
* img-fit&#x20;
  * Affects interpretation of width and height. All resizing modes preserve aspect ratio. Available modes are:&#x20;
    * img-fit=scale-down Image will be shrunk in size to fully fit within the given width or height, but won’t be enlarged.&#x20;
    * img-fit=contain Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio.&#x20;
    * img-fit=cover Image will be resized to exactly fill the entire area specified by width and height, and will cropped if necessary.&#x20;
    * img-fit=crop Image will be shrunk and cropped to fit within the area specified by width and height. The image won’t be enlarged. For images smaller than the given dimensions it’s the same as scale-down. For images larger than the given dimensions, it’s the same as cover.&#x20;
    * img-fit=pad Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio, and the extra area will be filled with a background color (white by default). Transparent background may be very expensive, and it’s better to use fit=contain and CSS object-fit: contain property instead.&#x20;
* img-gravity&#x20;
  * When cropping with fit=cover, specifies the most important side or point in the image that shouldn’t be cropped off.&#x20;
    * img-gravity=auto&#x20;
      * The point will be guessed by looking for areas that stand out the most from image background&#x20;
    * img-gravity=side and img-gravity=XxY&#x20;
      * If a side (left, right, top, bottom) or coordinates specified on a scale from 0.0 (top or left) to 1.0 (bottom or right), 0.5 being the center. The X and Y coordinates are separated by lowercase x, e.g. 0x1 means left and bottom, 0.5x0.5 is the center, 0.5x0.33 is a point in the top third of the image.&#x20;
* img-quality=x&#x20;
  * Specifies quality for images in JPEG, WebP and AVIF formats. The quality is in 1-100 scale, but useful values are between 50 (low quality, small file size) and 90 (high quality, large file size). 85 is the default. When using the PNG format, an explicit quality setting allows use of PNG8 (palette) variant of the format.&#x20;
* img-format=auto&#x20;
  * Allows serving of the WebP format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used.&#x20;
* img-anim=false&#x20;
  * Reduces animations to still images. This setting is recommended to avoid surprisingly large animGIF files, or flashing images.&#x20;
* img-sharpen=x&#x20;
  * Specifies strength of sharpening filter. The value is a floating-point number between 0 (no sharpening) and 10 (max). 1 is a recommended value.&#x20;
* img-onerror=redirect&#x20;
  * In case of a fatal error that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched. This option shouldn’t be used if the source images may be very large. This option is ignored if the image is from another domain (subdomains are OK).&#x20;
* img-metadata&#x20;
  * Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.&#x20;
    * img-metadata=keep&#x20;
      * Preserve most of the image metadata (including GPS location) when possible.&#x20;
    * img-metadata=copyright&#x20;
      * Discard all metadata except EXIF copyright tag. This is the default for JPEG images. img-metadata=none Discard all invisible metadata.

#### Formats and limitations

Read JPEG, PNG, GIF (including animations), and WebP images. SVG is not supported, since this format is inherently scalable and does not need resizing. Resize and generate JPEG and PNG images, and optionally AVIF or WebP. AVIF format is supported on a best-effort basis. Images that cannot be compressed as AVIF will be served as WebP instead.
