import { Pool } from "pg";

export class Users {
  async readItInsecure(username: String): Promise<object | boolean> {
    const pool = new Pool();

    try {
      var result = await pool.query(
        `SELECT * FROM insecurenode.users WHERE username = '${username}'`
      );
    } catch (e: any) {
      return false;
    }
    await pool.end();

    if (result.rows.length === 0) {
      return false;
    }

    // return the results
    return result.rows;
  }

  async readItSecure(username: String): Promise<object | boolean> {
    const pool = new Pool();

    try {
      var result = await pool.query(
        `SELECT * FROM insecurenode.users WHERE username = $1`,
        [username]
      );
    } catch (e: any) {
      return false;
    }
    await pool.end();

    if (result.rows.length === 0) {
      return false;
    }

    // prepare the results variable
    var response = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      screenname: result.rows[0].screenname,
      avatar: result.rows[0].avatar,
      aboutme: result.rows[0].aboutme,
      usersettings: result.rows[0].usersettings,
      currenttokens: result.rows[0].currenttokens,
      issiteadmin: result.rows[0].issiteadmin,
      accountcreated: result.rows[0].accountcreated,
    };

    // return the results
    return response;
  }
}
