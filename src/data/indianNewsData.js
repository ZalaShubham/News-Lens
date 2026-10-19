/**
 * Curated Indian News Sources & Multi-Perspective Stories Catalog.
 * Used for zero-latency instant rendering and reliable offline fallback.
 */

export const INDIAN_SOURCES = [
  // Left (-2)
  {
    id: 'thewire',
    name: 'The Wire',
    urls: ['https://thewire.in/rss'],
    url: 'https://thewire.in',
    lean: -2,
    lean_slug: 'left',
    lean_label: 'Left',
    factuality: 'mostly-high',
    owner: 'Foundation for Independent Journalism',
    country: 'IN',
    article_count: 42,
  },
  {
    id: 'scrollin',
    name: 'Scroll.in',
    urls: ['https://scroll.in/feed'],
    url: 'https://scroll.in',
    lean: -2,
    lean_slug: 'left',
    lean_label: 'Left',
    factuality: 'mostly-high',
    owner: 'Scroll Media Inc.',
    country: 'IN',
    article_count: 38,
  },
  {
    id: 'frontline',
    name: 'Frontline',
    urls: ['https://frontline.thehindu.com/feeder/default.rss'],
    url: 'https://frontline.thehindu.com',
    lean: -2,
    lean_slug: 'left',
    lean_label: 'Left',
    factuality: 'high',
    owner: 'The Hindu Group (Kasturi & Sons)',
    country: 'IN',
    article_count: 24,
  },
  {
    id: 'caravan',
    name: 'The Caravan',
    urls: ['https://caravanmagazine.in/feed'],
    url: 'https://caravanmagazine.in',
    lean: -2,
    lean_slug: 'left',
    lean_label: 'Left',
    factuality: 'mostly-high',
    owner: 'Delhi Press',
    country: 'IN',
    article_count: 18,
  },

  // Lean Left (-1)
  {
    id: 'thehindu',
    name: 'The Hindu',
    urls: ['https://www.thehindu.com/news/national/feeder/default.rss'],
    url: 'https://www.thehindu.com',
    lean: -1,
    lean_slug: 'lean_left',
    lean_label: 'Lean Left',
    factuality: 'high',
    owner: 'The Hindu Group (Kasturi & Sons)',
    country: 'IN',
    article_count: 85,
  },
  {
    id: 'thequint',
    name: 'The Quint',
    urls: ['https://www.thequint.com/stories.rss'],
    url: 'https://www.thequint.com',
    lean: -1,
    lean_slug: 'lean_left',
    lean_label: 'Lean Left',
    factuality: 'mostly-high',
    owner: 'Quintillion Media',
    country: 'IN',
    article_count: 52,
  },
  {
    id: 'telegraphindia',
    name: 'The Telegraph India',
    urls: ['https://www.telegraphindia.com/feeds/rss/india'],
    url: 'https://www.telegraphindia.com',
    lean: -1,
    lean_slug: 'lean_left',
    lean_label: 'Lean Left',
    factuality: 'mostly-high',
    owner: 'ABP Group',
    country: 'IN',
    article_count: 36,
  },
  {
    id: 'ndtv',
    name: 'NDTV India / NDTV 24x7',
    urls: ['https://feeds.feedburner.com/ndtvnews-india-news'],
    url: 'https://www.ndtv.com',
    lean: -1,
    lean_slug: 'lean_left',
    lean_label: 'Lean Left',
    factuality: 'mostly-high',
    owner: 'AMG Media Networks (Adani Group)',
    country: 'IN',
    article_count: 94,
  },
  {
    id: 'deccanherald',
    name: 'Deccan Herald',
    urls: ['https://www.deccanherald.com/rss/national.rss'],
    url: 'https://www.deccanherald.com',
    lean: -1,
    lean_slug: 'lean_left',
    lean_label: 'Lean Left',
    factuality: 'mostly-high',
    owner: 'The Printers (Mysore) Ltd.',
    country: 'IN',
    article_count: 48,
  },

  // Center (0)
  {
    id: 'indianexpress',
    name: 'The Indian Express',
    urls: ['https://indianexpress.com/section/india/feed/'],
    url: 'https://indianexpress.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'high',
    owner: 'The Indian Express Group',
    country: 'IN',
    article_count: 98,
  },
  {
    id: 'pti',
    name: 'Press Trust of India (PTI)',
    urls: ['https://www.ptinews.com/rss/national.xml'],
    url: 'https://www.ptinews.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'high',
    owner: 'PTI Non-profit Cooperative',
    country: 'IN',
    article_count: 110,
  },
  {
    id: 'ani',
    name: 'ANI News',
    urls: ['https://aninews.in/rss/feed/category/national/'],
    url: 'https://aninews.in',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'mostly-high',
    owner: 'ANI Media Pvt. Ltd.',
    country: 'IN',
    article_count: 115,
  },
  {
    id: 'hindustantimes',
    name: 'Hindustan Times',
    urls: ['https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml'],
    url: 'https://www.hindustantimes.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'mostly-high',
    owner: 'HT Media Limited (KK Birla Group)',
    country: 'IN',
    article_count: 90,
  },
  {
    id: 'livemint',
    name: 'Mint / Livemint',
    urls: ['https://www.livemint.com/rss/news'],
    url: 'https://www.livemint.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'high',
    owner: 'HT Media Limited',
    country: 'IN',
    article_count: 64,
  },
  {
    id: 'toi',
    name: 'Times of India (TOI)',
    urls: ['https://timesofindia.indiatimes.com/rssfeedstopstories.cms'],
    url: 'https://timesofindia.indiatimes.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'mixed',
    owner: 'Bennett, Coleman & Co. (Times Group)',
    country: 'IN',
    article_count: 120,
  },
  {
    id: 'economictimes',
    name: 'The Economic Times',
    urls: ['https://economictimes.indiatimes.com/rssfeedstopstories.cms'],
    url: 'https://economictimes.indiatimes.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'mostly-high',
    owner: 'Times Group',
    country: 'IN',
    article_count: 75,
  },
  {
    id: 'businessstandard',
    name: 'Business Standard',
    urls: ['https://www.business-standard.com/rss/latest.rss'],
    url: 'https://www.business-standard.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'high',
    owner: 'Business Standard Limited',
    country: 'IN',
    article_count: 60,
  },
  {
    id: 'ddnews',
    name: 'DD News',
    urls: ['https://ddnews.gov.in/feed/'],
    url: 'https://ddnews.gov.in',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'high',
    owner: 'Prasar Bharati (Public Broadcaster)',
    country: 'IN',
    article_count: 55,
  },
  {
    id: 'outlookindia',
    name: 'Outlook India',
    urls: ['https://www.outlookindia.com/rss/home'],
    url: 'https://www.outlookindia.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'mostly-high',
    owner: 'Rajan Raheja Group',
    country: 'IN',
    article_count: 40,
  },
  {
    id: 'tribuneindia',
    name: 'The Tribune India',
    urls: ['https://www.tribuneindia.com/rss/feed'],
    url: 'https://www.tribuneindia.com',
    lean: 0,
    lean_slug: 'center',
    lean_label: 'Center',
    factuality: 'high',
    owner: 'The Tribune Trust',
    country: 'IN',
    article_count: 35,
  },

  // Lean Right (+1)
  {
    id: 'indiatoday',
    name: 'India Today',
    urls: ['https://www.indiatoday.in/rss/home'],
    url: 'https://www.indiatoday.in',
    lean: 1,
    lean_slug: 'lean_right',
    lean_label: 'Lean Right',
    factuality: 'mostly-high',
    owner: 'Living Media India Limited',
    country: 'IN',
    article_count: 88,
  },
  {
    id: 'news18',
    name: 'News18 India / CNN-News18',
    urls: ['https://www.news18.com/commonfeeds/v1/eng/rss/india.xml'],
    url: 'https://www.news18.com',
    lean: 1,
    lean_slug: 'lean_right',
    lean_label: 'Lean Right',
    factuality: 'mixed',
    owner: 'Network18 (Reliance Industries)',
    country: 'IN',
    article_count: 82,
  },
  {
    id: 'firstpost',
    name: 'Firstpost',
    urls: ['https://www.firstpost.com/rss/india.xml'],
    url: 'https://www.firstpost.com',
    lean: 1,
    lean_slug: 'lean_right',
    lean_label: 'Lean Right',
    factuality: 'mostly-high',
    owner: 'Network18 (Reliance Industries)',
    country: 'IN',
    article_count: 58,
  },
  {
    id: 'zeenews',
    name: 'Zee News',
    urls: ['https://zeenews.india.com/rss/india-national-news.xml'],
    url: 'https://zeenews.india.com',
    lean: 1,
    lean_slug: 'lean_right',
    lean_label: 'Lean Right',
    factuality: 'mixed',
    owner: 'Essel Group',
    country: 'IN',
    article_count: 76,
  },
  {
    id: 'abpnews',
    name: 'ABP News / Live',
    urls: ['https://news.abplive.com/home/feed'],
    url: 'https://news.abplive.com',
    lean: 1,
    lean_slug: 'lean_right',
    lean_label: 'Lean Right',
    factuality: 'mostly-high',
    owner: 'ABP Group',
    country: 'IN',
    article_count: 65,
  },
  {
    id: 'financialexpress',
    name: 'Financial Express',
    urls: ['https://www.financialexpress.com/feed/'],
    url: 'https://www.financialexpress.com',
    lean: 1,
    lean_slug: 'lean_right',
    lean_label: 'Lean Right',
    factuality: 'mostly-high',
    owner: 'The Indian Express Group',
    country: 'IN',
    article_count: 50,
  },

  // Right (+2)
  {
    id: 'republicworld',
    name: 'Republic World / Republic TV',
    urls: ['https://www.republicworld.com/rss/india-news.xml'],
    url: 'https://www.republicworld.com',
    lean: 2,
    lean_slug: 'right',
    lean_label: 'Right',
    factuality: 'mixed',
    owner: 'ARG Outlier Media (Arnab Goswami)',
    country: 'IN',
    article_count: 92,
  },
  {
    id: 'timesnow',
    name: 'Times Now',
    urls: ['https://www.timesnownews.com/feeds/rss/india-news.xml'],
    url: 'https://www.timesnownews.com',
    lean: 2,
    lean_slug: 'right',
    lean_label: 'Right',
    factuality: 'mixed',
    owner: 'Times Group (Bennett, Coleman & Co.)',
    country: 'IN',
    article_count: 80,
  },
  {
    id: 'swarajya',
    name: 'Swarajya',
    urls: ['https://swarajyamag.com/rss'],
    url: 'https://swarajyamag.com',
    lean: 2,
    lean_slug: 'right',
    lean_label: 'Right',
    factuality: 'mostly-high',
    owner: 'Kovai Media',
    country: 'IN',
    article_count: 45,
  },
  {
    id: 'opindia',
    name: 'OpIndia',
    urls: ['https://www.opindia.com/feed/'],
    url: 'https://www.opindia.com',
    lean: 2,
    lean_slug: 'right',
    lean_label: 'Right',
    factuality: 'mixed',
    owner: 'Aadhyaasi Media Network',
    country: 'IN',
    article_count: 32,
  },
];

