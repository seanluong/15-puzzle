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
					'src/js/directives/*.js',
					'src/js/directives.js',
					'src/js/services/*.js',
					'src/js/services.js',
					'src/js/modules/*.js',
					'src/js/app.js'
				],
				dest: 'build/js/<%= pkg.name %>.js'
		    },
		    js_lib: {
		      	src: [
		      		"bower_components/jquery/dist/jquery.min.js",
		      		"bower_components/angular/angular.min.js",
		      		"bower_components/angular-gestures/gestures.min.js"
		      	],
		      	dest: 'build/js/<%= pkg.name %>.lib.min.js',
		    },
		    css: {
		    	src: [
		    		'bower_components/bootstrap/dist/css/bootstrap.min.css',
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
						'build/css/<%= pkg.name %>.css'
					]
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/js/**/*.js', 'test/js/**/*.js'],
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
	grunt.registerTask('unit', [
		'karma',
	]);
	grunt.registerTask('css', [
		'sass',
		'concat:css',
		'cssmin'
	]);
	grunt.registerTask('js', [
		'jshint',
		'concat:js',
  		'concat:js_lib',
	]);
  	grunt.registerTask('default', [
  		'unit',
  		'js',
  		'css'
  		// 'uglify:js' // uglfy 15-puzzle.js
  	]);
};