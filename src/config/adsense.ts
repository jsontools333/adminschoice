// Central AdSense configuration.
// Put your real publisher ID here once and it applies everywhere.
// Set `enabled: false` to instantly pull all ads site-wide without touching layouts.

export const ADSENSE = {
  enabled: true,
  // Replace with your real publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX)
  client: 'ca-pub-XXXXXXXXXXXXXXXX',
  // Ad slot IDs — create these in your AdSense dashboard (Ads → By ad unit).
  // Each placement uses its own slot so you can see which positions earn.
  slots: {
    homeInline: '0000000001',   // homepage, between sections
    postTop: '0000000002',      // post, after intro (highest-value)
    postMid: '0000000003',      // post, mid-article between sections
    postBottom: '0000000004',   // post, after FAQ / end
  },
};
