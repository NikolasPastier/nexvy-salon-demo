import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import config from "../../../content/site-config.json";

const { business } = config;

export const metadata: Metadata = {
  title: `Obchodné podmienky — ${business.name}`,
  description: `Obchodné podmienky prevádzky ${business.name}. Informácie o rezerváciách, storno podmienkach a poskytovaných službách.`,
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
  return <ul className="space-y-2 pl-0">{children}</ul>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-primary-container mt-[0.55em] shrink-0 text-[8px]">■</span>
      <span>{children}</span>
    </li>
  );
}

export default function PodmienkyPage() {
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
              Obchodné podmienky
            </h1>
            <p className="font-body text-sm text-on-surface-variant">
              Platné od 1.&nbsp;1.&nbsp;2026
            </p>
          </div>
        </section>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">

          {/* 1. Úvodné ustanovenia */}
          <Section number="1" title="Úvodné ustanovenia">
            <p>
              Tieto obchodné podmienky upravujú vzťah medzi prevádzkovateľom{" "}
              <strong className="text-on-surface">{business.name}</strong>, so sídlom{" "}
              {business.contacts.address}, IČO: <span className="text-primary-container font-bold">DOPLNIŤ</span>{" "}
              (ďalej len „prevádzkovateľ") a zákazníkom (ďalej len „klient") pri poskytovaní
              kadernícky a súvisiacich služieb.
            </p>
            <p>
              Využitím služieb prevádzkovateľa klient vyjadruje súhlas s týmito obchodnými
              podmienkami.
            </p>
          </Section>

          {/* 2. Rezervácia termínu */}
          <Section number="2" title="Rezervácia termínu">
            <p>Rezerváciu termínu je možné uskutočniť prostredníctvom:</p>
            <Ul>
              <Li>Online formulára na webstránke ({business.name})</Li>
              <Li>
                Telefonicky na čísle{" "}
                <a
                  href={`tel:${business.contacts.phone.replace(/\s/g, "")}`}
                  className="text-primary-container hover:underline"
                >
                  {business.contacts.phone}
                </a>
              </Li>
              <Li>
                Cez WhatsApp na čísle{" "}
                <a
                  href={`https://wa.me/${business.contacts.whatsapp.replace(/[\s+]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-container hover:underline"
                >
                  {business.contacts.whatsapp}
                </a>
              </Li>
              <Li>Osobne v prevádzke počas otváracích hodín</Li>
            </Ul>
            <p>
              Rezervácia sa stáva záväznou po potvrdení prevádzkovateľom. Potvrdenie
              bude zaslané na WhatsApp alebo prostredníctvom SMS správy.
            </p>
            <p>
              Pri online rezervácii klient uvedie meno, telefónne číslo, požadovanú
              službu a preferovaný termín. Prevádzkovateľ si vyhradzuje právo navrhnúť
              alternatívny termín v prípade nedostupnosti požadovaného času.
            </p>
          </Section>

          {/* 3. Zrušenie a zmena termínu */}
          <Section number="3" title="Zrušenie a zmena termínu">
            <p>
              Klient môže bezplatne zrušiť alebo zmeniť termín najneskôr{" "}
              <strong className="text-on-surface">24 hodín</strong> pred plánovaným termínom.
              Zrušenie je možné telefonicky, cez WhatsApp alebo emailom na{" "}
              <a href={`mailto:${business.contacts.email}`} className="text-primary-container hover:underline">
                {business.contacts.email}
              </a>
              .
            </p>
            <p>
              Pri opakovanom nedodržaní termínu (no‑show) bez predchádzajúceho zrušenia si
              prevádzkovateľ vyhradzuje právo požadovať zálohu pri budúcich rezerváciách.
            </p>
            {/* PLACEHOLDER — skupinové rezervácie (napr. pre reštaurácie, eventy) */}
            {/* <p>
              Pri skupinových rezerváciách (8 a viac osôb) je storno lehota 48 hodín.
            </p> */}
          </Section>

          {/* 4. Ceny a platba */}
          <Section number="4" title="Ceny a platba">
            <p>
              Aktuálny cenník služieb je uvedený na webstránke a v prevádzke. Ceny sú
              konečné a sú uvedené vrátane DPH (ak je prevádzkovateľ platiteľom DPH).
            </p>
            <p>
              Konečná cena môže byť upravená oproti cenníku na základe rozsahu
              alebo náročnosti poskytnutej služby — vždy po predchádzajúcom súhlase
              klienta.
            </p>
            <p>Platba je možná:</p>
            <Ul>
              <Li>V hotovosti</Li>
              <Li>Platobnou kartou (ak je terminál k dispozícii v prevádzke)</Li>
            </Ul>
            {/* PLACEHOLDER — pre autoservisy alebo opravovne */}
            {/* <p>
              Presná cena opravy bude stanovená po diagnostike vozidla. Prevádzkovateľ
              informuje klienta o cene pred začatím prác a práce začne až po jeho súhlase.
            </p> */}
          </Section>

          {/* 5. Poskytovanie služieb */}
          <Section number="5" title="Poskytovanie služieb">
            <p>
              Prevádzkovateľ sa zaväzuje poskytnúť objednané služby odborne,
              svedomito a s náležitou odbornou starostlivosťou.
            </p>
            <p>
              Klient je povinný pred poskytnutím služby informovať prevádzkovateľa
              o všetkých skutočnostiach relevantných pre jej bezpečné a správne
              vykonanie — predovšetkým o zdravotných obmedzeniach, alergiách na
              kozmetické prípravky alebo špeciálnych požiadavkách.
            </p>
            {/* PLACEHOLDER — pre kadernícke salóny */}
            <p>
              V prípade nespokojnosti s výsledkom služby klient kontaktuje prevádzkovateľa
              do <strong className="text-on-surface">48 hodín</strong> od jej poskytnutia.
              Prevádzkovateľ ponúkne bezplatnú korekciu po predchádzajúcej konzultácii.
            </p>
            {/* PLACEHOLDER — pre autoservisy */}
            {/* <p>
              Na vykonané práce poskytuje prevádzkovateľ záruku v dĺžke 6 mesiacov
              alebo 10 000 km (podľa toho, čo nastane skôr), pokiaľ nie je dohodnuté inak.
            </p> */}
          </Section>

          {/* 6. Reklamácie */}
          <Section number="6" title="Reklamácie">
            <p>
              Reklamáciu je možné uplatniť osobne v prevádzke, telefonicky, emailom
              alebo cez WhatsApp. Prevádzkovateľ sa zaväzuje vybaviť reklamáciu
              do <strong className="text-on-surface">30 dní</strong> od jej doručenia.
            </p>
            <p>Kontakt pre reklamácie:</p>
            <div className="bg-surface-container border border-outline-variant/15 p-5 space-y-1 text-sm">
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

          {/* 7. Zodpovednosť */}
          <Section number="7" title="Zodpovednosť">
            <p>
              Prevádzkovateľ nezodpovedá za škody spôsobené tým, že klient neposkytol
              úplné alebo pravdivé informácie potrebné na riadne poskytnutie služby.
            </p>
            <p>
              Prevádzkovateľ nezodpovedá za oneskorenie alebo nemožnosť poskytnutia
              služby spôsobenú okolnosťami vyššej moci (napr. živelná pohroma, pandémia,
              výpadok dodávok) alebo okolnosťami mimo jeho kontroly.
            </p>
          </Section>

          {/* 8. AI systémy a automatizácia */}
          <Section number="8" title="AI systémy a automatizácia">
            <p>Prevádzkovateľ používa AI systémy na:</p>
            <Ul>
              <Li>Prijímanie telefonických hovorov (AI recepčná)</Li>
              <Li>Zasielanie automatických pripomienok termínov (WhatsApp/SMS)</Li>
              <Li>Generovanie odpovedí na online recenzie</Li>
            </Ul>
            <p>
              Klient má vždy možnosť požiadať o spojenie s ľudským pracovníkom. AI
              systémy slúžia na zlepšenie dostupnosti a rýchlosti komunikácie,
              nie na nahradenie odborného posúdenia alebo ľudského kontaktu.
            </p>
            <p>
              Hovory spracúvané AI recepčnou môžu byť nahrávané. Klient je na túto
              skutočnosť upozornený na začiatku hovoru.
            </p>
          </Section>

          {/* 9. Záverečné ustanovenia */}
          <Section number="9" title="Záverečné ustanovenia">
            <p>
              Tieto obchodné podmienky sú platné od 1.&nbsp;1.&nbsp;2026.
              Prevádzkovateľ si vyhradzuje právo na zmenu obchodných podmienok.
              O zmene bude informovať na webstránke najmenej 14 dní pred nadobudnutím
              ich účinnosti.
            </p>
            <p>
              Právne vzťahy neupravené týmito podmienkami sa riadia príslušnými
              právnymi predpismi Slovenskej republiky, predovšetkým Občianskym
              zákonníkom a zákonom o ochrane spotrebiteľa.
            </p>
            <p>
              V prípade sporu je miestne príslušný súd podľa sídla prevádzkovateľa.
              Klient má právo obrátiť sa na Slovenskú obchodnú inšpekciu (SOI) ako
              orgán alternatívneho riešenia sporov.
            </p>
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
