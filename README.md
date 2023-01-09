# Skyra.PW [![Discord](https://discord.com/api/guilds/254360814063058944/embed.png)](https://join.skyra.pw)

[![Docker Pulls](https://img.shields.io/docker/pulls/skyrabot/skyra.pw?logo=docker&logoColor=white)](https://hub.docker.com/r/skyrabot/skyra.pw)

## Set-Up

To run the dashboard locally, you'll need a local version of Skyra running.

After forking/cloning this repo to a folder locally:

1. Duplicate `.env.development` and rename it to `.env.development.local`
2. Replace the value of `NEXT_PUBLIC_CLIENT_ID` to your bot's ID
3. Go to the Discord developer portal: https://discord.com/developers/applications/
4. Select your bot application and go to the `OAuth2` tab
5. Add redirect URL's for `http://localhost:3000/oauth/callback` and `http://localhost:3000/oauth/guild`
6. Run a local instance of Skyra, be sure to follow it's local development guidelines as well.

-   You have to set the CLIENT_ID, CLIENT_SECRET in Skyra's configuration to your own bot properly!

7. Install dependencies with `yarn`.
8. Run `yarn dev` to start the NextJS dev server

## Links

**Skyra links**

-   [Skyra Invite Link](https://invite.skyra.pw)
-   [Support Server](https://join.skyra.pw)
-   [Patreon](https://donate.skyra.pw/patreon)

## Buy us some doughnuts

Skyra Project is open source and always will be, even if we don't get donations. That said, we know there are amazing people who
may still want to donate just to show their appreciation. Thanks you very much in advance!

We accept donations through Patreon, BitCoin, Ethereum, and Litecoin. You can use the buttons below to donate through your method of choice.

| Donate With |         QR         |                                                                  Address                                                                  |
| :---------: | :----------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
|   Patreon   | ![PatreonImage][]  |                                               [Click Here](https://donate.skyra.pw/patreon)                                               |
|   PayPal    |  ![PayPalImage][]  |                                               [Click Here](https://donate.skyra.pw/paypal)                                                |
|   BitCoin   | ![BitcoinImage][]  |         [3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco](bitcoin:3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco?amount=0.01&label=Skyra%20Discord%20Bot)          |
|  Ethereum   | ![EthereumImage][] | [0xcB5EDB76Bc9E389514F905D9680589004C00190c](ethereum:0xcB5EDB76Bc9E389514F905D9680589004C00190c?amount=0.01&label=Skyra%20Discord%20Bot) |
|  Litecoin   | ![LitecoinImage][] |         [MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM](litecoin:MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM?amount=0.01&label=Skyra%20Discord%20Bot)         |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Skyra Project!

<a href="https://github.com/skyra-project/skyra.pw/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=skyra-project/skyra.pw" />
</a>

[contributing]: https://github.com/skyra-project/.github/blob/main/.github/CONTRIBUTING.md
[patreonimage]: https://cdn.skyra.pw/gh-assets/patreon.png
[paypalimage]: https://cdn.skyra.pw/gh-assets/paypal.png
[bitcoinimage]: https://cdn.skyra.pw/gh-assets/bitcoin.png
[ethereumimage]: https://cdn.skyra.pw/gh-assets/ethereum.png
[litecoinimage]: https://cdn.skyra.pw/gh-assets/litecoin.png
