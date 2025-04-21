"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

const dist = "./dist/";


gulp.task("build-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js",
        },
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                  plugins: ["@babel/plugin-proposal-class-properties"],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(`${dist}/js/`))
    .on("end", browsersync.reload);
});

gulp.task("build-prod-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "script.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(`${dist}/js/`));
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(`${dist}/css`))
    .pipe(browsersync.stream());
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
        .pipe(gulp.dest(dist))
        .pipe(browsersync.stream());
});

gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest(`${dist}/fonts`))
        .pipe(browsersync.stream());
});

gulp.task("icons", function () {
  return gulp.src("src/icons/**/*")
        .pipe(gulp.dest(`${dist}/icons`))
        .pipe(browsersync.stream());
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest(`${dist}/img`))
        .pipe(browsersync.stream());
});

gulp.task("mailer", function () {
  return gulp
          .src("src/mailer/**/*")
          .pipe(gulp.dest(`${dist}/mailer`))
})


gulp.task("assets", function () {
  return gulp.src("src/assets/**/*.*")
          .pipe(gulp.dest(`${dist}/assets/`))
})

gulp.task("watch", function () {
  browsersync.init({
    server: dist,
    port: 4000,
    notify: true,
  });
  
  gulp.watch("src/*.html", gulp.series("html")).on("change", browsersync.reload);
  gulp.watch("./src/js/**/*.js", gulp.series("build-js"));
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.series("styles"));
  gulp.watch("src/fonts/**/*", gulp.series("fonts"));
  gulp.watch("src/icons/**/*", gulp.series("icons"));
  gulp.watch("src/img/**/*", gulp.series("images"));
  gulp.watch("src/mailer/**/*", gulp.series("mailer"));
  gulp.watch("src/assets/**/*.*", gulp.series("assets"));
});

gulp.task("build", gulp.parallel("build-js", "styles", "html", "fonts", "icons", "images", "assets", "mailer"));

gulp.task("default", gulp.series("build", "watch"));