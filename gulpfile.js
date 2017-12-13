const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const data = require('gulp-data');
var fs = require('file-system');

gulp.task('sass',function() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest("docs/css"))
	.pipe(browserSync.stream());
});

gulp.task('js', function()
{
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest("docs/js"))
	.pipe(browserSync.stream());
});

gulp.task('pug:index', function(){
	return gulp.src('src/templates/main/index.pug')
	.pipe(data(function(file)
		{ 
			var json = require('./src/data/cardHeaders.json');
			return json;
		}))
	.pipe(pug({
		doctype: 'html',
		pretty: false
	}))
	.pipe(gulp.dest('./docs'));
});

gulp.task('pug:templates', function() {
  return gulp.src(['src/templates/*.pug',
  	'src/templates/projectPages/*.pug'])
  .pipe(data(function(file)
    { 
        var blob = {};
        //get all datafiles
		var files = fs.readdirSync('src/data');
        //take out the '.json' part to get the pure name
        files = files.map(file => file.slice(0,file.indexOf('.')));
        //assossiate each filename with the relevant JSON file
        files.forEach(function(file) {
             blob[file] = require('./src/data/' + file + '.json');
            });        
        return blob; 
	}))
  .pipe(pug({
    doctype: 'html',
    pretty: false
  }))
  .pipe(gulp.dest('./docs'))
});

gulp.task('serve',['sass'],function()
{
	browserSync.init({
		server: "./docs"
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
	gulp.watch("src/css/*.css").on('change',function(event)
    {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('css');
        browserSync.reload('*/docs.html');
    });
	gulp.watch("src/js/*.js").on('change',function(file)
    {
        gulp.start('js');
        browserSync.reload('*/docs.html');
    });
	gulp.watch(['src/templates/**/*',"src/data/*.json"]).on('change',function(file)
	{
        console.log("reloading PUG");
		gulp.start(['pug:index','pug:templates']);
		browserSync.reload('*/docs.html');
	});
});

gulp.task('fonts',function()
{
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest('docs/fonts'));
});


gulp.task('assets',function()
{
    return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('docs/assets'));
});

gulp.task('fonts-css',function() 
{
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest('docs/css'));
});

gulp.task('css',function() 
{
    return gulp.src('src/css/*.css')
    .pipe(gulp.dest('docs/css'));
});

gulp.task('default',['sass','css','pug:index','pug:templates','js','fonts','fonts-css','assets','serve']);