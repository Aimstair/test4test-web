import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { COMPANY, SUPPORT_EMAIL } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service · Test4Test",
  description: "The rules for using the Test4Test app-testing community.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 24, 2026">
      <p>
        These Terms govern your use of the Test4Test mobile application and related services (the &ldquo;Service&rdquo;), operated by{" "}
        {COMPANY}. By creating an account you agree to these Terms.
      </p>

      <h2>1. Eligibility</h2>
      <p>You must be at least 18 years old and have a Google account and an Android device to use the Service.</p>

      <h2>2. How the Service Works</h2>
      <ul>
        <li>Developers list apps that are in closed testing on Google Play. Testers commit to using those apps for 14 consecutive days.</li>
        <li>Testers join our shared Google Group so developers can grant access without exchanging personal emails.</li>
        <li>Each day, testers must open the app and upload a genuine screenshot taken that day as proof of activity.</li>
      </ul>

      <h2>3. Tokens and Karma</h2>
      <ul>
        <li>Tokens are a virtual in-app currency with no cash value. They cannot be exchanged for money or transferred outside the Service.</li>
        <li>Karma is a reputation score. It goes up for approved daily check-ins and down for missed days or rule violations.</li>
        <li>We may adjust token rewards, listing costs, and Karma rules to keep the community fair. Balances obtained through fraud may be removed.</li>
      </ul>

      <h2>4. Fair Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Submit fake, edited, reused, or someone else&apos;s screenshots as proof.</li>
        <li>Use multiple accounts, emulators, or automation to earn tokens or Karma.</li>
        <li>List apps that are malicious, illegal, or violate Google Play policies.</li>
        <li>Harass other users or misuse personal information obtained through the Service.</li>
      </ul>
      <p>We may suspend or terminate accounts that break these rules.</p>

      <h2>5. Subscriptions and Purchases</h2>
      <p>
        Pro and Pro+ subscriptions and token packs are sold through Google Play and are subject to Google Play&apos;s terms. Subscriptions renew
        automatically until cancelled in your Google Play account settings. Refunds are handled under Google Play&apos;s refund policy.
      </p>

      <h2>6. No Guarantee of Approval</h2>
      <p>
        Test4Test helps you recruit and verify testers, but we are not affiliated with Google. We cannot guarantee that Google will approve
        your app for production or that any particular number of testers will remain active.
      </p>

      <h2>7. Content</h2>
      <p>
        You keep ownership of the content you submit. You grant us a limited licence to host and display it as needed to run the Service
        (for example, showing your screenshot proofs to the relevant developer).
      </p>

      <h2>8. Disclaimer and Liability</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo;. To the maximum extent permitted by law, {COMPANY} is not liable for indirect or
        consequential damages arising from your use of the Service.
      </p>

      <h2>9. Changes</h2>
      <p>We may update these Terms. Continued use of the Service after changes take effect means you accept the updated Terms.</p>

      <h2>10. Contact</h2>
      <p>
        Questions? Email <a className="text-primary underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
