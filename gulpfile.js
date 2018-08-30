const gulp         = require("gulp"),
      watch        = require("gulp-watch"),
      postcss      = require("gulp-postcss"),
      autoprefixer = require("autoprefixer"),
      cssVars      = require("postcss-simple-vars"),
      cssNested    = require("postcss-nested"),
      cssImport    = require("postcss-import"),
      browserSync  = require("browser-sync").create();

gulp.task("styles", function(){
  return gulp.src("./app/assets/styles/styles.css")
    .pipe(postcss([cssImport, cssVars, autoprefixer, cssNested]))
    .on("error", function(errorInfo){
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles/"));
});

gulp.task("watch", function(){
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  watch("./app/assets/styles/**/*.css", function(){
    gulp.start("cssInject");
  });

  watch("./app/**/*.html", function(){
    browserSync.reload();
  });
});

gulp.task("cssInject", ["styles"], function(){
  return gulp.src("./app/assets/styles/styles.css")
    .pipe(browserSync.stream());
});
