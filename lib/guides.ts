// Topic-cluster pages. Each one targets a distinct search intent so they
// support (rather than cannibalise) each other and the homepage.

export type GuideStep = { title: string; text: string };
export type GuideSection = {
  id: string;
  h2: string;
  paras: string[];
  bullets?: string[];
  steps?: GuideStep[];
};
export type Guide = {
  slug: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  /** Answer-first summary: the snippet answer engines quote. */
  answer: string;
  facts: { label: string; value: string }[];
  sections: GuideSection[];
  /** Section id whose steps also become HowTo structured data. */
  howTo?: { section: string; name: string; totalTime?: string };
  faq: { q: string; a: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
};

const PUBLISHED = "2026-10-24";
const MODIFIED = "2026-10-24";

export const GUIDES: Guide[] = [
  {
    slug: "google-play-testers",
    metaTitle: "Google Play Testers: Get 20+ Active Testers in 24h | Test4Test",
    description:
      "Need testers for Google Play closed testing? Get 20+ real, active Android testers in about 24 hours, verified daily for 14 days. Free with tokens you earn by testing.",
    keywords: [
      "google play testers",
      "testers for google play",
      "google play closed testing testers",
      "play console testers",
      "get testers for google play",
      "google play 12 testers",
      "google play 20 testers",
    ],
    eyebrow: "Google Play testers",
    h1: "Get Google Play testers for your closed test, fast",
    answer:
      "To publish a new app from a personal Google Play developer account, you need at least 12 testers opted in to a closed test for 14 consecutive days. Test4Test gets you 20+ active Android testers, usually within 24 hours: you add one Google Group to Play Console, testers opt in and install, and every tester uploads a dated screenshot each day so you know they stayed.",
    facts: [
      { label: "Google's minimum", value: "12 testers × 14 days" },
      { label: "Test4Test listings", value: "20+ active testers" },
      { label: "Typical time to fill", value: "~24 hours" },
      { label: "Retention check", value: "Daily screenshot proof" },
      { label: "Cost", value: "Free with earned tokens" },
    ],
    sections: [
      {
        id: "why",
        h2: "Why you need Google Play testers before launch",
        paras: [
          "Since November 2023, Google requires new personal developer accounts to prove their app has been tested by real people before it can go to production. The rule is simple to read and hard to satisfy: a closed test with at least 12 opted-in testers who stay opted in for 14 days in a row.",
          "Most solo developers don't have 12 people who will install an unfinished app and keep it for two weeks. Friends uninstall, family forgets, and if your tester count drops you may end up waiting longer than planned. Google Play testers from a dedicated community solve that because testing is the reason they're there.",
        ],
      },
      {
        id: "how",
        h2: "How to get Google Play testers with Test4Test",
        paras: ["The whole setup takes a few minutes. You never share personal email addresses with strangers."],
        steps: [
          { title: "Create your closed testing track", text: "In Play Console, open Testing → Closed testing, create a track and upload your app bundle." },
          {
            title: "Add the Test4Test Google Group",
            text: "Under Testers, choose Google Groups and add test4test-community@googlegroups.com. Every Test4Test tester is a member, so one address covers everyone.",
          },
          {
            title: "List your app in Test4Test",
            text: "In the Build tab, add your app name, icon, description and opt-in URL, pick a tier and region, and publish the listing with tokens.",
          },
          {
            title: "Testers claim slots and install",
            text: "Your app appears in the Catalog. Testers commit to a 14-day contract, opt in through your link and install from Google Play.",
          },
          {
            title: "Track daily proof until day 14",
            text: "Each day testers open your app and upload a screenshot taken that day. Approve proofs in the Verify tab and watch locked testers, daily activity and churn in Developer Studio.",
          },
        ],
      },
      {
        id: "quality",
        h2: "What makes a good Google Play tester",
        paras: [
          "Google looks at more than a headcount. When you apply for production access, Play Console asks how you recruited testers, how engaged they were and what you changed based on their feedback. Testers who open the app every day and report real issues give you better answers to those questions.",
        ],
        bullets: [
          "Uses a real Android device with Google Play, not an emulator",
          "Stays opted in for the full 14 days",
          "Opens the app regularly instead of installing once",
          "Leaves honest feedback and bug reports you can act on",
        ],
      },
      {
        id: "vs",
        h2: "Google Play testers vs friends, family and paid services",
        paras: [
          "Friends and family are free but rarely last 14 days. Paid tester services are fast but you often can't see whether anyone opened your app. Test4Test sits in between: it is free when you test others, and every tester's activity is visible to you through daily screenshot proofs, a tester list and a churn rate.",
        ],
      },
    ],
    howTo: { section: "how", name: "How to get Google Play testers for closed testing", totalTime: "P14D" },
    faq: [
      {
        q: "How many testers does Google Play require?",
        a: "At least 12 opted-in testers in a closed test for 14 consecutive days, for personal developer accounts created after November 13, 2023. The requirement was 20 testers until Google lowered it in December 2024.",
      },
      {
        q: "Do Google Play testers have to use the app every day?",
        a: "Google requires testers to stay opted in for 14 days and asks about engagement when you apply for production. Test4Test testers open your app and upload proof every day, which gives you strong engagement evidence.",
      },
      {
        q: "Can I use the same testers for multiple apps?",
        a: "Yes. The Test4Test Google Group works for every app you list. Each listing gets its own testers who commit to that app for 14 days.",
      },
      {
        q: "Do organization developer accounts need 12 testers?",
        a: "No. The closed testing requirement applies to personal developer accounts. Organization accounts can publish without it, although testing with real users is still a good idea.",
      },
    ],
    related: ["google-play-closed-testing", "free-app-testers", "test-for-test"],
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
  },
  {
    slug: "app-testers",
    metaTitle: "App Testers & Mobile App Testers for Android | Test4Test",
    description:
      "Find real app testers for your Android app. Mobile app testers from a developer community install your build, use it daily for 14 days and send honest feedback. Free to start.",
    keywords: [
      "app testers",
      "mobile app testers",
      "android app testers",
      "find app testers",
      "app testing community",
      "beta testers for android app",
      "real device testers",
    ],
    eyebrow: "App testers",
    h1: "Real app testers for your Android app",
    answer:
      "Test4Test is a community of Android developers who act as app testers for each other. You list your app, mobile app testers claim a slot, install it on real devices through Google Play and use it every day for 14 days, uploading a dated screenshot as proof. You get engaged testers, honest feedback and a closed test that meets Google Play's requirements.",
    facts: [
      { label: "Active testers", value: "1,000+" },
      { label: "Apps listed", value: "800+" },
      { label: "Devices", value: "Real Android phones" },
      { label: "Engagement", value: "Daily for 14 days" },
      { label: "Feedback", value: "Ratings, bugs and reviews" },
    ],
    sections: [
      {
        id: "who",
        h2: "Who are the app testers on Test4Test?",
        paras: [
          "Every tester on Test4Test is also an app developer. They test your app because they need testers for their own, which means they understand what a useful bug report looks like and why staying for the full 14 days matters.",
          "Testers come from many countries and use their own Android phones, so your app runs on a realistic spread of devices, screen sizes and Android versions instead of a single emulator.",
        ],
      },
      {
        id: "what",
        h2: "What mobile app testers do for your app",
        paras: ["Each tester signs a 14-day contract for your listing. During that time they:"],
        bullets: [
          "Opt in to your closed test and install the app from Google Play",
          "Open and use your app every day before the UTC reset",
          "Upload a screenshot taken that day as proof of use",
          "Rate the app and report bugs in a final survey",
          "Leave reviews other developers can read in the Catalog",
        ],
      },
      {
        id: "find",
        h2: "How to find app testers in four steps",
        paras: [],
        steps: [
          { title: "Install Test4Test", text: "Download Test4Test from Google Play and sign in with Google." },
          { title: "Earn tokens", text: "Test a few apps from the Catalog to earn tokens, or pick a Pro plan to skip ahead." },
          { title: "Publish your listing", text: "Add your app details and the Test4Test Google Group to your closed testing track, then publish." },
          { title: "Review testers daily", text: "Approve daily proofs, follow active testers and churn in Developer Studio, and read feedback." },
        ],
      },
      {
        id: "beyond",
        h2: "More than a headcount",
        paras: [
          "A list of email addresses won't tell you whether anyone opened your app. Test4Test shows you exactly who is testing, who checked in today and who dropped out, so you can act before your closed test is at risk. When the 14 days are done you also have real feedback to improve the app before your public launch.",
        ],
      },
    ],
    howTo: { section: "find", name: "How to find app testers for an Android app" },
    faq: [
      {
        q: "Are Test4Test app testers real people?",
        a: "Yes. Testers are Android developers using their own devices. Each day they must upload a screenshot taken that day, and proofs that aren't from today are rejected automatically.",
      },
      {
        q: "Can I get mobile app testers for iOS?",
        a: "No. Test4Test focuses on Android and Google Play's closed testing requirement, so all testers use Android devices.",
      },
      {
        q: "Can I target testers in a specific country?",
        a: "Yes. When you publish a listing you can choose Global or a specific country.",
      },
    ],
    related: ["google-play-testers", "test-for-test", "free-app-testers"],
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
  },
  {
    slug: "test-for-test",
    metaTitle: "Test for Test: How the App Testing Exchange Works | Test4Test",
    description:
      "Test for test means you test other developers' apps and they test yours. See how Test4Test makes the exchange fair with tokens, karma and verified daily proof.",
    keywords: ["test for test", "test4test", "test 4 test", "app testing exchange", "tester exchange", "mutual app testing", "testing swap"],
    eyebrow: "Test for test",
    h1: "Test for test: you test their apps, they test yours",
    answer:
      "Test for test is a reciprocal way to get app testers: you test other developers' apps and they test yours. Test4Test makes the exchange fair and trackable. Testing an app earns you tokens, tokens pay for testers on your own listing, and Karma rewards people who check in every day, so the community rewards reliable testers and filters out no-shows.",
    facts: [
      { label: "Earn per app tested", value: "Tokens per completed test" },
      { label: "Basic listing", value: "80 tokens" },
      { label: "Daily check-in", value: "+1 Karma" },
      { label: "Missed day", value: "-2 Karma" },
      { label: "Referral bonus", value: "+50 tokens each" },
    ],
    sections: [
      {
        id: "problem",
        h2: "Why test for test groups usually break down",
        paras: [
          "Developers have swapped tests in forums, Discord servers and Reddit threads ever since Google introduced the closed testing requirement. The idea works, but informal swaps have no accountability. People install your app, uninstall it two days later and you never find out.",
        ],
      },
      {
        id: "fair",
        h2: "How Test4Test makes test for test fair",
        paras: ["Test4Test keeps the reciprocity and adds the accountability:"],
        bullets: [
          "Tokens: you earn tokens for every app you test and spend them to list your own",
          "Contracts: testers commit to 14 days for each app they claim",
          "Daily proof: one dated screenshot per day, checked automatically and reviewed by the developer",
          "Karma: +1 for each approved check-in and -2 for each missed day, so reliability is visible",
          "Shared Google Group: one email in Play Console, no personal addresses exchanged",
        ],
      },
      {
        id: "loop",
        h2: "The test for test loop",
        paras: [],
        steps: [
          { title: "Pick apps to test", text: "Browse the Catalog and claim a slot on apps that need testers." },
          { title: "Check in daily", text: "Open each app every day and upload a screenshot to keep your streak and earn Karma." },
          { title: "Earn tokens", text: "Tokens are added to your balance as you complete tests and leave reviews." },
          { title: "Spend tokens on your app", text: "Publish your own listing and let the community test it the same way." },
        ],
      },
      {
        id: "skip",
        h2: "Don't have time to test?",
        paras: [
          "Pro and Pro+ plans give you discounted or free listings, more testers per app and auto-approval of daily proofs, so you can get testers without testing others first.",
        ],
      },
    ],
    howTo: { section: "loop", name: "How test for test works on Test4Test" },
    faq: [
      {
        q: "Is Test4Test the same as test for test?",
        a: "Test4Test is an app built around the test for test idea. It adds tokens, 14-day contracts, daily screenshot proof and Karma so the exchange is fair and verifiable.",
      },
      {
        q: "How many apps do I need to test to list my own?",
        a: "A Basic listing costs 80 tokens. How many tests that takes depends on the listings you pick, and boosted listings pay more. Reviews and referrals earn extra tokens.",
      },
      {
        q: "What happens if a tester stops testing my app?",
        a: "Missed days cost the tester Karma and show up in your Developer Studio as churn. You can see exactly who is still active.",
      },
    ],
    related: ["free-app-testers", "google-play-testers", "app-testers"],
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
  },
  {
    slug: "free-app-testers",
    metaTitle: "Free App Testers for Google Play, No Card Needed | Test4Test",
    description:
      "Get free testers for your Android app. Earn tokens by testing other apps and spend them on 12 to 20+ Google Play testers for your closed test. No credit card required.",
    keywords: [
      "free testers",
      "free app testers",
      "free google play testers",
      "free beta testers",
      "free android testers",
      "get testers for free",
      "free closed testing testers",
    ],
    eyebrow: "Free app testers",
    h1: "Free app testers for your Google Play closed test",
    answer:
      "Yes, you can get app testers for free. On Test4Test you earn tokens by testing other developers' Android apps, then spend 80 tokens to publish a Basic listing that gets testers for your own closed test. There's no credit card and no subscription required. Paid plans are optional if you want more testers or want to skip testing.",
    facts: [
      { label: "Price", value: "$0 with earned tokens" },
      { label: "Basic listing", value: "80 tokens" },
      { label: "Ways to earn", value: "Testing, reviews, referrals" },
      { label: "Credit card", value: "Not required" },
      { label: "Optional plans", value: "Pro and Pro+" },
    ],
    sections: [
      {
        id: "how",
        h2: "How to get testers for free",
        paras: [],
        steps: [
          { title: "Install Test4Test and sign in", text: "Download the app from Google Play and sign in with your Google account." },
          { title: "Test apps from the Catalog", text: "Claim apps that need testers, open them daily and upload proof. Each completed test earns tokens." },
          { title: "Boost your balance", text: "Leave reviews on apps you tested and invite friends; you both get +50 tokens after their first test." },
          { title: "Publish your listing", text: "Once you have 80 tokens, publish a Basic listing and let the community test your app." },
        ],
      },
      {
        id: "catch",
        h2: "What's the catch?",
        paras: [
          "Your time. Free testers on Test4Test are other developers doing the same thing you are, so the community only works because everyone tests. That is also why the testers are reliable: they need their own streaks and Karma, and missing days costs them.",
        ],
      },
      {
        id: "compare",
        h2: "Free vs paid ways to get testers",
        paras: ["Here is how the common options compare for a Google Play closed test:"],
        bullets: [
          "Friends and family: free, but most won't stay 14 days",
          "Forums and Reddit swaps: free, but no way to verify activity",
          "Paid tester services: fast, but you pay per tester and often can't see engagement",
          "Test4Test: free with tokens, verified daily, with optional paid plans for speed",
        ],
      },
    ],
    howTo: { section: "how", name: "How to get free app testers for Google Play" },
    faq: [
      {
        q: "Are free testers good enough for Google Play?",
        a: "What matters to Google is that testers are real, opted in and engaged for 14 days. Test4Test testers check in daily with screenshot proof whether you paid or not.",
      },
      {
        q: "How long does it take to earn enough tokens?",
        a: "It depends on how many apps you test at once. Many developers test several apps in parallel and earn 80 tokens within their first test cycle.",
      },
      {
        q: "Do I have to pay to publish my app?",
        a: "No. You can publish with earned tokens. Pro gives 50% off listings and Pro+ makes listings free if you prefer to pay instead of testing.",
      },
    ],
    related: ["test-for-test", "google-play-testers", "google-play-closed-testing"],
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
  },
  {
    slug: "google-play-closed-testing",
    metaTitle: "Google Play Closed Testing: 12 Testers for 14 Days (2026 Guide)",
    description:
      "Google Play closed testing explained: who needs 12 testers for 14 days, how to set up the track, what Google asks for production access, and mistakes to avoid.",
    keywords: [
      "google play closed testing",
      "12 testers 14 days",
      "20 testers 14 days",
      "closed testing requirement",
      "google play production access",
      "play console closed test",
      "how to apply for production access",
    ],
    eyebrow: "Guide",
    h1: "Google Play closed testing: the 12 testers, 14 days rule explained",
    answer:
      "If your Google Play developer account is a personal account created after November 13, 2023, you must run a closed test with at least 12 opted-in testers for at least 14 consecutive days before you can apply for production access. Google reduced the number from 20 to 12 in December 2024. After the 14 days you apply in Play Console, answer questions about your test, and Google reviews the application.",
    facts: [
      { label: "Applies to", value: "Personal accounts since Nov 13, 2023" },
      { label: "Minimum testers", value: "12 (was 20)" },
      { label: "Minimum duration", value: "14 consecutive days" },
      { label: "Track type", value: "Closed testing" },
      { label: "Next step", value: "Apply for production access" },
    ],
    sections: [
      {
        id: "who",
        h2: "Who has to meet the closed testing requirement?",
        paras: [
          "The rule applies to personal developer accounts created after November 13, 2023. Organization accounts are exempt. If your account is older, or you publish under an organization, you can go straight to production.",
          "Each new app on an affected account needs its own closed test before its first production release.",
        ],
      },
      {
        id: "setup",
        h2: "How to set up a closed test that counts",
        paras: [],
        steps: [
          { title: "Create a closed testing track", text: "In Play Console go to Test and release → Testing → Closed testing and create a track." },
          { title: "Upload a release", text: "Upload your Android App Bundle to the track and roll it out to testers." },
          {
            title: "Add testers",
            text: "Add testers by email list or Google Group. A Google Group, such as the Test4Test community group, lets many testers opt in with one address.",
          },
          { title: "Share the opt-in link", text: "Testers must open the opt-in URL and join the test, then install the app from Google Play." },
          { title: "Keep 12+ testers opted in for 14 days", text: "Track your opted-in count in Play Console. If it drops below 12, the 14 days may not count." },
          { title: "Apply for production access", text: "On the Dashboard, choose Apply for production and answer the questions about your test." },
        ],
      },
      {
        id: "apply",
        h2: "What Google asks when you apply for production",
        paras: ["The application is a short questionnaire about how your test went. Expect questions along these lines:"],
        bullets: [
          "How did you recruit testers for your app?",
          "How easy was it to recruit testers, and how engaged were they?",
          "What feedback did you get and how did you act on it?",
          "Who is the intended audience and how does the app provide value?",
          "What changes did you make to your app based on testing?",
        ],
      },
      {
        id: "mistakes",
        h2: "Common closed testing mistakes",
        paras: [],
        bullets: [
          "Recruiting exactly 12 testers, then dropping below the minimum when one leaves",
          "Testers who join but never install or open the app",
          "Using an open or internal test instead of a closed test",
          "Applying for production with no feedback or changes to describe",
          "Switching tracks partway through, which makes 14 continuous days harder to show",
        ],
      },
      {
        id: "t4t",
        h2: "How Test4Test helps you pass",
        paras: [
          "Test4Test listings target 20+ testers so you have a buffer above 12. Every tester uploads a dated screenshot each day, so engagement is documented, and the final survey collects ratings and bug reports you can describe in your production application.",
        ],
      },
    ],
    howTo: { section: "setup", name: "How to complete Google Play closed testing", totalTime: "P14D" },
    faq: [
      {
        q: "Is it 12 or 20 testers for Google Play?",
        a: "It is 12. Google originally required 20 testers when the rule launched in November 2023 and lowered it to 12 in December 2024. The 14-day duration did not change.",
      },
      {
        q: "Do the 14 days have to be consecutive?",
        a: "Yes. Testers must stay opted in for at least 14 days in a row, so keep a buffer above 12 in case someone leaves.",
      },
      {
        q: "Can I use internal testing instead of closed testing?",
        a: "No. Only a closed testing track counts toward the requirement.",
      },
      {
        q: "What happens if my production application is rejected?",
        a: "Google tells you why. Usually you continue testing, collect more engagement and feedback, and apply again.",
      },
    ],
    related: ["google-play-testers", "free-app-testers", "app-testers"],
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
