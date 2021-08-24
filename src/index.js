const path = require('path');

module.exports = function (context) {
  const {siteConfig} = context;
  const {themeConfig} = siteConfig;
  const {munchkin} = themeConfig || {};

  if (!munchkin) {
    throw new Error(
      `You need to specify 'munchkin' object in 'themeConfig' with 'applicationId' field in it to use docusaurus-plugin-munchkin`,
    );
  }

  const {applicationId} = munchkin;

  if (!applicationId) {
    throw new Error(
      'You specified the `munchkin` object in `themeConfig` but the `applicationId` field was missing. ' +
        'Please ensure this is not a mistake.',
    );
  }

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-munchkin',

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `(function() {
  var didInit = false;
  function initMunchkin() {
    if(didInit === false) {
      didInit = true;
      Munchkin.init('${applicationId}');
    }
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//munchkin.marketo.net/munchkin.js';
  s.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      initMunchkin();
    }
  };
  s.onload = initMunchkin;
  document.getElementsByTagName('head')[0].appendChild(s);
})();`,
          },
        ],
      };
    },
  };
};