# Skyra.PW [![Discord](https://discordapp.com/api/guilds/254360814063058944/embed.png)](https://skyra.pw/join)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/kyranet/skyra.pw.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kyranet/skyra.pw/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/kyranet/skyra.pw.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kyranet/skyra.pw/context:javascript)

## Set-Up

To run the dashboard locally, you'll need a local version of Skyra running.

After forking/cloning this repo to a folder locally:

1. Duplicate `.env.development` and rename it to `.env.development.local`
2. Replace the value of `REACT_APP_CLIENT_ID` to your bot's ID
3. Go to the Discord developer portal: https://discordapp.com/developers/applications/
4. Select your bot application and go to the `OAuth2` tab
5. Add redirect URL's for `http://localhost:3000/oauth/callback` and `http://localhost:3000/oauth/guild`
6. Run a local instance of Skyra, be sure to follow it's local development guidelines as well.

-   You have to set the CLIENT_ID, CLIENT_SECRET in Skyra's configuration to your own bot properly!

6. Install dependencies with `yarn`.
7. Run `yarn start` to start the React dev server

## Links

**Skyra links**

-   [Skyra Invite Link](https://skyra.pw/invite)
-   [Support Server](https://skyra.pw/join)
-   [Patreon](https://www.patreon.com/kyranet)

## Buy me a donut

Skyra is open source and always will be, even if I don't get donations. That said, I know there are amazing people who
may still want to donate just to show their appreciation. Thanks you very much in advance!

I accept donations through Patreon, BitCoin, Ethereum, and Litecoin. You can use the buttoms below to donate through your method of choice.

| Donate With |         QR         |                                                                  Address                                                                  |
| :---------: | :----------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
|   Patreon   | ![PatreonImage][]  |                                               [Click Here](https://www.patreon.com/kyranet)                                               |
|   BitCoin   | ![BitcoinImage][]  |         [3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco](bitcoin:3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco?amount=0.01&label=Skyra%20Discord%20Bot)          |
|  Ethereum   | ![EthereumImage][] | [0xcB5EDB76Bc9E389514F905D9680589004C00190c](ethereum:0xcB5EDB76Bc9E389514F905D9680589004C00190c?amount=0.01&label=Skyra%20Discord%20Bot) |
|  Litecoin   | ![LitecoinImage][] |         [MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM](litecoin:MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM?amount=0.01&label=Skyra%20Discord%20Bot)         |

[patreonimage]: https://raw.githubusercontent.com/kyranet/Skyra/master/assets/github/patreon.png
[bitcoinimage]: https://raw.githubusercontent.com/kyranet/Skyra/master/assets/github/bitcoin.png
[ethereumimage]: https://raw.githubusercontent.com/kyranet/Skyra/master/assets/github/ethereum.png
[litecoinimage]: https://raw.githubusercontent.com/kyranet/Skyra/master/assets/github/litecoin.png
