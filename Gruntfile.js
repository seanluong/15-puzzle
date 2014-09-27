module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['src/js/*.js'],
				// the location of the resulting JS file
				dest: 'build/js/<%= pkg.name %>.js'
			}
		},
	    uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			build: {
		    	src: 'src/js/concat/*.js',
				dest: 'build/js/<%= pkg.name %>.min.js'
		    }
		},
		cssmin: {
			add_banner: {
				options: {
				  banner: '/* My minified css file */'
				},
				files: {
				  'build/css/style.min.css': 'src/css/*.css'
				}
			}
		},
		jshint: {
			// define the files to lint
			files: ['gruntfile.js', 'src/js/*.js'],
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
			  // more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		qunit: {
			all: {
				options: {
					urls: [
						'http://localhost:8888/test/js/test.html',
						'http://localhost:8888/test/js/testBoard.html'
					]
				}
		    }
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.registerTask('default', ['jshint','qunit','concat','cssmin']);
};