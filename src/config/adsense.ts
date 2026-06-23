// Central AdSense configuration.
// Put your real publisher ID here once and it applies everywhere.
// Set `enabled: false` to instantly pull all ads site-wide without touching layouts.

export const ADSENSE = {
  enabled: true,
  // Real AdSense publisher ID (matches public/ads.txt)
  client: 'ca-pub-3492132681763333',
  // Ad slot IDs from the AdSense dashboard. Each placement is its own unit
  // so you can see which positions earn in AdSense reporting.
  slots: {
    homeInline: '8176396114',   // homepage, below the lists
    postTop: '3646390097',      // post, after intro (highest-value)
    postMid: '4578152219',      // post, mid-article (not yet placed in layout)
    postBottom: '6302297421',   // post, after content / end
  },
};
