module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jst: {
      amd: {
        options: {
          amd: true,
          processName: function(filename) {
            return filename.replace(/^templates\//, "");
          }
        },
        files: {
          'js/templates.amd.js': ['templates/**/*.jst']
        }
      },
      standard: {
        options: {
          namespace: "Templates",
          processName: function(filename) {
            return filename.replace(/^templates\//, "");
          }
        },
        files: {
          'js/templates.js': ['templates/**/*.jst']
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          optimize: "none",
          baseUrl: 'js',
          paths: {
            jquery: "empty:",
            underscore: "empty:",
            backbone: "empty:",
            templates: "templates.amd"
          },
          shim: {
            bootstrap: ["jquery"],
            underscore: {
              exports: '_'
            },
            backbone: {
              deps: ['jquery', 'underscore'],
              exports: 'Backbone'
            },
            templates: ["underscore"]
          },
          name: "sinclair",
          out: "js/sinclair.amd.js"
        }
      }
    },
    less: {
      compile: {
        options: {
          cleancss: true
        },
        files: {
          'css/sinclair.compiled.css' : ['less/sinclair.less']
        }
      }
    },
    watch: {
      templates: {
        files: ['templates/**/*.jst'],
        tasks: ['jst']
      },
      main: {
        files: ['js/sinclair.js', 'js/templates.js'],
        tasks: ['requirejs']
      },
      less: {
        files: ['less/*.less', 'less/**/*.less'],
        tasks: ['less']
      }
    }
  });

  // NPM widgets
  grunt.loadNpmTasks("grunt-contrib-jst");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  
  // Tasks
  grunt.registerTask("default", ["jst", "requirejs", "less"])
}
