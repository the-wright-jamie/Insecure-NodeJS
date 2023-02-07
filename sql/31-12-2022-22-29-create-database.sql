DROP SCHEMA IF EXISTS InsecureNode CASCADE;

CREATE SCHEMA InsecureNode
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        screenname TEXT,
        hashedpassword TEXT NOT NULL,
        avatar TEXT,
        aboutMe TEXT,
        userSettings JSON,
        currentTokens JSON,
        accountCreated BIGSERIAL NOT NULL,
        isSiteAdmin BOOLEAN DEFAULT FALSE)

INSERT INTO insecurenode.users(username, screenname, hashedpassword, avatar, usersettings, currenttokens, accountcreated, issiteadmin)
	VALUES ('jwright', 'Jamie Wright', 'none', 'jwright.png', '{ "preferencesVersion": 1, "businessRankings": ["motor", "visual", "cognitive", "auditory"], "theme": "useSystem", "textSize": "useSystem", "visualEffects": { "showIcons": true, "showAnimations": true }}', '{ "test device": "123456789", "test device 2": "987654321" }', 1672851641, true);

INSERT INTO getoutside.users(username, screenname, hashedpassword, avatar, usersettings, accountcreated, issiteadmin)
	VALUES ('sgood', 'Syd Good', 'none', 'sgood.png', '{}', 1672851641, true);

INSERT INTO getoutside.users(username, screenname, hashedpassword, usersettings, accountcreated, issiteadmin)
	VALUES ('jsmith', 'John Smith', 'none', '{}', 1672851641, false);