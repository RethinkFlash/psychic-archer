module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //validating html markup
    htmllint: {
    	all: ['src/**/*.html'],
    },

    //linting JS operation
    jshint: {
    	options: {
    		globals: {
    			jQuery:true
    		},
    	},
      files: ['src/js/client/*.js','src/js/server/*.js','unit_tests/**/*.js']
    },

    //linting CSS operation
    csslint: {
    	strict: {
    		options: {
    			import: 2
    		},
    		src: ['src/css/*.css'],
    		dest: 'build/',
    	},
    },

    //minifying operation
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dynamic_mappings: {
      	files: [{
      		expand: true,
      		cwd: '.',
      		src: ['src/js/**/*.js','unit_tests/**.*.js'],
      		dest: 'build/',
      		ext: '.min.js',
      	}],
      },
    },

    //unit testing with karma
    karma: {
	  unit: {
	    configFile: 'karma.conf.js',
	    singleRun: true,
	  },
	},

	//copies files to build directory where required
	copy: {
		main: {
			files: [
				//copies html files
				{expand: true, src: ['src/**/*.html'], dest:'build/'},
				//copies css files
				{expand: true, src: ['src/css/**/*.css'], dest:'build/'},
				//any files in libs folder
				{expand: true, src: ['src/js/libs/**/*.js'], dest:'build/'}
			]
		}
	},
  });

  // Load the plugin that provides the "uglify","jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['htmllint','jshint','csslint','karma']);
  grunt.registerTask('test', ['htmllint','jshint','csslint','karma']);
  grunt.registerTask('build',['uglify','copy']);
  grunt.registerTask('doall', ['htmllint','jshint','csslint','karma','uglify','copy'])

};