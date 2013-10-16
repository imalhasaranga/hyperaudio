module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/felixge/node-dateformat
		dateFormat: 'dS mmmm yyyy HH:MM:ss',
		stdBanner: '/*! <%= pkg.name %> v<%= pkg.version %> ~ (c) 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %> ~ Built: <%= grunt.template.today(dateFormat) %> */\n',

		concat: {

			options: {
				banner: '<%= stdBanner %>',
				separator: '\n\n'
			},
			hyperaudio: {
				files: {
					'build/<%= pkg.name %>.js': [
						// Top closure wrapper
						'src/js/wrapper/top.js',
						// Utilities read from: npm install
						'node_modules/dragdrop/dragdrop.js',
						'node_modules/wordselect/wordselect.js',
						// Modules that form the Hyperaudio Lib
						'src/js/hyperaudio.core.js',
						'src/js/hyperaudio.player.js',
						'src/js/hyperaudio.transcript.js',
						'src/js/hyperaudio.stage.js',
						'src/js/hyperaudio.projector.js',
						// Mapping objects onto the Hyperaudio Lib
						'src/js/mapping/hyperaudio.js',
						'src/js/mapping/utilities.js',
						// Bottom closure wrapper
						'src/js/wrapper/bot.js'
					]
				}
			}
		},

		uglify: {
			options: {
				// mangle: false,
				// compress: false,

				banner: '<%= stdBanner %>',
				beautify: {
					max_line_len: 0 // Generates the output on a single line
				}
			},
			hyperaudio: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
				}
			}
		},

		jshint: {

			before: {
				files: {
					src: [
						'Gruntfile.js',
						'src/js/*.js'
					]
				}
			},
			after: {
				files: {
					src: [
						'build/<%= pkg.name %>.js'
					]
				}
			},

			// configure JSHint (Documented at http://www/jshint.com/docs/)
			options: {
				// Using the jshint defaults

				// For the jQuery code for extend.
				"eqnull": true
/*
				// lots of other options...
				curly: true,
				eqeqeq: true,
				browser: true,
				globals: {
					jQuery: true
				}
*/
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint:before', 'concat', 'uglify', 'jshint:after']);

	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('test', ['jshint']);
};
