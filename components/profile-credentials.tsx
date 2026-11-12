import Image from "next/image";
import type { ReactNode } from "react";
import { copy, site, type Locale } from "@/data/content";
import { publicPath } from "@/lib/public-path";

export function ProfileCredentials({ locale, children }: { locale: Locale; children?: ReactNode }) {
  const labels = copy[locale].about;
  const { education, experience } = site;

  return (
    <>
      <section className="profile-education grid-editorial" aria-labelledby="education-university">
        <div className="education-details">
          <p className="credential-label">{labels.education}</p>
          <h2 id="education-university">{education.university[locale]}</h2>
          <p className="education-program">{education.program[locale]}</p>
          <p>{education.faculty[locale]}</p>
        </div>
        <a className="education-logo" href={education.url} target="_blank" rel="noreferrer">
          <Image src={publicPath(education.logo)} alt={`${education.university[locale]} · ${education.faculty[locale]}`} width={768} height={156} sizes="(max-width: 767px) 85vw, 27vw" />
        </a>
      </section>
      <section className="profile-employment" aria-labelledby="experience-title">
        <h2 id="experience-title" className="credential-label">{labels.experience}</h2>
        <ul className="employment-list">
          {experience.map((item) => (
            <li key={item.company + item.project} className="employment-entry grid-editorial">
              <div className="employment-heading">
                <h3>{item.company}</h3>
                <p>{item.year[locale]}</p>
              </div>
              <div className="employment-details">
                <p className="employment-role">{item.role[locale]} <span aria-hidden="true">·</span> {item.project}</p>
                <p>{item.description[locale]}</p>
              </div>
            </li>
          ))}
        </ul>
        {children}
      </section>
    </>
  );
}
