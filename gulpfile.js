var gulp = require('gulp'),
browserSync = require('browser-sync'),
reload = browserSync.reload,
compass = require('compass-importer'),
del = require('del'),
prefixer = require('gulp-autoprefixer'),
cache = require('gulp-cache'),
concat = require('gulp-concat'),
csscomb = require('gulp-csscomb'),
imagemin = require('gulp-imagemin'),
flatten = require('gulp-flatten'),
mediacomb = require('gulp-group-css-media-queries'),
order = require('gulp-order'),
rename = require('gulp-rename'),
scss = require('gulp-sass'),
twig = require('gulp-twig'),
// uglify = require('gulp-uglifyjs'),
watch = require('gulp-watch'),
spritesmith = require('gulp.spritesmith'),
imageminJpegRecompress = require('imagemin-jpeg-recompress'),
pngquant = require('imagemin-pngquant');

var config = {
    server: {
        baseDir: "dist"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9999,
    logPrefix: "Frontend"
};

gulp.task('scss', function() {
    return gulp.src([
        'app/fonts/**/*.css',
        'libs/mixins/**/*.+(scss|css)',
        'libs/other-libs/**/*.+(scss|css)',
        'app/blocks/base.blocks/**/*.+(scss|css)',
        'app/blocks/common.blocks/**/*.+(scss|css)',
        'app/blocks/site.blocks/**/*.+(scss|css)'
        ])
    .pipe(order([
        'libs/mixins/**/*.+(scss|css)',
        'app/fonts/**/*.css',
        'libs/other-libs/**/*.+(scss|css)',
        'app/blocks/base.blocks/base/base.scss',
        'app/blocks/common.blocks/**/*.+(scss|css)',
        'app/blocks/site.blocks/**/*.+(scss|css)'],{base: './'}))
    .pipe(concat('style.scss'))
    .pipe(scss({importer: compass, includePaths:['libs/mixins']}))
    .pipe(prefixer({
        browsers: ['last 10 versions'],
    }))
    .pipe(mediacomb())
    .pipe(csscomb())
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream: true}));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('app/img/sprites/*')
        .pipe(cache(imagemin([
            pngquant()
            ],
            {
                verbose:true
            }
            )))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            imgPath:'../img/sprite.png',
            cssFormat: "scss"
        }));

    spriteData.img.pipe(gulp.dest('dist/img/'));
    spriteData.css.pipe(gulp.dest('libs/mixins'));
});

gulp.task('js', function() {
    return gulp.src([
        'libs/other-libs/**/*.js',
        'app/blocks/base.blocks/**/*.js',
        'app/blocks/common.blocks/**/*.js',
        'app/blocks/site.blocks/**/*.js'
        ])
    .pipe(concat('main.js'))
    .on('error', function handleError() {
        this.emit('end'); 
    })
    // .pipe(uglify({
    //     comments: false
    // }))
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream: true}));
});

gulp.task('twig', function () {
    var allPages = gulp.src(['!app/blocks/site.blocks/**/home-page.twig', 'app/blocks/site.blocks/**/*page.twig'])
    .pipe(twig({
        base: 'app'
    }))
    .pipe(flatten())
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));

    var mainPage = gulp.src('app/blocks/site.blocks/**/home-page.twig')
    .pipe(twig({
        base: 'app'
    }))
    .pipe(flatten())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));
});

gulp.task('fonts',function(){
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', ['img', 'sprite', 'fonts', 'scss','js','twig'],function(){

    watch('app/blocks/**/*.+(scss|css)', function(event,cb){
        gulp.start('scss');
    });

    watch('app/blocks/**/*.js', function(event,cb){
        gulp.start('js');
    });

    watch('libs/other-libs/*.js', function(event,cb){
        gulp.start('js');
    });

    watch('app/blocks/**/*.twig', function(event,cb){
        gulp.start('twig');
    });

    watch('app/img/**/*', function(event,cb){
        gulp.start('img');
        gulp.start('sprite');
    });

    watch('app/fonts/**/*', function(event,cb){
        gulp.start('fonts');
        gulp.start('scss');
    });
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src(['app/img/**/*',"!app/img/{sprites,sprites/**}"])
    .pipe(cache(imagemin([
        imageminJpegRecompress({
            loops:4,
            min: 50,
            max: 95,
            quality:'high'
        }),
        pngquant()
        ],
        {
            verbose: true
        }
        )))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('default', ['watch', /*'webserver'*/]);
// gulp.task('default', ['watch', 'webserver']);