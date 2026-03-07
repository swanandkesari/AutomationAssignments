module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: [
            'features/support/world.js',
            'features/support/hooks.js',
            'features/step-definitions/**/*.js'
        ],
        format: [
            'progress',
            'json:reports/cucumber_report.json',
            'html:reports/cucumber_report.html'
        ]
    },
};