# Yi Jing Bot
<img width="293" alt="resim" src="https://user-images.githubusercontent.com/61288822/230892627-a0cd3dcc-ecbe-404a-b465-ca57a4d67671.png">

Discord bot that does your Yi Jing reading.

## Setup Instructions

### 1. Create Discord Application/Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Click "Add Bot"
5. Under the bot's username, click "Reset Token" and copy the new token
   - Keep this token secret! Don't share or commit it
   - You'll need this for the `.env` file later

### 2. Configure Bot Permissions
1. In the Developer Portal, click "OAuth2" -> "URL Generator" in the left sidebar
2. Select these scopes:
   - `bot`
   - `applications.commands`
3. Under "Bot Permissions" select:
   - Read Messages/View Channels
   - Send Messages
   - Use Slash Commands
4. Copy the generated URL at the bottom

### 3. Add Bot to Your Server
1. Open the URL you copied in a new browser tab
2. Select your server from the dropdown
3. Click "Authorize"
4. Complete the CAPTCHA if prompted

### 4. Local Setup
1. Clone this repository
2. Copy `.env.template` to `.env`
3. Fill in the required environment variables:
   ```
   TOKEN=your_bot_token_here
   CLIENT_ID=your_application_id_here
   ```
   - TOKEN: The bot token you got in step 1
   - CLIENT_ID: Found in your application's "General Information" page

4. Install dependencies:
   ```bash
   npm install
   ```

5. Deploy slash commands:
   ```bash
   node deploy-commands.js
   ```

6. Start the bot:
   ```bash
   node index.js
   ```

## Usage

The bot provides several slash commands:

- `/read` - Quick reading showing hexagram symbols and changing lines
- `/fullread` - Detailed reading with judgments and images
- `/lookup` - Look up specific hexagrams and their line meanings
  - Can specify individual lines (e.g., "1,3,5" or "2 4 6")
  - Or view entire trigrams (lines 1,2,3 or 4,5,6)

## Troubleshooting

### Bot Not Responding
1. Check that the bot is online in your server
2. Verify the TOKEN in your .env file matches your bot's token
3. Make sure you've run deploy-commands.js after any command changes
4. Check the console for any error messages

### Commands Not Showing
1. Ensure you've run deploy-commands.js
2. Verify the CLIENT_ID in your .env matches your application ID
3. Try removing and re-adding the bot to your server

### Permission Issues
1. Check that the bot has the required permissions in your server
2. Verify the bot's role is high enough in the server's role hierarchy
3. Make sure the bot has access to the channels you're using it in

## Server Deployment

### GitHub Setup on Ubuntu Server
1. Install GitHub CLI:
   ```bash
   # Add GitHub CLI repository
   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
   sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
   
   # Install gh
   sudo apt update
   sudo apt install gh
   ```

2. Authenticate with GitHub:
   ```bash
   gh auth login
   ```
   - Select "GitHub.com"
   - Select "HTTPS"
   - Select "Y" for authentication with your GitHub credentials
   - Complete the login process in your browser

3. Clone the repository:
   ```bash
   gh repo clone yourusername/yi-jing-bot
   cd yi-jing-bot
   ```

### Running Bot with Forever

1. Install Forever globally:
   ```bash
   sudo npm install -g forever
   ```

2. Start the bot:
   ```bash
   forever start index.js
   ```

3. Useful Forever commands:
   ```bash
   # List all running processes
   forever list

   # Stop the bot
   forever stop index.js

   # Restart the bot
   forever restart index.js

   # Stop all processes
   forever stopall

   # View logs
   forever logs index.js
   ```

4. To run on system startup, add to crontab:
   ```bash
   # Open crontab editor
   crontab -e

   # Add this line
   @reboot cd /path/to/yi-jing-bot && /usr/local/bin/forever start index.js
   ```

### Updating the Bot
1. Pull latest changes:
   ```bash
   cd /path/to/yi-jing-bot
   gh repo sync
   ```

2. Install any new dependencies:
   ```bash
   npm install
   ```

3. Deploy new commands if needed:
   ```bash
   node deploy-commands.js
   ```

4. Restart the bot:
   ```bash
   forever restart index.js
   ```

   
## Technical Notes

### ES Modules
This bot uses ES Modules instead of CommonJS. This means:

- `"type": "module"` is set in package.json
- We use `import/export` instead of `require()/module.exports`
- File extensions (`.js`) are required in import paths
- All JavaScript files use ES Module syntax:

## Credits

[I Ching CLI](https://github.com/abbeymondshein/i-ching-cli) for the traditional calculations to get the hexagrams.

