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
					'src/js/controllers/bodyController.js',
					'src/js/controllers/mainController.js',
					'src/js/controllers/headerController.js',
					'src/js/controllers/modalDialogControllers.js',
					'src/js/filters/durationFilter.js',
					'src/js/directives.js',
					'src/js/services/gameWonService.js',
					'src/js/services/guideService.js',
					'src/js/services/keyboardMapService.js',
					'src/js/app.js'
				],
				dest: 'build/js/<%= pkg.name %>.js'
		    },
		    js_lib: {
		      	src: [
		      		"lib/js/jquery.min.js",
					"lib/js/widgets.min.js",
		      		"lib/js/angular.min.js",
		      		"lib/js/ui-bootstrap-tpls.min.js",
		      		"lib/js/gestures.min.js",
					"lib/js/angular-socialshare.min.js",
		      	],
		      	dest: 'build/js/<%= pkg.name %>.lib.min.js',
		    },
		    css: {
		    	src: [
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
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
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
  		// 'unit',
  		'js',
  		'css'
  		// 'uglify:js' // uglfy 15-puzzle.js
  	]);
};