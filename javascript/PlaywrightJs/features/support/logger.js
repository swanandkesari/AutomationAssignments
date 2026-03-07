const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        // Create a 'logs' folder if it doesn't exist
        this.logDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }

        this.logFile = path.join(this.logDir, 'execution.log');
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;
        console.log(logMessage);
        fs.appendFileSync(this.logFile, logMessage + '\n');
    }
}

module.exports = new Logger();