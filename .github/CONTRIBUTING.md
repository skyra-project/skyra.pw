# Contributing

**If you have a question, you can find us in our [Discord Server](https://join.wolfstar.rocks)**.

To contribute to this repository, feel free to create a new fork of the repository and
submit a pull request. We highly suggest [ESLint](https://eslint.org/) to be installed
in your text editor or IDE of your choice to ensure builds from GitHub Actions do not fail.

1. Fork, clone, and select the **main** branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Commit your changes, and push them.
5. Submit a Pull Request [here](https://github.com/wolfstar-project/wolfstar.rocks/pulls)!

## Running the dashboard locally

To run the dashboard locally, you'll need a local version of WolfStar running.

After forking/cloning this repo to a folder locally:

1. Duplicate `.env.development` and rename it to `.env.development.local`
2. Replace the value of `NEXT_PUBLIC_CLIENT_ID` to your bot's ID
3. Go to the Discord developer portal: https://discord.com/developers/applications/
4. Select your bot application and go to the `OAuth2` tab
5. Add redirect URL's for `http://localhost:3000/oauth/callback` and `http://localhost:3000/oauth/guild`
6. Run a local instance of WolfStar, be sure to follow it's local development guidelines as well.

-   You have to set the CLIENT_ID, CLIENT_SECRET in WolfStar's configuration to your own bot properly!

7. Install dependencies with `yarn`.
8. Run `yarn start` to start the React dev server
