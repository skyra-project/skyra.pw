# WolfStar.Rocks [![Discord](https://discord.com/api/guilds/830481105261821952/embed.png)](https://join.wolfstar.rocks)

[![Docker Pulls](https://img.shields.io/docker/pulls/wolfstarbot/wolfstar.rocks?logo=docker&logoColor=white)](https://hub.docker.com/r/wolfstarbot/wolfstar.rocks)

## Set-Up

To run the dashboard locally, you'll need a local version of WolfStar running.

After forking/cloning this repo to a folder locally:

1. Duplicate `.env.development` and rename it to `.env.development.local`
2. Replace the value of `NEXT_PUBLIC_CLIENT_ID` to your bot's ID
3. Go to the Discord developer portal:
   https://discord.com/developers/applications/
4. Select your bot application and go to the `OAuth2` tab
5. Add redirect URL's for `http://localhost:3000/oauth/callback` and
   `http://localhost:3000/oauth/guild`
6. Run a local instance of WolfStar, be sure to follow it's local development
   guidelines as well.

- You have to set the CLIENT_ID, CLIENT_SECRET in WolfStar's configuration to
  your own bot properly!

7. Install dependencies with `yarn`.
8. Run `yarn dev` to start the NextJS dev server

## Links

**WolfStar links**

- [WolfStar Invite Link](https://invite.wolfstar.rocks)
- [Support Server](https://join.wolfstar.rocks)

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a
pull request.

Thank you to all the people who already contributed to WolfStar Project!

<a href="https://github.com/wolfstar-project/wolfstar.rocks/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wolfstar-project/wolfstar.rocks" />
</a>

[contributing]:
  https://github.com/wolfstar-project/.github/blob/main/.github/CONTRIBUTING.md
