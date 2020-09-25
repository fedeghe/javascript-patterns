# Favorites management

Using channels response from `channels.json` implement favorites management UI
similar to [example](https://zattoo-abox-staging.zattoo.com/settings/favorites?login=00003322&password=12345).


## Requirements
- filter duplicated channels from the response
- use best available quality (`uhd` > `hd` > `sd`), please see `level` property in `qualities` array
- only channels with availability === available should be in the list
- render all channels in two columns
- Each rendered channel item should display number, logo, title, quality and display inFavorites status
- enable keyboard navigation (add support for Left, Right, Up, Down keys)
- highlight selected item
- on Enter key add item to favorites list / or remove when it is already in the list


## Hints
To get channel logo use `logo_token` from the response (example `https://images.zattic.com/logos/93b42a0d35defc25ca42/white/240x135.png`)

---

## Install dependencies

To install dependencies: ```npm install```

## Run the sample

To run the server locally: ```npm start```

## Known problems I left unsolved

1. Prod-friendly bundling
2. Tests
3. Smart scrolling (tv wise)
4. Some doubts about styles (first time i use `rem` unit)
5. Some doubts about correct `state` ownership
6. Unused stuff I set up but did not exploited at the end (router, ~config, ...)

## Unknown problems unsolved

I know there are for sure and I would be happy to know.

## Time spent
- **~3h** for the skeleton (I've lost a lot of time there)
- **~2h** on the implementation
