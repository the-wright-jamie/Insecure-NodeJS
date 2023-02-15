// Originally from Get Outside API
import winston, { Logger } from "winston";

// prepare environment config
require("dotenv").config();

// setting up console log format
const loggingFormat = winston.format.printf((info: any) => {
  // time + milliseconds
  var time = info.timestamp.substring(info.timestamp.indexOf("T") - 11);
  time = time.substring(11, 23);
  // get the first letter of the level
  var level = info.level.substring(0, 1);
  // max length of the file name
  var maxLength = 10;
  var id = info.logTrackingId === undefined ? "server" : info.logTrackingId;
  var file = truncate(info.loggedFrom, maxLength);
  var spaces = generateSpaces(info.loggedFrom.length, maxLength);
  return `[${time}] ${level} - ${id} - ${file}:${spaces} ${info.message}`;
});

function generateSpaces(currentLength: number, maxLength: number): String {
  var spaces = "";
  for (let i = currentLength; i < maxLength; i++) {
    spaces = spaces + " ";
  }

  return spaces;
}

function truncate(stringToTruncate: string, maxLength: number): string {
  if (stringToTruncate.length <= maxLength) {
    return stringToTruncate;
  } else {
    // string to string array
    const stringArray = [...stringToTruncate];

    maxLength = maxLength - 1;

    // something like long-name.ts would be shortened to lon…ame.ts
    // this should be enough information to figure out what file it is
    stringArray[maxLength - 6] = "…";
    stringArray[maxLength - 5] = stringArray[stringToTruncate.length - 6];
    stringArray[maxLength - 4] = stringArray[stringToTruncate.length - 5];
    stringArray[maxLength - 3] = stringArray[stringToTruncate.length - 4];
    stringArray[maxLength - 2] = stringArray[stringToTruncate.length - 3];
    stringArray[maxLength - 1] = stringArray[stringToTruncate.length - 2];
    stringArray[maxLength] = stringArray[stringToTruncate.length - 1];

    for (let i = maxLength + 1; i < stringToTruncate.length; i++) {
      delete stringArray[i];
    }

    var output = stringArray.toString();

    output = output.replace(/,/g, "");

    return output;
  }
}

export class LogSystem {
  log: Logger;

  constructor(loggedFrom: String) {
    var date = new Date();
    this.log = winston.createLogger({
      level:
        process.env.ENVIRONMENT === "dev" || "undefined" ? "silly" : "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { loggedFrom: loggedFrom },
      transports: [
        new winston.transports.Console({ format: loggingFormat }),
        new winston.transports.File({
          filename: `${`logs/${
            process.env.ENVIRONMENT
          }-logs/${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDay()}/output.log`}`,
          format: loggingFormat,
        }),
      ],
    });

    this.log.silly(
      `${loggedFrom} has registered itself for the logging service`
    );
  }
}
