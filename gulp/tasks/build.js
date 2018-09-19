const gulp        = require("gulp"),
      imagemin    = require("gulp-imagemin"),
      usemin      = require("gulp-usemin"),
      cssmin      = require("gulp-cssmin"),
      htmlmin     = require("gulp-htmlmin"),
      uglify      = require("gulp-uglify"),
      rev         = require("gulp-rev"),
      del         = require("del"),
      browserSync = require("browser-sync").create();

gulp.task("previewDocs", function(){
  browserSync.init({
    "server": {
      baseDir: "docs"
    }
  });
});

gulp.task("deleteDocs", function(){
  return del("./docs");
});

gulp.task("optimizeImages", ["deleteDocs"], function(){
  return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/raw_images", "!./app/assets/images/raw_images/**/*"])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest("./docs/assets/images/"));
});

gulp.task("useminTrigger", ["deleteDocs"], function(){
  gulp.start("usemin");
});

gulp.task("usemin", ["styles", "scripts"], function(){
  return gulp.src("./app/*.html")
    .pipe(usemin({
      css: [function(){ return cssmin() }, function(){ return rev() }],
      // html: [ htmlmin({ collapseWhitespace: true }) ],
      js: [ function(){ return uglify() }, function(){ return rev() } ]
    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task("build", ["deleteDocs", "optimizeImages", "useminTrigger"]);
