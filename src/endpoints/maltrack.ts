import { LogSystem } from "../support/logger";

const logger = new LogSystem("maltrack.ts");

export class Maltrack {
  logIPAddress(req: any) {
    // delete the stuff at the start of the remote address
    const address = req.socket.remoteAddress!.replace(/^.*:/, "");

    // log out the information - saves to console and file
    logger.log.info(`REQUEST
    CAPTURED INFORMATION:
    - IP Address: ${address}`);
  }
}
