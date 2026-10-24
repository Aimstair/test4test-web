import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy · Test4Test",
  description: "How Test4Test collects, uses and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 24, 2026">
      <h2>1. Introduction</h2>
      <p>
        Welcome to Test4Test (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the
        &ldquo;App&rdquo;) and the mutual app testing services provided within it.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account information:</strong> when you sign in with your Google account, we collect your email address, name, and profile
          picture.
        </li>
        <li>
          <strong>Device information:</strong> operating system, device model, and country-level location, to help developers make sure
          testing requirements are met.
        </li>
        <li>
          <strong>User-generated content:</strong> app listings, URLs, daily testing screenshot proofs (including their capture date), bug
          reports, reviews, and support tickets.
        </li>
        <li>
          <strong>Usage data:</strong> your Karma score, Token balance, testing streaks, and transaction history.
        </li>
        <li>
          <strong>Purchase information:</strong> if you buy a subscription or tokens, Google Play processes the payment. We receive purchase
          status (via our payments provider, RevenueCat) but never your card details.
        </li>
        <li>
          <strong>Notification tokens:</strong> if you enable push notifications, we store a device token to send reminders such as daily
          check-ins.
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To provide, maintain, and improve the App&apos;s mutual testing community.</li>
        <li>To manage user accounts and authenticate users securely.</li>
        <li>To verify the completion of 14-day app tests through the review of daily screenshots.</li>
        <li>To facilitate access to closed tests using a privacy-focused shared Google Group.</li>
        <li>To send reminders and service notifications you have opted into.</li>
        <li>To process subscriptions and token purchases.</li>
        <li>To monitor App performance, prevent fraud, and enforce our Terms of Service.</li>
      </ul>

      <h2>4. Data Sharing and Disclosure</h2>
      <p>We do not sell your personal data. We only share information in the following ways:</p>
      <ul>
        <li>
          <strong>With other users:</strong> as part of the mutual testing process, your name, profile picture, device info, and testing
          proofs are shared with the developer whose app you are testing.
        </li>
        <li>
          <strong>Service providers:</strong> we use third-party services that process data on our behalf, such as Supabase (database and
          storage hosting), Google (authentication and Play billing), RevenueCat (purchase management), and Expo (push notifications).
        </li>
        <li>
          <strong>Legal requirements:</strong> we may disclose your information if required by law or in response to valid requests by
          public authorities.
        </li>
      </ul>

      <h2>5. Data Security</h2>
      <p>
        We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, no
        method of transmission over the internet or electronic storage is 100% secure.
      </p>

      <h2>6. Account Deletion and Data Retention</h2>
      <p>
        You can delete your account and remove your app listings directly from the profile settings in the App. Upon deletion, your personal
        data is removed from our active databases, except where retention is required by law. Screenshot proofs are periodically deleted
        after a test ends.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        Test4Test is a tool for app developers and testers and is intended strictly for users who are 18 or older. We do not knowingly collect
        personal information from children. If we learn that we have collected such data, we will delete it promptly.
      </p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of changes by updating the &ldquo;Last updated&rdquo; date
        above and, for significant changes, by providing an in-app notice.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        Questions about this policy? Contact us at <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
