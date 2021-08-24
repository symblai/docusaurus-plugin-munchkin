# docusaurus-plugin-munchkin

## Installation

```npm i docusaurus-plugin-munchkin```

## Setup

Add to plugins in `docusaurus.config.js`:

```
{
  plugins: [
    'docusaurus-plugin-munchkin',
    ...
  ]
}
```

Add the munchkin configuration to `themeConfig` in the `docusaurus.config.js` file:

```
{
  themeConfig: {
    munchkin: {
      applicationId: MUNCHKIN_ID,
    },
    ...
  }
}
