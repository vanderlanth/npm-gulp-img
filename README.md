# npm-gulp-img
Save images for the web for different devices.

(Make sure [imageMagick](http://www.imagemagick.org/script/binary-releases.php) is installed on your computer)

1. Add your images in "src-img"
2. In your console, type "npm istall"
3. Then, to generate your images, type "sudo gulp images"
4. Your images will be generate in four sizes in the file "build-img"

In the file index.jade there is a little mixin which is used to generate a little gallery with the picture html tag.
To generate it, you just have to write the name (without suffix or extension) of your images in data/images.yml

For example :

```
avion-l.png = avion
```

Then type in your console : "sudo gulp"

(You can edit the suffix and the image presets in the gulpfile.js)

:)
