# Contributing

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can find us in our [Discord Server](https://skyra.pw/join)**.

To contribute to this repository, feel free to create a new fork of the repository and
submit a pull request. We highly suggest [ESLint](https://eslint.org/) to be installed
in your text editor or IDE of your choice to ensure builds from GitHub Actions do not fail.

1. Fork, clone, and select the **master** branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Commit your changes, and push them.
5. Submit a Pull Request [here](https://github.com/kyranet/Skyra/pulls)!

## Running the dashboard locally

To run the dashboard locally, you'll need a local version of Skyra running.

After forking/cloning this repo to a folder locally:

1. Duplicate `.env.development` and rename it to `.env.development.local`
2. Replace the value of `REACT_APP_CLIENT_ID` to your bot's ID
3. Install dependencies with `yarn`.
4. Run `yarn start` to start the React dev server
