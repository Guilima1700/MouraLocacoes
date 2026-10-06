import "./equipment-showcase.css";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Box,
  CircleDot,
  Drill,
  Ruler,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import betoneiraImg from "../assets/betoneira.jpeg";
import escoraImg from "../assets/escoras320.png";
import marteloRompedor from "../assets/marteloRompedor.png";
import andaimeTubular from "../assets/andaime-tubular.png";
import rodizioAndaime from "../assets/rodizioAndaime.jpeg";
import escora450 from "../assets/escoras.jpeg";
import compactador from "../assets/compactador.jpeg";

type Equipment = {
  name: string;
  category: string;
  description: string;
  highlight: string;
  icon: typeof Wrench;
};

export const equipment: Equipment[] = [
  {
    name: "Betoneira 400L Menegotti",
    category: "Concretagem",
    description:
      "Equipamento para preparo de concreto em etapas que exigem produtividade e organização.",
    highlight: "Capacidade: 400 litros",
    icon: CircleDot,
  },
  {
    name: "Escora metálica 3,20 m",
    category: "Estrutura",
    description:
      "Apoio regulável para trabalhos que exigem sustentação durante a execução da obra.",
    highlight: "Altura: até 3,20 m",
    icon: Ruler,
  },
  {
    name: "Andaime tubular 1,00 × 1,50 m",
    category: "Acesso",
    description:
      "Estrutura modular para organizar o acesso e as frentes de trabalho em altura.",
    highlight: "Módulo: 1,00 × 1,50 m",
    icon: Box,
  },
  {
    name: "Martelete rompedor",
    category: "Ferramentas elétricas",
    description:
      "Ferramenta para perfuração e tarefas que pedem potência e precisão na execução.",
    highlight: "Perfuração e rompimento",
    icon: Drill,
  },
  {
    name: "Rodízio para andaime tubular",
    category: "Acessórios",
    description:
      "Complemento para movimentar a estrutura do andaime com mais praticidade na obra.",
    highlight: "Compatível com andaime tubular",
    icon: Wrench,
  },
  {
    name: "Escora metálica 4,50 m",
    category: "Estrutura",
    description:
      "Apoio regulável para sustentação de estruturas durante diferentes etapas da obra.",
    highlight: "Altura: até 4,50 m",
    icon: Ruler,
  },
  {
    name: "Compactador de solo",
    category: "Compactação",
    description:
      "Equipamento para compactar o solo e preparar a base para a execução da obra.",
    highlight: "Compactação e preparação do solo",
    icon: Wrench,
  },
];

const whatsapp = "5579999357485";
const wa = (message: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

export function EquipmentShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeEquipment = equipment[activeIndex];
  const EquipmentIcon = activeEquipment.icon;
  const activeEquipmentImage =
    activeIndex === 0
      ? betoneiraImg
      : activeIndex === 1
        ? escoraImg
        : activeIndex === 2
          ? andaimeTubular
          : activeIndex === 3
            ? marteloRompedor
            : activeIndex === 4
              ? rodizioAndaime
              : activeIndex === 5
                ? escora450
                : activeIndex === 6
                  ? compactador
                  : null;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const revealElements = section.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        revealElements.forEach((element) => {
          element.classList.add("is-visible");
        });

        observer.unobserve(entry.target);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -48px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="equipment-showcase"
      id="equipamentos"
    >
      <div className="equipment-showcase-heading reveal">
        <span className="equipment-kicker">CATÁLOGO DE LOCAÇÃO</span>
        <h2>Equipamento certo para cada etapa da sua obra.</h2>
        <p>
          Selecione uma categoria para conhecer o catálogo essencial da Moura
          Locações e consultar a disponibilidade com a equipe.
        </p>
      </div>

      <div className="equipment-experience">
        <div
          className="equipment-list reveal delay-1"
          aria-label="Lista de equipamentos"
        >
          {equipment.map((item, index) => {
            const Icon = item.icon;
            const active = activeIndex === index;

            return (
              <button
                key={item.name}
                className={`equipment-option ${active ? "is-active" : ""}`}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
              >
                <span className="equipment-option-number">0{index + 1}</span>
                <span className="equipment-option-icon">
                  <Icon size={19} />
                </span>
                <span className="equipment-option-copy">
                  <small>{item.category}</small>
                  <strong>{item.name}</strong>
                </span>
                <ArrowRight size={17} className="equipment-option-arrow" />
              </button>
            );
          })}
        </div>

        <article className="equipment-detail reveal delay-2" aria-live="polite">
          <div className="equipment-detail-surface" key={activeEquipment.name}>
            {activeEquipmentImage && (
              <img
                className="equipment-detail-photo"
                src={activeEquipmentImage}
                alt=""
                aria-hidden="true"
              />
            )}
            <div className="equipment-detail-grid" aria-hidden="true" />

            <div className="equipment-detail-top">
              <span>EM DESTAQUE</span>
              <span>
                0{activeIndex + 1} / 0{equipment.length}
              </span>
            </div>

            <div className="equipment-symbol">
              <EquipmentIcon strokeWidth={1.35} />
            </div>

            <div className="equipment-detail-copy">
              <small>{activeEquipment.category}</small>
              <h3>{activeEquipment.name}</h3>
              <p>{activeEquipment.description}</p>
            </div>

            <div className="equipment-detail-footer">
              <span>
                <ShieldCheck size={17} />
                {activeEquipment.highlight}
              </span>
              <a
                href={wa(
                  `Olá! Quero consultar disponibilidade para ${activeEquipment.name}.`,
                )}
                target="_blank"
                rel="noreferrer"
              >
                Consultar disponibilidade <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </article>
      </div>

      <div className="equipment-showcase-bottom reveal delay-2">
        <p>
          Não encontrou o que procura? Fale com a Moura Locações para verificar
          outras opções e disponibilidade.
        </p>
        <a
          className="button button-outline"
          href={wa(
            "Olá! Gostaria de conhecer todos os equipamentos disponíveis.",
          )}
          target="_blank"
          rel="noreferrer"
        >
          Verificar outros equipamentos <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}