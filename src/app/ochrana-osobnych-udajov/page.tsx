import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import config from "../../../content/site-config.json";

const { business } = config;

export const metadata: Metadata = {
  title: `Ochrana osobných údajov — ${business.name}`,
  description: `Informácie o spracúvaní osobných údajov prevádzkovateľom ${business.name} v súlade s GDPR nariadením.`,
};

// ─── Reusable section wrapper ───────────────────────────────
function Section({ number, title, children }: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="font-headline text-xl font-bold text-on-surface mb-4 flex items-baseline gap-3">
        <span className="text-primary-container font-label text-sm font-bold tabular-nums shrink-0">
          {number}.
        </span>
        {title}
      </h2>
      <div className="font-body text-on-surface-variant leading-[1.8] space-y-3">
        {children}
      </div>
    </section>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2 pl-0">
      {children}
    </ul>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-primary-container mt-[0.55em] shrink-0 text-[8px]">■</span>
      <span>{children}</span>
    </li>
  );
}

export default function OchranaOsobnychUdajovPage() {
  return (
    <>
      <Header />
      <main className="bg-surface min-h-screen">
        {/* Page hero */}
        <section className="bg-surface-container-lowest pt-[72px] pb-12 px-6 md:px-12 border-b border-surface-container-low/50">
          <div className="max-w-3xl mx-auto pt-16">
            <span className="text-primary-container font-label uppercase tracking-[0.3em] text-xs block mb-4">
              Právne dokumenty
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-3">
              Ochrana osobných údajov
            </h1>
            <p className="font-body text-sm text-on-surface-variant">
              Platné od 1.&nbsp;1.&nbsp;2026 · Posledná aktualizácia: 20.&nbsp;3.&nbsp;2026
            </p>
          </div>
        </section>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">

          {/* 1. Prevádzkovateľ */}
          <Section number="1" title="Prevádzkovateľ">
            <p>
              <strong className="text-on-surface">{business.name}</strong>, so sídlom{" "}
              {business.contacts.address}, email:{" "}
              <a href={`mailto:${business.contacts.email}`} className="text-primary-container hover:underline">
                {business.contacts.email}
              </a>
              , telefón:{" "}
              <a href={`tel:${business.contacts.phone.replace(/\s/g, "")}`} className="text-primary-container hover:underline">
                {business.contacts.phone}
              </a>{" "}
              (ďalej len „prevádzkovateľ") spracúva vaše osobné údaje v súlade s Nariadením
              Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákonom č.&nbsp;18/2018 Z.z.
              o ochrane osobných údajov.
            </p>
          </Section>

          {/* 2. Aké údaje zbierame */}
          <Section number="2" title="Aké údaje zbierame">
            <div className="space-y-6">
              <div>
                <p className="font-bold text-on-surface mb-2">a) Údaje z rezervačného formulára</p>
                <Ul>
                  <Li>Meno a priezvisko</Li>
                  <Li>Telefónne číslo</Li>
                  <Li>Email (ak je uvedený)</Li>
                  <Li>Preferovaný dátum a čas termínu</Li>
                  <Li>Poznámky k rezervácii (špeciálne požiadavky)</Li>
                </Ul>
              </div>
              <div>
                <p className="font-bold text-on-surface mb-2">b) Údaje z kontaktného formulára</p>
                <Ul>
                  <Li>Meno</Li>
                  <Li>Emailová adresa</Li>
                  <Li>Obsah správy</Li>
                </Ul>
              </div>
              <div>
                <p className="font-bold text-on-surface mb-2">c) Údaje z telefonických hovorov</p>
                <Ul>
                  <Li>Telefónne číslo volajúceho</Li>
                  <Li>Čas a dĺžka hovoru</Li>
                  <Li>
                    Záznam hovoru (ak je AI recepčná aktívna — na nahrávanie ste upozornení
                    na začiatku každého hovoru)
                  </Li>
                </Ul>
              </div>
              <div>
                <p className="font-bold text-on-surface mb-2">d) Údaje z WhatsApp komunikácie</p>
                <Ul>
                  <Li>Telefónne číslo</Li>
                  <Li>Obsah správ súvisiacich s rezerváciami a poskytovanými službami</Li>
                </Ul>
              </div>
              <div>
                <p className="font-bold text-on-surface mb-2">e) Cookies a analytické údaje</p>
                <p>
                  Webstránka používa Cloudflare Web Analytics — anonymizované štatistiky návštevnosti
                  bez cookies tretích strán. Tieto údaje neumožňujú identifikáciu konkrétnej osoby.
                </p>
              </div>
            </div>
          </Section>

          {/* 3. Účel spracúvania */}
          <Section number="3" title="Účel spracúvania">
            <Ul>
              <Li>Spracovanie a potvrdenie rezervácií</Li>
              <Li>Zasielanie pripomienok pred termínom (SMS/WhatsApp)</Li>
              <Li>Komunikácia ohľadom poskytovaných služieb</Li>
              <Li>Zasielanie žiadostí o hodnotenie po návšteve</Li>
              <Li>Zlepšovanie kvality služieb</Li>
              <Li>Plnenie zákonných povinností</Li>
            </Ul>
          </Section>

          {/* 4. Právny základ */}
          <Section number="4" title="Právny základ">
            <div className="space-y-4">
              <p>
                <strong className="text-on-surface">Plnenie zmluvy</strong>{" "}
                <span className="text-on-surface-variant/60 text-sm">(čl. 6 ods. 1 písm. b) GDPR)</span>
                {" "}— spracovanie rezervácií a poskytovanie dohodnutých služieb.
              </p>
              <p>
                <strong className="text-on-surface">Oprávnený záujem</strong>{" "}
                <span className="text-on-surface-variant/60 text-sm">(čl. 6 ods. 1 písm. f) GDPR)</span>
                {" "}— zasielanie pripomienok termínov, žiadostí o hodnotenie a zlepšovanie
                kvality služieb.
              </p>
              <p>
                <strong className="text-on-surface">Súhlas</strong>{" "}
                <span className="text-on-surface-variant/60 text-sm">(čl. 6 ods. 1 písm. a) GDPR)</span>
                {" "}— marketingová komunikácia (ak je aktivovaná na základe vášho súhlasu).
              </p>
            </div>
          </Section>

          {/* 5. Doba uchovávania */}
          <Section number="5" title="Doba uchovávania">
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="text-left py-3 px-2 font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-normal">
                      Typ údajov
                    </th>
                    <th className="text-left py-3 px-2 font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-normal">
                      Doba uchovávania
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    ["Rezervačné údaje", "12 mesiacov od poslednej návštevy"],
                    ["Kontaktné formuláre", "6 mesiacov"],
                    ["Záznamy hovorov", "30 dní"],
                    ["Faktúry a účtovné doklady", "10 rokov (zákonná povinnosť)"],
                    ["Analytické údaje", "Anonymizované, bez časového obmedzenia"],
                  ].map(([type, period]) => (
                    <tr key={type}>
                      <td className="py-3 px-2 text-on-surface">{type}</td>
                      <td className="py-3 px-2 text-on-surface-variant">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 6. Príjemcovia údajov */}
          <Section number="6" title="Príjemcovia údajov">
            <p>Vaše údaje môžu byť zdieľané s nasledujúcimi spracovateľmi:</p>
            <Ul>
              <Li>
                <strong className="text-on-surface">Google LLC</strong> — Google Sheets,
                Google Business Profile (uloženie rezervácií, správa recenzií)
              </Li>
              <Li>
                <strong className="text-on-surface">Meta Platforms</strong> — WhatsApp Business
                (komunikácia s klientmi)
              </Li>
              <Li>
                <strong className="text-on-surface">Cloudflare Inc.</strong> — hosting webstránky
                a anonymizovaná analytika
              </Li>
              <Li>
                <strong className="text-on-surface">Vapi Inc.</strong> — AI telefónna recepčná
                (spracovanie a transkripcia hovorov)
              </Li>
            </Ul>
            <p>
              Všetci spracovatelia spĺňajú požiadavky GDPR. Prenos údajov do tretích krajín (USA)
              je zabezpečený na základe štandardných zmluvných doložiek EÚ alebo rozhodnutia
              o primeranosti (EU‑US Data Privacy Framework).
            </p>
          </Section>

          {/* 7. Vaše práva */}
          <Section number="7" title="Vaše práva">
            <p>Podľa GDPR máte právo:</p>
            <Ul>
              <Li>na prístup k svojim osobným údajom</Li>
              <Li>na opravu nesprávnych alebo neúplných údajov</Li>
              <Li>na vymazanie údajov („právo byť zabudnutý")</Li>
              <Li>na obmedzenie spracúvania</Li>
              <Li>na prenosnosť údajov</Li>
              <Li>namietať proti spracúvaniu na základe oprávneného záujmu</Li>
              <Li>
                podať sťažnosť na{" "}
                <strong className="text-on-surface">
                  Úrad na ochranu osobných údajov SR
                </strong>{" "}
                (
                <a
                  href="https://www.dataprotection.gov.sk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-container hover:underline"
                >
                  www.dataprotection.gov.sk
                </a>
                )
              </Li>
            </Ul>
            <p>
              Pre uplatnenie vašich práv nás kontaktujte na{" "}
              <a href={`mailto:${business.contacts.email}`} className="text-primary-container hover:underline">
                {business.contacts.email}
              </a>{" "}
              alebo{" "}
              <a href={`tel:${business.contacts.phone.replace(/\s/g, "")}`} className="text-primary-container hover:underline">
                {business.contacts.phone}
              </a>
              . Na vašu žiadosť odpovieme do 30 dní.
            </p>
          </Section>

          {/* 8. Automatizované rozhodovanie */}
          <Section number="8" title="Automatizované rozhodovanie">
            <p>
              Používame AI systémy na spracovanie telefonických hovorov (AI recepčná) a automatické
              odpovede na online recenzie. Tieto systémy neprijímajú rozhodnutia s právnymi účinkami
              ani rozhodnutia, ktoré by vás inak výrazne ovplyvnili. Vždy máte možnosť požiadať
              o ľudský kontakt.
            </p>
          </Section>

          {/* 9. Zabezpečenie údajov */}
          <Section number="9" title="Zabezpečenie údajov">
            <p>
              Vaše údaje chránime technickými a organizačnými opatreniami vrátane:
            </p>
            <Ul>
              <Li>Šifrovania pri prenose (HTTPS/TLS)</Li>
              <Li>Zabezpečeného prístupu k systémom s viacfaktorovým overením</Li>
              <Li>Obmedzenia prístupu k údajom len pre oprávnené osoby</Li>
              <Li>Pravidelných bezpečnostných kontrol</Li>
            </Ul>
          </Section>

          {/* 10. Kontakt */}
          <Section number="10" title="Kontakt">
            <div className="bg-surface-container border border-outline-variant/15 p-6 space-y-2">
              <p className="font-bold text-on-surface">{business.name}</p>
              <p>{business.contacts.address}</p>
              <p>
                <a href={`mailto:${business.contacts.email}`} className="text-primary-container hover:underline">
                  {business.contacts.email}
                </a>
              </p>
              <p>
                <a href={`tel:${business.contacts.phone.replace(/\s/g, "")}`} className="text-primary-container hover:underline">
                  {business.contacts.phone}
                </a>
              </p>
            </div>
          </Section>

          {/* Footer note + back link */}
          <div className="mt-16 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40">
              Posledná aktualizácia: 20.&nbsp;3.&nbsp;2026
            </p>
            <Link
              href="/"
              className="font-label text-xs uppercase tracking-widest text-primary-container hover:brightness-110 transition-colors flex items-center gap-2"
            >
              ← Späť na úvodnú stránku
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
