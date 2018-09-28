module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({
        clean: {
            dist: ['./dist']
        },
        copy: {
            functions: {
                files: [{
                    expand: true,
                    src: ['**'],
                    cwd: './src/functions/',
                    dest: './dist/functions'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['clean:dist', 'copy:functions']);
};