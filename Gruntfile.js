module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    base: '',
                    keepalive: true
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: [ 'styles' ]
                },
                files: {
                    'styles/index.css' : 'styles/index.less'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', []);

};