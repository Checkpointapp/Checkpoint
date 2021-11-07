# How to get started with development
## Setting up your machine (Windows)
### Git & Git Bash
Visit https://git-scm.com/download/win and follow the install instructions. Open Git Bash. Type `git config --global user.name "GITHUB USERNAME"` (replace GITHUB USERNAME with your actual username). Type `git config --global user.email "MY_NAME@example.com"` (replace with the email you use for github).
### Node.js
Visit https://nodejs.org/en/download/. Choose LTS and Windows Installer.
### VSCodium
Download the best editor ever: https://vscodium.com/#install
## Cloning the repository
Open Git Bash. Make a directory for dev stuff using `mkdir dev`. Enter the directory using `cd dev`. Clone the repo: `git clone https://github.com/Checkpointapp/Checkpoint`. Enter the directory `cd Checkpoint`.
## Starting the dev server
Enter the node.js directory using `cd checkpoint`. Type `npm ci` to install all package dependencies. This will take up to 15 minutes depending on your computer and internet speed. Finally, type `npm start`. Wait a minute or two and the npm server will open http://localhost:3000 in your browser.
## Adding to the codebase
Before making any changes, make sure to pull down the latest remote changes using `git pull`.    

Then type `git add .` to add all the files you've changed. Type `git commit -m "COMMIT MESSAGE"` replacing COMMIT MESSAGE with a short description of what you changed. Finally, use `git push origin main` to push your changes to Github.