export const INTERNATIONAL_SOURCES = [
  { id: 'reuters', name: 'Reuters', lean: 0, lean_slug: 'center', lean_label: 'Center', factuality: 'high', owner: 'Thomson Reuters', country: 'US', article_count: 140 },
  { id: 'apnews', name: 'Associated Press', lean: 0, lean_slug: 'center', lean_label: 'Center', factuality: 'high', owner: 'The Associated Press', country: 'US', article_count: 125 },
  { id: 'bbc', name: 'BBC News', lean: 0, lean_slug: 'center', lean_label: 'Center', factuality: 'high', owner: 'British Public Broadcaster', country: 'UK', article_count: 130 },
  { id: 'nyt', name: 'The New York Times', lean: -1, lean_slug: 'lean_left', lean_label: 'Lean Left', factuality: 'high', owner: 'The New York Times Company', country: 'US', article_count: 110 },
  { id: 'guardian', name: 'The Guardian', lean: -2, lean_slug: 'left', lean_label: 'Left', factuality: 'mostly-high', owner: 'Scott Trust Limited', country: 'UK', article_count: 95 },
  { id: 'wsj', name: 'Wall Street Journal', lean: 1, lean_slug: 'lean_right', lean_label: 'Lean Right', factuality: 'high', owner: 'News Corp', country: 'US', article_count: 90 },
  { id: 'foxnews', name: 'Fox News', lean: 2, lean_slug: 'right', lean_label: 'Right', factuality: 'mixed', owner: 'Fox Corporation', country: 'US', article_count: 105 },
];

