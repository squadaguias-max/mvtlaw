import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FolderSearch,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { templateConfig as site, whatsappUrl } from "../../../config/template.config";
import heroImage from "../../../assets/usucapiao-hero.webp";
import meetingImage from "../../../assets/reuniao-mvt.webp";
import teamImage from "../../../assets/equipe-mvt.webp";

function SectionTitle({ eyebrow, title, intro, light = false }) {
  return (
    <header className={`section-heading${light ? " light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  );
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "");
    const digits = phone.replace(/\D/g, "");
    if (name.length < 2 || digits.length < 10) return;
    const message = `${site.contact.whatsappMessage} Meu nome é ${name} e meu telefone é ${phone}.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Nome</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          minLength="2"
          maxLength="80"
          placeholder="Seu nome completo"
          required
        />
      </label>
      <label>
        <span>Telefone (WhatsApp)</span>
        <input
          type="text"
          name="phone"
          autoComplete="tel"
          inputMode="numeric"
          pattern="\(\d{2}\) \d{4,5}-\d{4}"
          minLength="14"
          maxLength="15"
          placeholder="(11) 99999-9999"
          onInput={(event) => { event.currentTarget.value = formatPhone(event.currentTarget.value); }}
          required
        />
      </label>
      <button className="button button-accent" type="submit">
        Enviar <ArrowRight aria-hidden="true" />
      </button>
      <small>
        Ao enviar, você concorda com o tratamento dos seus dados exclusivamente para fins de contato.
      </small>
    </form>
  );
}

export function HomePage() {
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.professional.officeName,
    description: site.professional.biography,
    url: site.contact.website,
    telephone: `+${site.contact.phone}`,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Bagé, 204",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: ["São Paulo", "Brasil - atendimento online"],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow light">{site.hero.eyebrow}</span>
          <h1>{site.hero.title}</h1>
          <p>{site.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-accent" href="#contato">
              {site.hero.cta} <ArrowRight aria-hidden="true" />
            </a>
            <a className="text-link light" href="#como-funciona">
              {site.hero.secondaryCta} <ArrowDown aria-hidden="true" />
            </a>
          </div>
          <div className="hero-support"><MapPin aria-hidden="true" /> {site.hero.support}</div>
        </div>
        <div className="hero-media">
          <img
            src={heroImage}
            width="1536"
            height="1024"
            alt="Documentos e planta de um imóvel ao lado de uma chave, com residência urbana ao fundo"
          />
          <div className="hero-media-note"><span>Direito Imobiliário</span><strong>Análise técnica de cada caso</strong></div>
        </div>
      </section>

      <section className="section situations" id="situacoes">
        <div className="container">
          <SectionTitle
            eyebrow="SITUAÇÕES COMUNS"
            title="Alguma dessas situações se parece com a sua?"
            intro="A ausência de registro pode ter origens diferentes. O primeiro passo é entender o histórico da posse e a documentação disponível."
          />
          <div className="situations-grid">
            {site.situations.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Home aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <p className="section-footnote">Cada situação tem requisitos próprios e precisa ser analisada individualmente.</p>
        </div>
      </section>

      <section className="section definition" id="usucapiao">
        <div className="container definition-grid">
          <div>
            <span className="eyebrow">ENTENDA O CONCEITO</span>
            <h2>O que é<br /><em>usucapião</em></h2>
          </div>
          <div className="definition-copy">
            <p className="lead">É a forma de aquisição da propriedade em que a posse exercida por determinado período, cumpridos os requisitos legais, pode levar ao reconhecimento da propriedade.</p>
            <p>Ela trata de situações em que existe diferença entre quem ocupa o imóvel e quem consta como proprietário nos registros oficiais.</p>
            <aside><ShieldCheck aria-hidden="true" /><span><strong>Os requisitos variam conforme a modalidade.</strong> A análise individual é indispensável antes de qualquer conclusão.</span></aside>
          </div>
        </div>
      </section>

      <section className="section paths" id="caminhos">
        <div className="container">
          <SectionTitle eyebrow="FORMAS DE PROCESSAMENTO" title="Dois caminhos possíveis" intro="A documentação e as circunstâncias do caso indicam qual via pode ser aplicável." />
          <div className="paths-grid">
            {site.paths.map((path, index) => (
              <article key={path.title}>
                <div><span>{path.number}</span>{index === 0 ? <Scale aria-hidden="true" /> : <FileCheck2 aria-hidden="true" />}</div>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section modalities" id="modalidades">
        <div className="container">
          <SectionTitle light eyebrow="MODALIDADES" title="Modalidades previstas na legislação" intro="Prazos, limites de área e demais requisitos estão definidos em lei e variam conforme a situação." />
          <div className="modalities-grid">
            {site.modalities.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section analysis" id="analise">
        <div className="container">
          <SectionTitle eyebrow="ANÁLISE INICIAL" title="O que precisa ser analisado no seu caso" intro="Não é necessário reunir tudo antes do primeiro contato. A equipe orienta o que é relevante para a sua situação." />
          <div className="analysis-grid">
            <article>
              <FolderSearch aria-hidden="true" />
              <h3>Fatores do caso</h3>
              <ol>{site.analysis.factors.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ol>
            </article>
            <article>
              <ClipboardCheck aria-hidden="true" />
              <h3>Documentos que ajudam</h3>
              <ol>{site.analysis.documents.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ol>
            </article>
          </div>
          <a className="button button-dark" href="#contato">Falar com o escritório <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="section outcomes" id="regularizacao">
        <div className="container">
          <SectionTitle eyebrow="EFEITOS POSSÍVEIS" title="O que muda com a regularização" intro="Os efeitos variam conforme a modalidade e a situação registral anterior." />
          <div className="outcomes-grid">
            {site.outcomes.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process" id="como-funciona">
        <div className="container">
          <SectionTitle light eyebrow="ATENDIMENTO" title="Como funciona o atendimento" />
          <div className="process-grid">
            {site.process.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact" id="contato">
        <div className="container contact-grid">
          <div className="contact-copy">
            <span className="eyebrow light">PRIMEIRO CONTATO</span>
            <h2>Envie seus dados para falar com o escritório</h2>
            <p>Preencha nome e telefone. A equipe entra em contato para entender a situação do imóvel e orientar quais informações são relevantes para a análise.</p>
            <div className="direct-contact">
              <p>Prefere falar direto pelo WhatsApp?</p>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Falar pelo WhatsApp</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section about" id="escritorio">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="eyebrow">SOBRE O ESCRITÓRIO</span>
              <h2>MVT Law<br /><em>Advocacia</em></h2>
            </div>
            <div className="about-copy">
              <p className="lead">{site.professional.biography}</p>
              <address>
                <span><Building2 aria-hidden="true" /><strong>{site.professional.societyName}</strong></span>
                <span><MapPin aria-hidden="true" />{site.location.address}</span>
                <a href={`mailto:${site.contact.email}`}><Mail aria-hidden="true" />{site.contact.email}</a>
                <a href={`tel:+${site.contact.phone}`}><Phone aria-hidden="true" />{site.contact.phoneLabel}</a>
              </address>
            </div>
          </div>
          <div className="about-visuals">
            <figure className="meeting-photo">
              <img src={meetingImage} width="1400" height="1400" loading="lazy" alt="Profissionais da MVT Law em uma conversa de trabalho" />
              <figcaption>Atendimento próximo e análise individualizada</figcaption>
            </figure>
            <figure className="team-photo">
              <img src={teamImage} width="1800" height="996" loading="lazy" alt="Equipe da MVT Law reunida no escritório" />
              <figcaption>Equipe MVT Law · São Paulo</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section faq" id="duvidas">
        <div className="container faq-grid">
          <SectionTitle eyebrow="PERGUNTAS FREQUENTES" title="Informação clara antes de qualquer decisão" intro="Estas respostas são gerais. A orientação adequada depende da análise dos fatos e documentos do seu caso." />
          <div className="faq-list">
            {site.faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true">+</i></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a MVT Law pelo WhatsApp">
        <MessageCircle aria-hidden="true" /><span>Falar pelo WhatsApp</span>
      </a>
    </>
  );
}
