module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['pageComponents/**/*.js', 'app.js', 'services/*.js', 'test/**/*.spec.js'],
            options: {
                jshintrc: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['test']);
	
    grunt.registerTask('test', ['jshint:files']);
};