export const ALL_SOURCES = [...INDIAN_SOURCES, ...INTERNATIONAL_SOURCES];

export const INDIAN_STORIES = [
  {
    id: 'in-story-01',
    title: 'Supreme Court Verdict on Electoral Transparency & Voter Information',
    summary: 'A five-judge Constitution Bench led by the Chief Justice delivered a landmark ruling holding that voter access to donor records is integral to democratic integrity, directing complete public disclosure through the Election Commission.',
    rank: 98.4,
    outlet_count: 12,
    rated_count: 12,
    skew: -0.05,
    country: 'IN',
    blindspot: null,
    bias_breakdown: { left: 35, center: 42, right: 23 },
    owners: [
      ['The Hindu Group', 3],
      ['The Indian Express Group', 2],
      ['Times Group', 3],
      ['Network18', 2],
      ['Living Media', 2]
    ],
    framing: [
      {
        source: 'The Wire',
        lean_slug: 'left',
        title: 'Historic Constitutional Rebuke of Opaque Political Funding Systems'
      },
      {
        source: 'The Indian Express',
        lean_slug: 'center',
        title: 'Supreme Court Directs SBI & ECI to Release All Funding Records'
      },
      {
        source: 'Times Now',
        lean_slug: 'right',
        title: 'Parties Weigh In as Supreme Court Outlines New Transparency Directives'
      }
    ],
    articles: [
      { id: 'art-in-1', source: 'The Hindu', title: 'SC holds anonymous funding unconstitutional under Article 19(1)(a)', url: 'https://www.thehindu.com/news/national/electoral-bonds-verdict-supreme-court-strikes-down-electoral-bonds-scheme-as-unconstitutional/article67848148.ece', lean: -1, factuality: 'high' },
      { id: 'art-in-2', source: 'The Wire', title: 'A landmark blow against corporate opacity in campaign finance', url: 'https://thewire.in/law/supreme-court-electoral-bonds-verdict-unconstitutional', lean: -2, factuality: 'mostly-high' },
      { id: 'art-in-3', source: 'The Indian Express', title: 'Step-by-step compliance timeline set for Election Commission', url: 'https://indianexpress.com/article/india/supreme-court-electoral-bonds-verdict-live-updates-cji-dy-chandrachud-9161746/', lean: 0, factuality: 'high' },
      { id: 'art-in-4', source: 'Press Trust of India (PTI)', title: 'Apex court directs SBI to furnish dates, amounts and buyer IDs', url: 'https://www.ptinews.com/story/national/sc-strikes-down-electoral-bonds-scheme-says-it-violates-right-to-information/1283627', lean: 0, factuality: 'high' },
      { id: 'art-in-5', source: 'India Today', title: 'What the verdict means for upcoming Lok Sabha battle', url: 'https://www.indiatoday.in/law/story/supreme-court-verdict-on-electoral-bonds-scheme-live-updates-2502307-2024-02-15', lean: 1, factuality: 'mostly-high' },
      { id: 'art-in-6', source: 'Republic World', title: 'Centre reiterates commitment to clean elections as debate shifts to cash vs digital transparency', url: 'https://www.republicworld.com/india/supreme-court-strikes-down-electoral-bonds-scheme-calling-it-unconstitutional', lean: 2, factuality: 'mixed' },
      { id: 'art-in-7', source: 'Times Now', title: 'Political reactions pour in following Supreme Court judgment', url: 'https://www.timesnownews.com/india/supreme-court-strikes-down-electoral-bonds-scheme-article-107718915', lean: 2, factuality: 'mixed' }
    ]
  },
  {
    id: 'in-story-02',
    title: 'India Semiconductor Mission: 3 Commercial Chip Fabs Approved in Gujarat & Assam',
    summary: 'The Union Cabinet gave green light to three major semiconductor fabrication facilities worth over ₹1.26 lakh crore, partnering with Taiwan’s PSMC and domestic industrial conglomerates to build 28nm and 50nm indigenous chip fabrication.',
    rank: 95.8,
    outlet_count: 14,
    rated_count: 14,
    skew: 0.22,
    country: 'IN',
    blindspot: 'left',
    bias_breakdown: { left: 15, center: 45, right: 40 },
    owners: [
      ['Network18', 3],
      ['Times Group', 4],
      ['HT Media', 3],
      ['The Indian Express Group', 2],
      ['Essel Group', 2]
    ],
    framing: [
      {
        source: 'Livemint',
        lean_slug: 'center',
        title: 'India Approves ₹1.26 Lakh Crore Chip Plants with Global Partners'
      },
      {
        source: 'Republic World',
        lean_slug: 'right',
        title: 'Mega Boost for Aatmanirbhar Bharat: India Enters Elite Semiconductor Club'
      },
      {
        source: 'The Wire',
        lean_slug: 'left',
        title: 'Questions Linger on Subsidies and Water-Power Guarantees in Chip Hubs'
      }
    ],
    articles: [
      { id: 'art-in-8', source: 'Livemint', title: 'Tata Electronics ties up with Taiwan PSMC for Dholera fab', url: 'https://www.livemint.com/industry/cabinet-approves-three-semiconductor-units-worth-rs-1-26-lakh-crore-11709200388487.html', lean: 0, factuality: 'high' },
      { id: 'art-in-9', source: 'Economic Times', title: 'Chip packaging unit in Morigaon, Assam to create 27,000 jobs', url: 'https://economictimes.indiatimes.com/tech/technology/cabinet-approves-3-semiconductor-units-at-rs-1-26-lakh-crore-total-investment/articleshow/108093952.cms', lean: 0, factuality: 'mostly-high' },
      { id: 'art-in-10', source: 'Firstpost', title: 'How India is positioning itself as the alternate global electronics hub', url: 'https://www.firstpost.com/explainers/india-semiconductor-plants-gujarat-assam-tata-chips-13743602.html', lean: 1, factuality: 'mostly-high' },
      { id: 'art-in-11', source: 'Zee News', title: 'Historic milestone as semiconductor plants get Cabinet nod', url: 'https://zeenews.india.com/india/cabinet-approves-3-semiconductor-units-in-gujarat-and-assam-with-rs-1-26-lakh-crore-investment-2726359.html', lean: 1, factuality: 'mixed' },
      { id: 'art-in-12', source: 'Republic World', title: 'PM hails tech revolution: From silicon to chips, India takes center stage', url: 'https://www.republicworld.com/business/cabinet-approves-three-semiconductor-units-with-investment-of-rs-126-lakh-crore', lean: 2, factuality: 'mixed' },
      { id: 'art-in-13', source: 'The Hindu', title: 'Assam and Gujarat chip proposals receive government incentive packages', url: 'https://www.thehindu.com/news/national/cabinet-approves-setting-up-of-three-semiconductor-units/article67899479.ece', lean: -1, factuality: 'high' },
      { id: 'art-in-14', source: 'Scroll.in', title: 'Examining the environmental footprint and power demands of semiconductor fabs', url: 'https://scroll.in/article/1064560/why-india-is-betting-billions-on-subsidising-semiconductor-chip-fabs', lean: -2, factuality: 'mostly-high' }
    ]
  },
  {
    id: 'in-story-03',
    title: 'UPI Expands Footprint Across France, UAE, Singapore & Sri Lanka',
    summary: 'National Payments Corporation of India (NPCI) launched UPI payment links allowing Indian tourists and expatriates to execute seamless real-time rupee transactions at the Eiffel Tower, Dubai Mall, and international retail chains without forex surcharge.',
    rank: 92.5,
    outlet_count: 10,
    rated_count: 10,
    skew: 0.12,
    country: 'IN',
    blindspot: null,
    bias_breakdown: { left: 20, center: 50, right: 30 },
    owners: [
      ['Bennett, Coleman & Co.', 3],
      ['HT Media', 2],
      ['Prasar Bharati', 1],
      ['Network18', 2],
      ['Kasturi & Sons', 2]
    ],
    framing: [
      {
        source: 'Business Standard',
        lean_slug: 'center',
        title: 'UPI Linkage with PayNow & AANI Shows Global Appetite for Indian Fintech'
      },
      {
        source: 'Firstpost',
        lean_slug: 'right',
        title: 'Fintech Diplomacy: How UPI Emerged as India’s Most Potent Soft Power'
      },
      {
        source: 'The Hindu',
        lean_slug: 'left',
        title: 'Cross-Border Retail Remittances Get Cheaper as UPI Spreads Across Europe'
      }
    ],
    articles: [
      { id: 'art-in-15', source: 'Business Standard', title: 'UPI launched at Eiffel Tower in France; tourists can now pay in rupees', url: 'https://www.business-standard.com/finance/news/upi-launched-at-eiffel-tower-in-france-tourists-can-now-pay-in-rupees-124020201088_1.html', lean: 0, factuality: 'high' },
      { id: 'art-in-16', source: 'ANI News', title: 'Indian Embassy launches UPI at Eiffel Tower in Paris as part of PM vision', url: 'https://aninews.in/news/world/europe/indian-embassy-launches-upi-at-eiffel-tower-in-paris-calls-it-part-of-pm-modis-vision20240202235948/', lean: 0, factuality: 'mostly-high' },
      { id: 'art-in-17', source: 'DD News', title: 'UPI formally launched at Eiffel Tower in Paris', url: 'https://ddnews.gov.in/en/upi-formally-launched-at-eiffel-tower-in-paris/', lean: 0, factuality: 'high' },
      { id: 'art-in-18', source: 'Times Now', title: 'UPI goes global: India digital payments service now available at Paris Eiffel Tower', url: 'https://www.timesnownews.com/business-economy/economy/upi-goes-global-india-digital-payments-service-now-available-at-paris-eiffel-tower-article-107368553', lean: 2, factuality: 'mixed' },
      { id: 'art-in-19', source: 'Deccan Herald', title: 'UPI launched at Eiffel Tower in Paris', url: 'https://www.deccanherald.com/business/economy/upi-launched-at-eiffel-tower-in-paris-2877074', lean: -1, factuality: 'mostly-high' }
    ]
  },
  {
    id: 'in-story-04',
    title: 'RBI Monetary Policy: Repo Rate Kept at 6.5%, GDP Projection Revised to 7.2%',
    summary: 'The Monetary Policy Committee unanimously kept the policy repo rate unchanged, noting strong domestic macroeconomic resilience in manufacturing and services while keeping a vigilant eye on volatile food and vegetable inflation.',
    rank: 89.2,
    outlet_count: 11,
    rated_count: 11,
    skew: 0.02,
    country: 'IN',
    blindspot: null,
    bias_breakdown: { left: 25, center: 50, right: 25 },
    owners: [
      ['The Indian Express Group', 3],
      ['Bennett, Coleman & Co.', 3],
      ['HT Media Limited', 3],
      ['Living Media', 2]
    ],
    framing: [
      {
        source: 'Livemint',
        lean_slug: 'center',
        title: 'RBI Stays on Vigilance Mode: Rates Unchanged as Growth Stays Buoyant'
      },
      {
        source: 'The Wire',
        lean_slug: 'left',
        title: 'High Food Inflation Pressures Real Incomes Even as Headline Growth Surges'
      },
      {
        source: 'India Today',
        lean_slug: 'right',
        title: 'Strong Fundamentals: India Remains Fastest Growing Major Economy, Affirms RBI'
      }
    ],
    articles: [
      { id: 'art-in-20', source: 'The Indian Express', title: 'RBI Monetary Policy: Repo rate kept at 6.5%, growth pegged at 7.2%', url: 'https://indianexpress.com/article/business/economy/rbi-monetary-policy-live-updates-repo-rate-inflation-gdp-shaktikanta-das-9377484/', lean: 0, factuality: 'high' },
      { id: 'art-in-21', source: 'Livemint', title: 'RBI policy highlights: Repo rate steady, FY25 GDP growth raised to 7.2%', url: 'https://www.livemint.com/economy/rbi-policy-meet-live-updates-repo-rate-mpc-interest-rate-gdp-growth-inflation-shaktikanta-das-june-2024-11717721865955.html', lean: 0, factuality: 'high' },
      { id: 'art-in-22', source: 'The Hindu BusinessLine', title: 'RBI MPC meeting highlights: Repo rate, inflation and GDP outlook', url: 'https://www.thehindubusinessline.com/economy/rbi-monetary-policy-meeting-highlights-repo-rate-inflation-gdp/article68259837.ece', lean: -1, factuality: 'high' },
      { id: 'art-in-23', source: 'Financial Express', title: 'RBI Monetary Policy: Key takeaways from Governor Das statement', url: 'https://www.financialexpress.com/policy/economy-rbi-monetary-policy-decision-june-2024-mpc-repo-rate-shaktikanta-das-live-updates-3517228/', lean: 1, factuality: 'mostly-high' }
    ]
  },
  {
    id: 'in-story-05',
    title: 'ISRO Gears Up for Gaganyaan Astronaut Missions & 2035 Bharatiya Antariksh Station',
    summary: 'The Indian Space Research Organisation completed cryogenic engine human-rating milestones and crew module sea-recovery protocols, preparing for the uncrewed Vyommitra humanoid orbital flight ahead of crewed spaceflights.',
    rank: 88.0,
    outlet_count: 13,
    rated_count: 13,
    skew: 0.15,
    country: 'IN',
    blindspot: 'left',
    bias_breakdown: { left: 18, center: 47, right: 35 },
    owners: [
      ['Prasar Bharati', 2],
      ['Times Group', 3],
      ['Kasturi & Sons', 3],
      ['Network18', 3],
      ['ARG Outlier Media', 2]
    ],
    framing: [
      {
        source: 'The Hindu Sci-Tech',
        lean_slug: 'left',
        title: 'ISRO Accomplishes Key CE20 Cryogenic Engine Human Rating Qualification'
      },
      {
        source: 'Press Trust of India (PTI)',
        lean_slug: 'center',
        title: 'Astronaut Trainees Undergo Rigorous Simulation at Bengaluru Facility'
      },
      {
        source: 'Republic World',
        lean_slug: 'right',
        title: 'From Moon South Pole to Orbit: India’s Sovereign Space Journey Unstoppable'
      }
    ],
    articles: [
      { id: 'art-in-24', source: 'The Hindu', title: 'Human rating of CE20 cryogenic engine for Gaganyaan completed: ISRO', url: 'https://www.thehindu.com/sci-tech/science/human-rating-of-ce20-cryogenic-engine-for-gaganyaan-completed-isro/article67871630.ece', lean: -1, factuality: 'high' },
      { id: 'art-in-25', source: 'NDTV', title: 'PM reveals names of four IAF astronauts for Gaganyaan mission', url: 'https://www.ndtv.com/india-news/pm-narendra-modi-reveals-names-of-4-astronauts-for-gaganyaan-space-mission-5136894', lean: -1, factuality: 'mostly-high' },
      { id: 'art-in-26', source: 'Times of India', title: 'PM Modi names 4 astronauts for Gaganyaan mission, awards wings', url: 'https://timesofindia.indiatimes.com/india/pm-modi-names-4-astronauts-for-gaganyaan-mission-awards-them-astronaut-wings/articleshow/108035252.cms', lean: 0, factuality: 'mixed' },
      { id: 'art-in-27', source: 'Republic World', title: 'ISRO completes human rating of CE20 cryogenic engine for Gaganyaan missions', url: 'https://www.republicworld.com/science/isro-completes-human-rating-of-ce20-cryogenic-engine-for-gaganyaan-missions', lean: 2, factuality: 'mixed' }
    ]
  },
  {
    id: 'in-story-06',
    title: 'India & 4-Nation EFTA Conclude Landmark $100 Billion Free Trade Agreement',
    summary: 'India signed the historic Trade and Economic Partnership Agreement (TEPA) with Switzerland, Norway, Iceland, and Liechtenstein, locking in $100 billion committed investments over 15 years and opening tariff-free access for Indian precision engineering and pharma.',
    rank: 86.4,
    outlet_count: 9,
    rated_count: 9,
    skew: 0.08,
    country: 'IN',
    blindspot: null,
    bias_breakdown: { left: 25, center: 45, right: 30 },
    owners: [
      ['HT Media', 2],
      ['Business Standard Limited', 2],
      ['The Indian Express Group', 2],
      ['Living Media', 2],
      ['Network18', 1]
    ],
    framing: [
      {
        source: 'Business Standard',
        lean_slug: 'center',
        title: 'TEPA Pacts: Legal Binding Investment Target Sets New Precedent in FTAs'
      },
      {
        source: 'The Quint',
        lean_slug: 'left',
        title: 'Scrutinizing Intellectual Property Clauses & Dairy Protections in the Swiss Deal'
      },
      {
        source: 'Firstpost',
        lean_slug: 'right',
        title: 'Trade Triumph: Why Europe Is Rushing to Ink Bilateral Deals with New Delhi'
      }
    ],
    articles: [
      { id: 'art-in-28', source: 'Business Standard', title: 'India, EFTA sign Trade and Economic Partnership Agreement', url: 'https://www.business-standard.com/economy/news/india-efta-sign-trade-and-economic-partnership-agreement-124031000293_1.html', lean: 0, factuality: 'high' },
      { id: 'art-in-29', source: 'The Indian Express', title: 'India-EFTA free trade agreement signed: What it means for investment', url: 'https://indianexpress.com/article/business/economy/india-efta-free-trade-agreement-signed-9206233/', lean: 0, factuality: 'high' },
      { id: 'art-in-30', source: 'The Hindu', title: 'India, EFTA sign trade agreement; European bloc commits $100 billion investment', url: 'https://www.thehindu.com/business/Economy/india-efta-sign-trade-agreement-commit-100-billion-investments/article67935293.ece', lean: -1, factuality: 'high' },
      { id: 'art-in-31', source: 'Firstpost', title: 'Explained: India-EFTA trade agreement and why it matters', url: 'https://www.firstpost.com/explainers/india-efta-trade-deal-switzerland-norway-free-trade-agreement-explained-13747162.html', lean: 1, factuality: 'mostly-high' }
    ]
  },
  {
    id: 'in-story-07',
    title: 'New Criminal Codes (BNS, BNSS & BSA) Replace 160-Year-Old IPC Across India',
    summary: 'The Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam came into force, introducing zero-FIR filing, mandatory forensic investigation for serious crimes, electronic summons, and community service provisions.',
    rank: 85.0,
    outlet_count: 12,
    rated_count: 12,
    skew: -0.18,
    country: 'IN',
    blindspot: 'right',
    bias_breakdown: { left: 45, center: 35, right: 20 },
    owners: [
      ['Kasturi & Sons', 3],
      ['The Tribune Trust', 2],
      ['Times Group', 3],
      ['Living Media', 2],
      ['ABP Group', 2]
    ],
    framing: [
      {
        source: 'The Wire',
        lean_slug: 'left',
        title: 'Concerns Raised on Police Custody Window and Ambiguous Sedition Redefinition'
      },
      {
        source: 'The Indian Express',
        lean_slug: 'center',
        title: 'New Laws Take Effect: Police Forces Train on Digital Evidence Recording'
      },
      {
        source: 'Times Now',
        lean_slug: 'right',
        title: 'Decolonizing Justice: New Acts Deliver Citizen-Centric Reforms & Speedier Trials'
      }
    ],
    articles: [
      { id: 'art-in-32', source: 'The Hindu', title: 'New criminal laws come into effect across India from July 1', url: 'https://www.thehindu.com/news/national/new-criminal-laws-come-into-effect-from-july-1/article68352613.ece', lean: -1, factuality: 'high' },
      { id: 'art-in-33', source: 'The Wire', title: 'Critical analysis of enhanced police remand provisions under new criminal codes', url: 'https://thewire.in/law/new-criminal-laws-bns-bnss-bsa-police-powers-concerns', lean: -2, factuality: 'mostly-high' },
      { id: 'art-in-34', source: 'The Indian Express', title: 'Three new criminal laws: What changes, what stays the same', url: 'https://indianexpress.com/article/explained/explained-law/three-new-criminal-laws-what-changes-what-stays-9425447/', lean: 0, factuality: 'high' },
      { id: 'art-in-35', source: 'India Today', title: 'New criminal laws BNS, BNSS, BSA come into force: Key changes explained', url: 'https://www.indiatoday.in/law/story/new-criminal-laws-bns-bnss-bsa-come-into-force-key-changes-explained-2560591-2024-07-01', lean: 1, factuality: 'mostly-high' }
    ]
  },
  {
    id: 'in-story-08',
    title: 'Vande Bharat Fleet Reaches 100+ Trains with High-Speed Sleeper Versions Tested',
    summary: 'Indian Railways conducted high-speed trial runs of the indigenous Vande Bharat Sleeper version on the Kota-Nagda section, targeting overnight Rajdhani express routes with aerodynamic designs, sensor-equipped bogies, and Kavach automatic protection.',
    rank: 82.3,
    outlet_count: 8,
    rated_count: 8,
    skew: 0.18,
    country: 'IN',
    blindspot: 'left',
    bias_breakdown: { left: 15, center: 50, right: 35 },
    owners: [
      ['Prasar Bharati', 2],
      ['Times Group', 2],
      ['HT Media', 2],
      ['Essel Group', 2]
    ],
    framing: [
      {
        source: 'Hindustan Times',
        lean_slug: 'center',
        title: 'Railways Tests 160 Kmph Vande Sleeper Prototype Ahead of Commercial Rollout'
      },
      {
        source: 'Zee News',
        lean_slug: 'right',
        title: 'World-Class Rail Travel: Vande Sleeper Ready to Transform Long-Distance Journeys'
      },
      {
        source: 'Scroll.in',
        lean_slug: 'left',
        title: 'Affordability vs Modernization: General Coach Congestion Needs Parallel Focus'
      }
    ],
    articles: [
      { id: 'art-in-36', source: 'Hindustan Times', title: 'Vande Bharat sleeper train: First look, routes, speed and features explained', url: 'https://www.hindustantimes.com/india-news/vande-bharat-sleeper-train-first-look-routes-speed-and-features-explained-101709401768431.html', lean: 0, factuality: 'mostly-high' },
      { id: 'art-in-37', source: 'ANI News', title: 'Railway Minister Ashwini Vaishnaw unveils body structure of Vande Bharat sleeper', url: 'https://aninews.in/news/national/general-news/railway-minister-ashwini-vaishnaw-unveils-body-structure-of-vande-bharat-sleeper-train20240309191834/', lean: 0, factuality: 'mostly-high' },
      { id: 'art-in-38', source: 'Zee News', title: 'Vande Bharat sleeper train: Coach features, speed, routes and ticket fares', url: 'https://zeenews.india.com/railways/vande-bharat-sleeper-train-coach-features-speed-routes-ticket-fare-all-you-need-to-know-2729094.html', lean: 1, factuality: 'mixed' },
      { id: 'art-in-39', source: 'Scroll.in', title: 'Why ordinary rail commuters continue to demand more non-AC second class coaches', url: 'https://scroll.in/article/1064890/vande-bharat-is-a-hit-with-middle-class-indians-but-what-about-the-rest', lean: -2, factuality: 'mostly-high' }
    ]
  },
  {
    id: 'in-story-09',
    title: 'Solar & Renewable Energy Leap: India Surpasses 85 GW of Installed Solar Power',
    summary: 'Driven by rooftop solar incentives (PM Surya Ghar) and ultra-mega solar parks in Rajasthan and Gujarat, India recorded its fastest single-year renewable capacity addition, moving rapidly towards its 500 GW non-fossil capacity 2030 target.',
    rank: 81.0,
    outlet_count: 10,
    rated_count: 10,
    skew: 0.05,
    country: 'IN',
    blindspot: null,
    bias_breakdown: { left: 25, center: 45, right: 30 },
    owners: [
      ['The Hindu Group', 2],
      ['Business Standard Limited', 2],
      ['Times Group', 3],
      ['Reliance Network18', 2],
      ['Prasar Bharati', 1]
    ],
    framing: [
      {
        source: 'Economic Times',
        lean_slug: 'center',
        title: 'Clean Energy Investments Touch Record High as Rooftop Solar Scheme Gains Pace'
      },
      {
        source: 'The Hindu',
        lean_slug: 'left',
        title: 'Grid Integration Challenges and Battery Storage Economics Under the Scanner'
      },
      {
        source: 'News18',
        lean_slug: 'right',
        title: 'Green Energy Superpower: India Sets Global Benchmark in Solar Transition'
      }
    ],
    articles: [
      { id: 'art-in-40', source: 'Economic Times', title: 'Indias solar capacity reaches 85 GW, total renewable power at 150 GW', url: 'https://economictimes.indiatimes.com/industry/renewables/indias-solar-capacity-reaches-85-gw-total-renewable-energy-at-150-gw/articleshow/111812839.cms', lean: 0, factuality: 'mostly-high' },
      { id: 'art-in-41', source: 'Business Standard', title: 'Indias solar capacity crosses 85 GW milestone, spurred by rooftop push', url: 'https://www.business-standard.com/industry/news/india-s-solar-capacity-crosses-85-gw-milestone-spurred-by-rooftop-push-124071800542_1.html', lean: 0, factuality: 'high' },
      { id: 'art-in-42', source: 'Frontline', title: 'Indias rooftop solar boom: Challenges and emerging opportunities', url: 'https://frontline.thehindu.com/environment/indias-rooftop-solar-boom-challenges-and-opportunities/article68102341.ece', lean: -2, factuality: 'high' },
      { id: 'art-in-43', source: 'News18', title: 'PM Surya Ghar Muft Bijli Yojana solar scheme details and subsidy explained', url: 'https://www.news18.com/business/pm-surya-ghar-solar-scheme-registration-subsidy-details-explained-8815124.html', lean: 1, factuality: 'mixed' }
    ]
  }
];

export const FALLBACK_META = {
  article_count: 2450,
  story_count: INDIAN_STORIES.length,
  source_count: ALL_SOURCES.length,
  sources_ok: ALL_SOURCES.length,
  blindspots: {
    left: INDIAN_STORIES.filter(s => s.blindspot === 'left').length,
    right: INDIAN_STORIES.filter(s => s.blindspot === 'right').length,
  },
  updated_at: new Date().toISOString(),
  region: 'IN'
};
