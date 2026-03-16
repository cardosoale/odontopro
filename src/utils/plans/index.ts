export type PlanDetailsProps = {
  maxServices: number;
};

export type PlanProps = {
  TRIAL: PlanDetailsProps;
  BASIC: PlanDetailsProps;
  PROFESSIONAL: PlanDetailsProps;
};

export const PLANS: PlanProps = {
  TRIAL: {
    // limite para usuários em trial — altere conforme necessário
    maxServices: 3,
  },
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Basic",
    description: "Perfeito para clinicas pequenas",
    oldPrice: "R$97,90",
    price: "R$27,90",
    features: [
      `Até ${PLANS["BASIC"].maxServices} serviços`,
      "Agendamentos ilimitados",
      "Suporte",
      "Relatórios básicos",
    ],
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    description: "Perfeito para clinicas pequenas",
    oldPrice: "R$197,90",
    price: "R$97,90",
    features: [
      `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
      "Agendamentos ilimitados",
      "Suporte prioritário",
      "Relatórios avançados",
    ],
  },
];
