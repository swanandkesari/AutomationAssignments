module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: ['features/step-definitions/**/*.js', 'features/support/hooks.js'],
        format: ['progress', 'json:reports/cucumber_report.json']
    },
};