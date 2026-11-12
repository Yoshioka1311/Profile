export type SocialKind = "email" | "github" | "linkedin" | "other";

export function SocialIcon({ kind }: { kind: SocialKind }) {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    github: <path d="M9 19c-4.3 1.3-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.5-3.7 4.9 4.9 0 0 0-.1-3.7S17.5.9 15 2.7a12.8 12.8 0 0 0-6 0C6.5.9 5.3 1.3 5.3 1.3a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.5 3.7c0 5.3 3.2 6.5 6.2 6.8a3.4 3.4 0 0 0-.9 2.6V22" />,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7M7.5 7h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    other: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z" /></>,
  };
  return <svg className="social-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[kind]}</svg>;
}
