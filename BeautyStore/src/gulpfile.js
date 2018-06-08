var gulp = require("gulp");//引入gulp插件
var html=require("gulp-minify-html");//引入html压缩插件
var css=require("gulp-minify-css");//引入css压缩插件
var scss=require("gulp-sass");//引入sass插件
var connect=require("gulp-connect");//配置自动刷新
var imagemin=require("gulp-imagemin");//压缩图片
/*var babel=require("gulp-babel");//0
var concat=require("gulp-concat");//js代码合并
var jshint=require("gulp-jshint");//js错误检测
var jshinthtml=require("gulp-jshint-html-reporter");//
var rename=require("gulp-rename");//重命名插件
var uglify=require("gulp-uglify");//js压缩插件*/

/* "babel-core": "^6.26.3",
    "babel-preset-es2015": "^6.24.1",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.1",
    "gulp-concat": "^2.6.1",
    "gulp-connect": "^5.5.0",
    "gulp-jshint": "^2.1.0",
    "gulp-jshint-html-reporter": "^0.1.3",
    "gulp-minify-css": "^1.2.4",
    "gulp-minify-html": "^1.0.6",
    "gulp-rename": "^1.2.3",
    "gulp-sass": "^4.0.1",
    "gulp-uglify": "^3.0.0",
    "jshint": "^2.9.5"*/

//复制文件（目录拷贝）
gulp.task("copyhtml",function () {
    gulp.src("*.html")
        .pipe(gulp.dest("../dist/"));
});
//压缩html文件
gulp.task("uglifyhtml",function () {
    gulp.src("html/*.html")//引入文件
        .pipe(html())//应用插件
        .pipe(gulp.dest("../dist/html"));//输出文件
});
//监听压缩html
gulp.task("watchhtml",function () {
    gulp.watch("html/*.html",function () {
        gulp.run("uglifyhtml");
    })
});
//编译scss
gulp.task("scss",function () {
    gulp.src("scss/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("./css/"))
});
//监听scss
gulp.task("watchscss",function () {
    gulp.watch("scss/*.scss",function () {
        gulp.run("scss");
    })
});
//压缩css
gulp.task("uglifycss",function () {
    gulp.src("css/*.css")
        .pipe(css())
        .pipe(gulp.dest("../dist/css/"));
});
//监听压缩css
gulp.task("watchcss",function () {
   gulp.watch("css/*.css",function () {
       gulp.run("uglifycss");
   })
});
//页面自刷新
gulp.task("connect",function () {
    connect.server({
       port:8888,
       livereload:true
    });
});
gulp.task("connecthtml",function () {
    gulp.src(["html/!*.html","css/!*.css"])
        .pipe(connect.reload());
});
gulp.task("connectwatch",function () {
    gulp.watch(["html/!*.html","css/!*.css"],["connecthtml"]);
});
//压缩图片
gulp.task("imagemin",function () {
    gulp.src("img/*.png")
        .pipe(imagemin())
        .pipe(gulp.dest("../dist/img"));
});


//执行任务
gulp.task("default",["watchhtml","watchscss","watchcss","imagemin","connect","connectwatch"]);