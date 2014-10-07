module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    concat: {
			options: {
				separator: '\n',
				stripBanners: true
			},
			js: {
		      	src: [
					'src/js/board.js',
					'src/js/controllers/*.js',
					'src/js/controllers.js',
					'src/js/filters/*.js',
					'src/js/filters.js',
					'src/js/directives/*.js',
					'src/js/directives.js',
					'src/js/services/*.js',
					'src/js/services.js',
					'src/js/app.js'
				],
				dest: 'build/js/<%= pkg.name %>.js'
		    },
		    js_lib: {
		      	src: [
		      		"bower_components/jquery/dist/jquery.min.js",
		      		"bower_components/angular/angular.min.js",
		      		"lib/js/ui-bootstrap-tpls.min.js",
		      		"bower_components/angular-gestures/gestures.min.js",
		      	],
		      	dest: 'build/js/<%= pkg.name %>.lib.min.js',
		    },
		    css: {
		    	src: [
		    		'lib/css/angular-socialshare.min.css',
		    		'lib/css/bootstrap.css',
		    		'src/css/style.css'
		    	],
		    	dest: 'build/css/<%= pkg.name %>.css'
		    }
		},
		uglify: {
			options: {
				wrap: true,
				preserveComments: false,
				sourceMap: true
			},
			js: {
				files: {
					'build/js/<%= pkg.name %>.min.js': ['build/js/<%= pkg.name %>.js']
				}
			}
		},
		cssmin: {
			task: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'build/css/<%= pkg.name %>.min.css': [
						'lib/css/angular-socialshare.min.css',
						'build/css/<%= pkg.name %>.css'
					]
				}
			}
		},
		jshint: {
			files: ['gruntfile.js', 'src/js/**/*.js', 'test/js/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		karma: {
			unit: {
				configFile: "karma.conf.js"
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {
					'src/css/style.css': 'src/css/style.scss'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-karma');

	// testing task
	grunt.registerTask('unit', [
		'karma',
  // 		'qunit',
	]);

	// css minify task
	grunt.registerTask('css', [
		'concat:css',
		'cssmin'
	]);
	// js-related task
	grunt.registerTask('js', [
		'jshint',
		'concat:js',
  		'concat:js_lib',
	]);

	// one task to rule them all!
  	grunt.registerTask('default', [
  		'unit',
  		'js',
  		'sass',
  		'css'
  		// 'uglify:js' // uglfy 15-puzzle.js
  	]);
};