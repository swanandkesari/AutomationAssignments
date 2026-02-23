module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: ['features/**/*.js'],
        //format: ['progress', 'html:reports/cucumber_report.html'],
        format: ['progress', 'json:reports/cucumber_report.json'],
    },
};