import {
  Box,
  CircleDot,
  Drill,
  Ruler,
  Wrench,
} from "lucide-react";

export type Equipment = {
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
