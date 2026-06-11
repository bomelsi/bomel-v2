"use client";

import React from "react";
import { SOCIALS, WHATSAPP_URL } from "@/lib/site";

interface SocialItem {
  nombre: string;
  clase: string;
  url: string;
  path: string;
}

const REDES: SocialItem[] = [
  {
    nombre: "Instagram",
    clase: "instagram",
    url: SOCIALS.instagram,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    nombre: "Facebook",
    clase: "facebook",
    url: SOCIALS.facebook,
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    nombre: "TikTok",
    clase: "tiktok",
    url: SOCIALS.tiktok,
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    nombre: "LinkedIn",
    clase: "linkedin",
    url: SOCIALS.linkedin,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    nombre: "WhatsApp",
    clase: "whatsapp",
    url: WHATSAPP_URL,
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z",
  },
];

const SocialConnect = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 font-sans">
      <div className="mx-auto mb-14 w-full max-w-3xl text-center">
        <h2 className="font-heading mb-6 text-4xl font-bold md:text-6xl">
          <span className="bg-gradient-to-r from-brand-bright via-brand to-brand-strong bg-clip-text text-transparent">
            Conecta
          </span>{" "}
          <span className="text-white">con BOMEL</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Nuestro trabajo habla en cada publicación: proyectos reales y avances
          en tiempo real. Síguenos, y cuando estés listo para construir,
          escríbenos.
        </p>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Contenedor 3D con resplandor teal de marca */}
        <div
          className="overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-[#0c1a18]/90 to-[#060d0c]/95 p-4 sm:p-8 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:scale-105"
          style={{
            boxShadow:
              "0 0 50px rgba(45, 212, 191, 0.25), 0 0 80px rgba(15, 118, 110, 0.2)",
          }}
        >
          <div className="flex flex-nowrap justify-center gap-2 sm:gap-8">
            {REDES.map((red) => (
              <a
                key={red.nombre}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon ${red.clase}`}
                aria-label={`BOMEL en ${red.nombre}`}
              >
                <div className="icon-container">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d={red.path} />
                  </svg>
                </div>
                <span className="icon-label">{red.nombre}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .social-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .icon-container {
          display: inline-flex;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          transition: all 0.3s ease;
          position: relative;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-icon:hover .icon-container {
          transform: translateY(-10px) scale(1.1);
        }

        .social-icon:hover .icon-label {
          opacity: 1;
          transform: translateY(5px);
        }

        .icon-label {
          margin-top: 12px;
          color: #eef7f5;
          font-weight: 500;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        /* Móvil: los 5 botones deben caber en una sola fila */
        @media (max-width: 639px) {
          .icon-container {
            width: 48px;
            height: 48px;
          }

          .social-icon svg {
            width: 20px;
            height: 20px;
          }

          .icon-label {
            margin-top: 8px;
            font-size: 10px;
          }
        }

        .social-icon.instagram:hover .icon-container {
          background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          box-shadow: 0 0 20px rgba(225, 48, 108, 0.6);
        }

        .social-icon.facebook:hover .icon-container {
          background: #1877f2;
          box-shadow: 0 0 20px rgba(24, 119, 242, 0.6);
        }

        .social-icon.tiktok:hover .icon-container {
          background: #0f0f0f;
          box-shadow: 0 0 20px rgba(37, 244, 238, 0.5);
        }

        .social-icon.linkedin:hover .icon-container {
          background: #0077b5;
          box-shadow: 0 0 20px rgba(0, 119, 181, 0.6);
        }

        .social-icon.whatsapp:hover .icon-container {
          background: #25d366;
          box-shadow: 0 0 20px rgba(37, 211, 102, 0.6);
        }

        .social-icon:hover svg {
          animation: social-shake 0.5s;
        }

        @keyframes social-shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-5px) rotate(-5deg); }
          40% { transform: translateX(5px) rotate(5deg); }
          60% { transform: translateX(-5px) rotate(-5deg); }
          80% { transform: translateX(5px) rotate(5deg); }
        }

        .icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(45, 212, 191, 0.35) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .social-icon:hover .icon-container::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export { SocialConnect };
