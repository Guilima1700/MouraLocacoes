import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Menu,
  MessageCircle,
  PackageCheck,
  Play,
  ShieldCheck,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import {
  EquipmentShowcase,
  equipment,
} from "./components/EquipmentShowcase";

import { SocialSection } from "./components/SocialSection";

const whatsapp = "5579999357485";
const wa = (message: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

const nav = [
  { label: "Equipamentos", id: "equipamentos" },
  { label: "Como funciona", id: "como-funciona" },
  { label: "Diferenciais", id: "diferenciais" },
  { label: "Galeria", id: "galeria" },
];

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading reveal ${center ? "center" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const shouldLockScroll = open || lightbox !== null;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lightbox]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const request = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const selectedEquipment = String(data.get("equipment") || "");

    window.open(
      wa(
        `Olá! Sou ${name}. Gostaria de solicitar um orçamento${
          selectedEquipment ? ` para ${selectedEquipment}` : ""
        }.`,
      ),
      "_blank",
      "noopener,noreferrer",
    );

    setSent(true);
  };

  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Moura Locações - início">
          <img
            src="/assets/logo-moura.jpg"
            alt="Moura Locações"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <span>
            <b>MOURA</b>
            <small>LOCAÇÕES</small>
          </span>
        </a>

        <nav aria-label="Navegação principal">
          {nav.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <a
          className="button button-small"
          href={wa("Olá! Gostaria de solicitar um orçamento.")}
          target="_blank"
          rel="noreferrer"
        >
          Solicitar orçamento <ArrowRight size={16} />
        </a>

        <button className="menu" onClick={() => setOpen(true)} aria-label="Abrir menu">
          <Menu />
        </button>
      </header>

      <aside className={`mobile-menu ${open ? "show" : ""}`} aria-hidden={!open}>
        <button className="close" onClick={() => setOpen(false)} aria-label="Fechar menu">
          <X />
        </button>

        <div className="mobile-brand">
          MOURA <span>LOCAÇÕES</span>
        </div>

        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              scrollTo(item.id);
              setOpen(false);
            }}
          >
            {item.label}
            <ChevronRight />
          </button>
        ))}

        <a
          className="button"
          href={wa("Olá! Gostaria de solicitar um orçamento.")}
          target="_blank"
          rel="noreferrer"
        >
          Falar no WhatsApp <MessageCircle size={18} />
        </a>
      </aside>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-copy hero-enter">
            <p className="eyebrow">
              <span /> LOCAÇÃO DE EQUIPAMENTOS
            </p>
            <h1>
              A força que sua <em>obra</em> precisa.
            </h1>
            <p className="lede">
              Equipamentos para você trabalhar com mais praticidade, organização e
              confiança — do começo à entrega.
            </p>

            <div className="hero-actions">
              <a
                className="button"
                href={wa("Olá! Quero solicitar um orçamento para a minha obra.")}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar orçamento <ArrowRight size={18} />
              </a>
              <button className="text-button" onClick={() => scrollTo("equipamentos")}>
                Ver equipamentos <ChevronDown size={18} />
              </button>
            </div>

            <div className="hero-proof">
              <span><Check /> Atendimento ágil</span>
              <span><Check /> Equipamentos revisados</span>
              <span><Check /> Suporte de verdade</span>
            </div>
          </div>

          <div className="hero-media hero-media-enter">
            <img
              src="/assets/entrega.jpg"
              alt="Veículo da Moura Locações realizando entrega de equipamentos"
            />
            <div className="media-label">
              <Truck size={20} />
              <span>
                Equipamentos no prazo
                <br />
                <b>para a obra não parar.</b>
              </span>
            </div>
          </div>
        </section>

        <section className="intro reveal">
          <p>
            Da escolha do equipamento à locação, simplificamos uma etapa importante
            da sua obra.
          </p>
          <a
            href={wa("Olá! Preciso de ajuda para escolher um equipamento.")}
            target="_blank"
            rel="noreferrer"
          >
            Precisa de ajuda para escolher? <ArrowRight size={18} />
          </a>
        </section>

        <EquipmentShowcase />

        <section className="why" id="diferenciais">
          <div className="why-image reveal">
            <img
              src="/assets/locacao-vs-compra.jpg"
              alt="Comparativo entre comprar e alugar equipamentos"
              loading="lazy"
            />
            <button
              onClick={() => setLightbox("/assets/locacao-vs-compra.jpg")}
              aria-label="Ampliar imagem do comparativo"
            >
              <Play size={18} />
            </button>
          </div>

          <div className="why-copy reveal delay-2">
            <SectionHeading
              eyebrow="POR QUE LOCAR"
              title="Mais foco na obra. Menos preocupação com equipamento."
            />
            <div className="reasons">
              <div className="reveal delay-1">
                <Wrench />
                <span>
                  <b>Praticidade na operação</b>
                  <p>Conte com equipamentos quando a sua demanda pedir.</p>
                </span>
              </div>
              <div className="reveal delay-2">
                <PackageCheck />
                <span>
                  <b>Equipamentos revisados</b>
                  <p>Uma escolha mais segura para manter o ritmo de trabalho.</p>
                </span>
              </div>
              <div className="reveal delay-3">
                <Clock3 />
                <span>
                  <b>Atendimento ágil</b>
                  <p>Comunicação direta para tornar a locação simples.</p>
                </span>
              </div>
              <div className="reveal delay-4">
                <ShieldCheck />
                <span>
                  <b>Suporte de verdade</b>
                  <p>Uma equipe preparada para apoiar sua escolha.</p>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section process" id="como-funciona">
          <SectionHeading
            center
            eyebrow="LOCAÇÃO SEM COMPLICAÇÃO"
            title="Do pedido à obra, em quatro passos."
          />

          <ol>
            {[
              "Escolha o equipamento",
              "Peça seu orçamento",
              "Combine os detalhes",
              "Receba ou retire",
            ].map((step, index) => (
              <li className={`reveal delay-${index + 1}`} key={step}>
                <span>0{index + 1}</span>
                <h3>{step}</h3>
                <p>
                  {[
                    "Explore as opções e conte à equipe sobre a necessidade da sua obra.",
                    "Chame no WhatsApp para consultar disponibilidade e condições.",
                    "Alinhe o período de locação e os próximos passos diretamente conosco.",
                    "Organize a entrega ou retirada conforme o combinado com a equipe.",
                  ][index]}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="gallery" id="galeria">
          <SectionHeading
            eyebrow="MOURA EM AÇÃO"
            title="Equipamento certo, obra em movimento."
            copy="Uma seleção de materiais reais da Moura Locações."
          />

          <div className="gallery-grid">
            <button
              onClick={() => setLightbox("/assets/entrega.jpg")}
              className="gallery-large reveal"
            >
              <img src="/assets/entrega.jpg" alt="Entrega da Moura Locações" loading="lazy" />
              <span>Entregas que acompanham o ritmo da obra <ArrowRight /></span>
            </button>

            <button
              className="reveal delay-2"
              onClick={() => setLightbox("/assets/equipamentos.jpg")}
            >
              <img
                src="/assets/equipamentos.jpg"
                alt="Catálogo de equipamentos da Moura Locações"
                loading="lazy"
              />
              <span>Equipamentos para locação</span>
            </button>

            <button
              className="reveal delay-3"
              onClick={() => setLightbox("/assets/instagram.jpg")}
            >
              <img
                src="/assets/instagram.jpg"
                alt="Publicações da Moura Locações"
                loading="lazy"
              />
              <span>Veja também no Instagram</span>
            </button>
          </div>
        </section>

        {/* <SocialSection /> */}

        <section className="quote">
          <div className="reveal">
            <p className="eyebrow"><span /> VAMOS CONVERSAR</p>
            <h2>Sua obra não precisa esperar.</h2>
            <p>
              Conte do que você precisa e solicite um orçamento de forma rápida,
              sem compromisso.
            </p>
          </div>

          <form className="reveal delay-2" onSubmit={request}>
            <label>
              Seu nome
              <input required name="name" placeholder="Como podemos te chamar?" />
            </label>
            <label>
              Equipamento ou necessidade
              <select name="equipment" defaultValue="">
                <option value="">Selecione uma opção</option>
                {equipment.map((item) => <option key={item.name}>{item.name}</option>)}
                <option>Outro equipamento</option>
              </select>
            </label>
            <button className="button" type="submit">
              Solicitar pelo WhatsApp <MessageCircle size={18} />
            </button>
            {sent && (
              <small className="form-status">
                Abrindo o WhatsApp para concluir sua solicitação.
              </small>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer reveal">
        <div className="footer-brand">
          MOURA <span>LOCAÇÕES</span>
          <p>Locação de equipamentos para construção.</p>
        </div>
        <div>
          <b>Navegue</b>
          {nav.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>
          ))}
        </div>
        <div>
          <b>Atendimento</b>
          <a href={wa("Olá! Gostaria de falar com a Moura Locações.")} target="_blank" rel="noreferrer">
            WhatsApp: (79) 9 9935-7485
          </a>
          <a href="https://instagram.com/_mouralocacoes" target="_blank" rel="noreferrer">
            Instagram: @_mouralocacoes
          </a>
        </div>
        <small>© {new Date().getFullYear()} Moura Locações. Todos os direitos reservados.</small>
      </footer>

      <a
        className="whatsapp"
        href={wa("Olá! Gostaria de solicitar um orçamento.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Moura Locações pelo WhatsApp"
      >
        <MessageCircle />
      </a>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagem ampliada"
          onClick={() => setLightbox(null)}
        >
          <button aria-label="Fechar imagem"><X /></button>
          <img
            src={lightbox}
            alt="Material da Moura Locações ampliado"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default App;