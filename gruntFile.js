module.exports = function(grunt) {

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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean:dist', 'copy:functions']);
};