import "./social-section.css";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  AtSign,
  Play,
} from "lucide-react";

const instagramUrl = "https://instagram.com/_mouralocacoes";

const posts = [
  {
    image: "/assets/instagram-reel-01.jpg",
    url: "https://www.instagram.com/reel/DaxUDisxQv4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    alt: "Entrega de equipamentos da Moura Locações",
    label: "Acompanhe as entregas",
    format: "reel",
  },
  {
    image: "/assets/instagram-post-01.jpg",
    url: "https://www.instagram.com/p/SEU_CODIGO_AQUI/",
    alt: "Equipamentos disponíveis na Moura Locações",
    label: "Equipamentos para sua obra",
    format: "post",
  },
  {
    image: "/assets/instagram-post-03.jpg",
    url: "https://www.instagram.com/p/SEU_CODIGO_AQUI/",
    alt: "Conteúdo da Moura Locações",
    label: "Dicas para locar melhor",
    format: "post",
  },
  {
    image: "/assets/instagram-post-04.jpg",
    url: "https://www.instagram.com/reel/SEU_CODIGO_AQUI/",
    alt: "Novidades da Moura Locações",
    label: "Novidades da Moura",
    format: "reel",
  },
];

export function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="social-section" ref={sectionRef} id="instagram">
      <div className="social-content">
        <div className="social-gallery reveal">
          <div className="social-gallery-heading">
            <p>
              <AtSign size={16} /> ACOMPANHE NO INSTAGRAM
            </p>
            <h2>
              Obra em movimento,
              <br />
              conteúdo de verdade.
            </h2>
          </div>

          <div className="social-post-grid">
            {posts.map((post, index) => (
              <a
                className={`social-post social-post-${index + 1}`}
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                key={post.label}
                aria-label={`${post.label}: abrir Instagram da Moura Locações`}
              >
                <img src={post.image} alt={post.alt} loading="lazy" />
                <span className="social-post-shade" />

                {post.format === "reel" && (
                  <span className="social-play">
                    <Play size={17} fill="currentColor" />
                  </span>
                )}

                <span className="social-post-label">{post.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="social-callout reveal delay-2">
          <div className="social-orbit social-orbit-one" aria-hidden="true" />
          <div className="social-orbit social-orbit-two" aria-hidden="true" />

          <img
            className="social-logo"
            src="/assets/logo-moura.jpg"
            alt="Logotipo da Moura Locações"
          />

          <p className="social-kicker">
            <AtSign size={17} /> _mouralocacoes
          </p>

          <h2>
            Fique por dentro
            <br />
            da <em>Moura.</em>
          </h2>

          <p className="social-description">
            Equipamentos, entregas e conteúdos para ajudar sua obra a seguir em
            frente.
          </p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="social-button"
          >
            Seguir no Instagram <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}