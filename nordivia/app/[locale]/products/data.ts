// app/[locale]/products/data.ts

import type { AppLocale } from "@/i18n/locales";

export type ProductDetails = {
  indication: string;
  mechanism: string;
  benefits: string[];
};

export type LocalizedDetails = Partial<Record<AppLocale, ProductDetails>>;

export type ProductBase = {
  id: string;
  slug: string;
  name: string;
  concentration: string;
  brlCents: number;
  imagePath: string;
  leafletPath: string;
  // ✅ agora é por idioma
  details: LocalizedDetails;
};

const EMPTY_DETAILS: ProductDetails = {
  indication: "",
  mechanism: "",
  benefits: []
};

// ✅ helper: pega detalhes no idioma, com fallback para pt-br, e por fim vazio
export function getDetailsByLocale(details: LocalizedDetails | undefined, locale: AppLocale): ProductDetails {
  return (
    details?.[locale] ??
    details?.["pt-br"] ??
    details?.["en-ca"] ??
    EMPTY_DETAILS
  );
}

export const productsBase: ProductBase[] = [
  {
    id: "adipotide-5mg",
    slug: "adipotide-5mg",
    name: "Adipotide",
    concentration: "5mg",
    brlCents: 37000,
    imagePath: "/products/scenes/adipotide-5mg.jpeg",
    leafletPath: "/leaflets/adipotide-5mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Peptídeo experimental voltado ao suporte na redução de gordura corporal e otimização de parâmetros metabólicos.",
        mechanism:
          "Atua ligando-se a proteínas presentes nos vasos que irrigam o tecido adiposo, reduzindo o suprimento sanguíneo das células de gordura e favorecendo sua apoptose.",
        benefits: [
          "Auxiliar na redução de gordura corporal",
          "Contribuir para melhora do perfil metabólico",
          "Favorecer equilíbrio energético",
          "Apoiar estratégias de recomposição corporal"
        ]
      },
      "en-ca": {
        indication:
          "Experimental peptide intended to support body fat reduction and optimization of metabolic parameters.",
        mechanism:
          "Binds to proteins found in blood vessels supplying adipose tissue, reducing blood supply to fat cells and supporting apoptosis.",
        benefits: [
          "Help reduce body fat",
          "Support improvement in metabolic profile",
          "Promote energy balance",
          "Support body recomposition strategies"
        ]
      }
    }
  },

  {
    id: "follistatin-1mg",
    slug: "follistatin-1mg",
    name: "Follistatin",
    concentration: "1mg",
    brlCents: 45500,
    imagePath: "/products/scenes/follistatin-1mg.jpeg",
    leafletPath: "/leaflets/follistatin-1mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para atrofia muscular associada a denervação ou tenotomia, e potencial em distúrbios neuromusculares.",
        mechanism:
          "Inibe miostatina e ligantes TGF-β, promovendo crescimento muscular via hiperplasia e mitogênese.",
        benefits: ["Aumento de massa muscular", "Melhora na reparação tecidual", "Ganho de força"]
      },
      "en-ca": {
        indication:
          "Indicated for muscle atrophy associated with denervation or tenotomy, with potential applications in neuromuscular disorders.",
        mechanism:
          "Inhibits myostatin and TGF-β ligands, supporting muscle growth via hyperplasia and mitogenesis.",
        benefits: ["Increase in muscle mass", "Improved tissue repair", "Strength gains"]
      }
    }
  },

  {
    id: "igf-1-lr3-1mg",
    slug: "igf-1-lr3-1mg",
    name: "IGF-1 LR3",
    concentration: "1mg",
    brlCents: 49500,
    imagePath: "/products/scenes/igf-1-lr3-1mg.jpeg",
    leafletPath: "/leaflets/igf-1-lr3-1mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para deficiência de crescimento, síndrome do intestino curto e atrofia muscular relacionada a HIV.",
        mechanism:
          "Liga-se a receptores IGF-1, ativando vias PI3K/Akt e MAPK para síntese proteica e proliferação celular.",
        benefits: ["Aumento de massa muscular magra", "Redução de gordura", "Melhora na recuperação", "Regeneração da pele"]
      },
      "en-ca": {
        indication:
          "Indicated for growth deficiency, short bowel syndrome, and HIV-related muscle wasting.",
        mechanism:
          "Binds to IGF-1 receptors, activating PI3K/Akt and MAPK pathways for protein synthesis and cell proliferation.",
        benefits: ["Increase in lean muscle mass", "Fat reduction", "Improved recovery", "Skin regeneration"]
      }
    }
  },

  {
    id: "aod-9604-5mg",
    slug: "aod-9604-5mg",
    name: "AOD-9604",
    concentration: "5mg",
    brlCents: 35000,
    imagePath: "/products/scenes/aod-9604-5mg.jpeg",
    leafletPath: "/leaflets/aod-9604-5mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para suporte à redução de gordura corporal e otimização do metabolismo lipídico.",
        mechanism:
          "Fragmento modificado do hormônio do crescimento que estimula lipólise e inibe lipogênese sem interferir significativamente nos níveis de IGF-1.",
        benefits: [
          "Auxiliar na redução de gordura localizada",
          "Contribuir para melhora metabólica",
          "Apoiar estratégias de controle de peso",
          "Favorecer equilíbrio corporal"
        ]
      },
      "en-ca": {
        indication: "Indicated to support body fat reduction and optimization of lipid metabolism.",
        mechanism:
          "Modified fragment of growth hormone that stimulates lipolysis and inhibits lipogenesis without significantly affecting IGF-1 levels.",
        benefits: [
          "Help reduce localized fat",
          "Support metabolic improvement",
          "Support weight management strategies",
          "Promote overall balance"
        ]
      }
    }
  },

  {
    id: "cjc-1295-dac-5mg",
    slug: "cjc-1295-dac-5mg",
    name: "CJC-1295 With DAC",
    concentration: "5mg",
    brlCents: 38000,
    imagePath: "/products/scenes/cjc-1295-with-dac-5mg.jpeg",
    leafletPath: "/leaflets/cjc-1295-dac-5mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para suporte prolongado à produção natural de hormônio do crescimento em contextos de envelhecimento e otimização metabólica.",
        mechanism:
          "Análogo de GHRH com complexo DAC que prolonga sua meia-vida, promovendo liberação sustentada de GH pela hipófise.",
        benefits: [
          "Apoiar aumento de massa muscular magra",
          "Contribuir para redução de gordura corporal",
          "Favorecer melhora na qualidade do sono",
          "Auxiliar na recuperação física"
        ]
      },
      "en-ca": {
        indication:
          "Indicated for prolonged support of natural growth hormone production in aging and metabolic optimization contexts.",
        mechanism:
          "GHRH analogue with a DAC complex that extends its half-life, promoting sustained GH release from the pituitary.",
        benefits: [
          "Support lean muscle mass increase",
          "Help reduce body fat",
          "Improve sleep quality",
          "Assist physical recovery"
        ]
      }
    }
  },

  {
    id: "cjc-1295-10mg",
    slug: "cjc-1295-10mg",
    name: "CJC-1295 Without DAC",
    concentration: "10mg",
    brlCents: 38000,
    imagePath: "/products/scenes/cjc-1295-without-dac-10mg.jpeg",
    leafletPath: "/leaflets/cjc-1295-10mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para estímulo fisiológico e pulsátil da produção de hormônio do crescimento.",
        mechanism:
          "Análogo de GHRH de curta duração que promove liberação natural e controlada de GH pela hipófise.",
        benefits: [
          "Apoiar ganho de massa magra",
          "Contribuir para redução de gordura",
          "Favorecer recuperação muscular",
          "Auxiliar na manutenção da densidade óssea"
        ]
      },
      "en-ca": {
        indication: "Indicated for physiological, pulsatile stimulation of growth hormone production.",
        mechanism:
          "Short-acting GHRH analogue that promotes natural and controlled GH release from the pituitary.",
        benefits: [
          "Support lean mass gain",
          "Help reduce fat",
          "Support muscle recovery",
          "Help maintain bone density"
        ]
      }
    }
  },

  {
    id: "ghk-cu-100mg",
    slug: "ghk-cu-100mg",
    name: "GHK-CU",
    concentration: "100mg",
    brlCents: 32500,
    imagePath: "/products/scenes/ghk-cu-100mg.jpeg",
    leafletPath: "/leaflets/ghk-cu-100mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para reparo tecidual, rejuvenescimento da pele, cicatrização de feridas e suporte em inflamação crônica.",
        mechanism:
          "Liga-se a íons de cobre e modula expressão gênica, estimulando síntese de colágeno/elastina e reduzindo estresse oxidativo.",
        benefits: ["Melhora na cicatrização", "Redução de inflamação", "Reparo de DNA", "Suporte à “limpeza” celular (proteassoma)"]
      },
      "en-ca": {
        indication:
          "Indicated for tissue repair, skin rejuvenation, wound healing, and support in chronic inflammation contexts.",
        mechanism:
          "Binds to copper ions and modulates gene expression, stimulating collagen/elastin synthesis and reducing oxidative stress.",
        benefits: ["Improved healing", "Reduced inflammation", "DNA repair", "Support for cellular “cleanup” (proteasome)"]
      }
    }
  },

  {
    id: "glow-70mg",
    slug: "glow-70mg",
    name: "GLOW",
    concentration: "70mg",
    brlCents: 52000,
    imagePath: "/products/scenes/glow-70mg.jpeg",
    leafletPath: "/leaflets/glow-70mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Blend de peptídeos desenvolvido para suporte à recuperação tecidual e controle inflamatório em contextos musculares e cutâneos.",
        mechanism:
          "Combina BPC-157 e TB-500, que favorecem angiogênese e regeneração celular, com GHK-Cu, que estimula síntese de colágeno e modulação inflamatória.",
        benefits: ["Acelerar recuperação de lesões", "Reduzir processos inflamatórios", "Estimular regeneração da pele", "Apoiar mobilidade e reparo muscular"]
      },
      "en-ca": {
        indication:
          "Peptide blend developed to support tissue recovery and inflammatory control in muscular and skin-related contexts.",
        mechanism:
          "Combines BPC-157 and TB-500, which support angiogenesis and cellular regeneration, with GHK-Cu, which stimulates collagen synthesis and inflammatory modulation.",
        benefits: ["Speed up injury recovery", "Reduce inflammatory processes", "Support skin regeneration", "Support mobility and muscle repair"]
      }
    }
  },

  {
    id: "hcg-10000ui",
    slug: "hcg-10000ui",
    name: "HCG",
    concentration: "10.000ui",
    brlCents: 39000,
    imagePath: "/products/scenes/hcg-10000ui.jpeg",
    leafletPath: "/leaflets/hcg-10000ui.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para infertilidade, baixa contagem de esperma e criptorquidia em crianças.",
        mechanism: "Mimetiza LH, promovendo produção de testosterona e esteroides gonadais.",
        benefits: [
          "Aumento de fertilidade",
          "Suporte à produção hormonal",
          "Suporte à manutenção de gravidez e progesterona (contextos clínicos)"
        ]
      },
      "en-ca": {
        indication: "Indicated for infertility, low sperm count, and cryptorchidism in children.",
        mechanism: "Mimics LH, promoting testosterone production and gonadal steroidogenesis.",
        benefits: [
          "Improved fertility",
          "Support for hormone production",
          "Support for pregnancy maintenance and progesterone (clinical contexts)"
        ]
      }
    }
  },

  {
    id: "hgh-fragment-5mg",
    slug: "hgh-fragment-5mg",
    name: "HGH Fragment 176-191",
    concentration: "5mg",
    brlCents: 33000,
    imagePath: "/products/scenes/hgh-fragment-176-191-5mg.jpeg",
    leafletPath: "/leaflets/hgh-fragment-5mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para redução de gordura localizada e suporte metabólico.",
        mechanism: "Fragmento C-terminal de HGH que promove lipólise e utilização de gordura.",
        benefits: ["Redução de gordura", "Melhora na composição corporal", "Potencial suporte em reparo tecidual"]
      },
      "en-ca": {
        indication: "Indicated for localized fat reduction and metabolic support.",
        mechanism: "C-terminal HGH fragment that promotes lipolysis and fat utilization.",
        benefits: ["Fat reduction", "Improved body composition", "Potential support for tissue repair"]
      }
    }
  },

  {
    id: "ipamorelin-10mg",
    slug: "ipamorelin-10mg",
    name: "Ipamorelin",
    concentration: "10mg",
    brlCents: 32500,
    imagePath: "/products/scenes/ipamorelin-10mg.jpeg",
    leafletPath: "/leaflets/ipamorelin-10mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para suporte à produção endógena de hormônio do crescimento e otimização da composição corporal.",
        mechanism:
          "Agonista seletivo do receptor de grelina que estimula liberação pulsátil de GH sem impacto significativo sobre cortisol ou prolactina.",
        benefits: [
          "Apoiar aumento de massa muscular magra",
          "Contribuir para redução de gordura",
          "Favorecer melhora na qualidade do sono",
          "Auxiliar na recuperação pós-treino"
        ]
      },
      "en-ca": {
        indication:
          "Indicated to support endogenous growth hormone production and optimization of body composition.",
        mechanism:
          "Selective ghrelin receptor agonist that stimulates pulsatile GH release with minimal impact on cortisol or prolactin.",
        benefits: [
          "Support lean muscle mass increase",
          "Help reduce fat",
          "Improve sleep quality",
          "Assist post-workout recovery"
        ]
      }
    }
  },

  {
    id: "klow-80mg",
    slug: "klow-80mg",
    name: "KLOW",
    concentration: "80mg",
    brlCents: 52000,
    imagePath: "/products/scenes/klow-80mg.jpeg",
    leafletPath: "/leaflets/klow-80mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Blend (GHK-Cu, KPV, BPC-157 e TB-500) indicado para controle de inflamação, reparo tecidual e recuperação de lesões.",
        mechanism:
          "Ativa vias como VEGF (angiogênese), modulação de actina (migração celular), regulação de TGF-β (colágeno) e redução de inflamação sistêmica (KPV).",
        benefits: [
          "Recuperação mais rápida de lesões e treinos",
          "Redução de dor e inflamação",
          "Aumento de energia",
          "Melhora na saúde da pele e cabelo",
          "Suporte à saúde intestinal"
        ]
      },
      "en-ca": {
        indication:
          "Blend (GHK-Cu, KPV, BPC-157 and TB-500) indicated for inflammation control, tissue repair, and injury recovery.",
        mechanism:
          "Activates pathways such as VEGF (angiogenesis), actin modulation (cell migration), TGF-β regulation (collagen), and reduction of systemic inflammation (KPV).",
        benefits: [
          "Faster recovery from injuries and training",
          "Reduced pain and inflammation",
          "Increased energy",
          "Improved skin and hair health",
          "Support for gut health"
        ]
      }
    }
  },

  {
    id: "lemon-bottle-10mg",
    slug: "lemon-bottle-10mg",
    name: "Lemon Bottle",
    concentration: "10mg",
    brlCents: 30500,
    imagePath: "/products/scenes/lemon-bottle-10mg.jpeg",
    leafletPath: "/leaflets/lemon-bottle-10mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para redução localizada de gordura e celulite em áreas como queixo, abdômen e coxas.",
        mechanism:
          "Lipólise via enzimas (bromelina, riboflavina, lecitina) que quebram células de gordura e facilitam eliminação linfática.",
        benefits: ["Redução de gordura localizada", "Melhora na textura da pele", "Aumento de firmeza"]
      },
      "en-ca": {
        indication:
          "Indicated for localized fat reduction and cellulite support in areas such as the chin, abdomen, and thighs.",
        mechanism:
          "Enzyme-driven lipolysis (bromelain, riboflavin, lecithin) that breaks down fat cells and supports lymphatic clearance.",
        benefits: ["Reduced localized fat", "Improved skin texture", "Increased firmness"]
      }
    }
  },

  {
    id: "mots-c-40mg",
    slug: "mots-c-40mg",
    name: "MOTS-c",
    concentration: "40mg",
    brlCents: 49500,
    imagePath: "/products/scenes/mots-c-40mg.jpeg",
    leafletPath: "/leaflets/mots-c-40mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para regulação metabólica em condições como diabetes, obesidade e envelhecimento relacionado a estresse.",
        mechanism:
          "Ativa a via Folato-AICAR-AMPK, regulando metabolismo energético, sensibilidade à insulina e resposta inflamatória.",
        benefits: ["Melhora no metabolismo de glicose", "Redução de inflamação", "Ativação de tecido adiposo marrom", "Proteção neuronal"]
      },
      "en-ca": {
        indication:
          "Indicated for metabolic regulation in conditions such as diabetes, obesity, and stress-related aging.",
        mechanism:
          "Activates the Folate–AICAR–AMPK pathway, regulating energy metabolism, insulin sensitivity, and inflammatory response.",
        benefits: ["Improved glucose metabolism", "Reduced inflammation", "Activation of brown adipose tissue", "Neuronal protection"]
      }
    }
  },

  {
    id: "pinealon-20mg",
    slug: "pinealon-20mg",
    name: "Pinealon",
    concentration: "20mg",
    brlCents: 34500,
    imagePath: "/products/scenes/pinealon-20mg.jpeg",
    leafletPath: "/leaflets/pinealon-20mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para suporte cerebral, regulação circadiana e neuroproteção em envelhecimento ou estresse cognitivo.",
        mechanism:
          "Restaura função da glândula pineal, modulando expressão gênica associada ao metabolismo neuronal e resistência ao estresse oxidativo.",
        benefits: ["Melhora da função cognitiva", "Regulação do sono", "Redução de estresse oxidativo", "Suporte à plasticidade cerebral"]
      },
      "en-ca": {
        indication:
          "Indicated for brain support, circadian regulation, and neuroprotection in aging or cognitive stress contexts.",
        mechanism:
          "Supports restoration of pineal gland function, modulating gene expression related to neuronal metabolism and oxidative-stress resilience.",
        benefits: ["Improved cognitive function", "Sleep regulation", "Reduced oxidative stress", "Support for brain plasticity"]
      }
    }
  },

  {
    id: "pt-141-10mg",
    slug: "pt-141-10mg",
    name: "PT-141",
    concentration: "10mg",
    brlCents: 29000,
    imagePath: "/products/scenes/pt-141-10mg.jpeg",
    leafletPath: "/leaflets/pt-141-10mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para disfunção sexual hipoativa em mulheres pré-menopáusicas e potencial em homens com disfunção erétil.",
        mechanism:
          "Agonista de receptores de melanocortina (MC3R/MC4R), ativando vias centrais associadas ao desejo sexual.",
        benefits: ["Aumento do desejo sexual", "Melhora da excitação", "Aumento da satisfação"]
      },
      "en-ca": {
        indication:
          "Indicated for hypoactive sexual dysfunction in premenopausal women, with potential use in men with erectile dysfunction.",
        mechanism:
          "Melanocortin receptor agonist (MC3R/MC4R), activating central pathways associated with sexual desire.",
        benefits: ["Increased sexual desire", "Improved arousal", "Increased satisfaction"]
      }
    }
  },

  {
    id: "retatrutide-60mg",
    slug: "retatrutide-60mg",
    name: "Retatrutide",
    concentration: "60mg",
    brlCents: 276000,
    imagePath: "/products/scenes/retatrutide-60mg.jpeg",
    leafletPath: "/leaflets/retatrutide-60mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para manejo de obesidade, diabetes tipo 2 e doença hepática gordurosa não alcoólica.",
        mechanism:
          "Agonista triplo de GLP-1, GIP e glucagon, promovendo homeostase glicêmica e modulação de apetite.",
        benefits: ["Redução substancial de peso corporal", "Melhora na sensibilidade à insulina", "Melhora no controle glicêmico"]
      },
      "en-ca": {
        indication:
          "Indicated for the management of obesity, type 2 diabetes, and non-alcoholic fatty liver disease.",
        mechanism:
          "Triple agonist of GLP-1, GIP, and glucagon, supporting glycemic homeostasis and appetite modulation.",
        benefits: ["Substantial body weight reduction", "Improved insulin sensitivity", "Improved glycemic control"]
      }
    }
  },

  {
    id: "slu-pp-332-5mg",
    slug: "slu-pp-332-5mg",
    name: "SLU-PP-332",
    concentration: "5mg",
    brlCents: 45500,
    imagePath: "/products/scenes/slu-pp-332-5mg.jpeg",
    leafletPath: "/leaflets/slu-pp-332-5mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para mimetismo de exercício em obesidade e distúrbios metabólicos.",
        mechanism: "Agonista de receptores ERR, aumentando gasto energético e oxidação de ácidos graxos.",
        benefits: ["Redução de massa gorda", "Melhora do metabolismo", "Melhora de endurance"]
      },
      "en-ca": {
        indication: "Indicated for exercise mimetic support in obesity and metabolic disorders.",
        mechanism: "ERR receptor agonist, increasing energy expenditure and fatty acid oxidation.",
        benefits: ["Reduced fat mass", "Improved metabolism", "Improved endurance"]
      }
    }
  },

  {
    id: "ss-31-10mg",
    slug: "ss-31-10mg",
    name: "SS-31",
    concentration: "10mg",
    brlCents: 69000,
    imagePath: "/products/scenes/ss-31-10mg.jpeg",
    leafletPath: "/leaflets/ss-31-10mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para proteção mitocondrial em insuficiência cardíaca, miopatia mitocondrial e envelhecimento.",
        mechanism:
          "Liga-se à cardiolipina na membrana mitocondrial interna, estabilizando a estrutura e reduzindo estresse oxidativo.",
        benefits: ["Melhora da função mitocondrial", "Redução de inflamação", "Suporte cognitivo", "Proteção contra envelhecimento muscular"]
      },
      "en-ca": {
        indication:
          "Indicated for mitochondrial protection in heart failure, mitochondrial myopathy, and aging.",
        mechanism:
          "Binds to cardiolipin in the inner mitochondrial membrane, stabilizing structure and reducing oxidative stress.",
        benefits: ["Improved mitochondrial function", "Reduced inflammation", "Cognitive support", "Protection against muscular aging"]
      }
    }
  },

  {
    id: "tesamorelin-10mg",
    slug: "tesamorelin-10mg",
    name: "Tesamorelin",
    concentration: "10mg",
    brlCents: 47500,
    imagePath: "/products/scenes/tesamorelin-10mg.jpeg",
    leafletPath: "/leaflets/tesamorelin-10mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para suporte à redução de gordura visceral e melhora da composição corporal.",
        mechanism:
          "Análogo do hormônio liberador de crescimento (GHRH) que estimula a secreção de GH, favorecendo lipólise e metabolismo energético.",
        benefits: [
          "Auxiliar na redução de gordura visceral",
          "Contribuir para melhora metabólica",
          "Apoiar ganho de massa magra",
          "Favorecer equilíbrio hormonal"
        ]
      },
      "en-ca": {
        indication: "Indicated to support visceral fat reduction and improved body composition.",
        mechanism:
          "Growth hormone–releasing hormone (GHRH) analogue that stimulates GH secretion, supporting lipolysis and energy metabolism.",
        benefits: ["Help reduce visceral fat", "Support metabolic improvement", "Support lean mass gain", "Promote hormonal balance"]
      }
    }
  },

  {
    id: "thymosin-alpha1-10mg",
    slug: "thymosin-alpha1-10mg",
    name: "Thymosin Alpha1",
    concentration: "10mg",
    brlCents: 31500,
    imagePath: "/products/scenes/thymosin-alpha1-10mg.jpeg",
    leafletPath: "/leaflets/thymosin-alpha1-10mg.pdf",
    details: {
      "pt-br": {
        indication: "Indicado para hepatite B e C, imunodeficiências e como adjuvante em vacinas.",
        mechanism:
          "Estimula sistema imunológico via TLR e vias como IRF3/NF-κB, promovendo proliferação de células T e NK.",
        benefits: ["Aumento de resposta imunológica", "Redução de morbidade em infecções", "Suporte antiproliferativo"]
      },
      "en-ca": {
        indication: "Indicated for hepatitis B and C, immunodeficiencies, and as a vaccine adjuvant.",
        mechanism:
          "Stimulates the immune system via TLRs and pathways such as IRF3/NF-κB, supporting T-cell and NK-cell proliferation.",
        benefits: ["Increased immune response", "Reduced morbidity in infections", "Antiproliferative support"]
      }
    }
  },

  {
    id: "tirzepatide-60mg",
    slug: "tirzepatide-60mg",
    name: "Tirzepatide",
    concentration: "60mg",
    brlCents: 200000,
    imagePath: "/products/scenes/tirzepatide-60mg.jpeg",
    leafletPath: "/leaflets/tirzepatide-60mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para controle glicêmico em diabetes tipo 2, perda de peso em obesidade e manejo de apneia do sono obstrutiva.",
        mechanism:
          "Agonista duplo GLP-1 e GIP: aumenta secreção de insulina, reduz glucagon e retarda esvaziamento gástrico.",
        benefits: ["Perda significativa de peso", "Melhora no controle glicêmico", "Redução de apetite", "Melhora no perfil lipídico"]
      },
      "en-ca": {
        indication:
          "Indicated for glycemic control in type 2 diabetes, weight loss in obesity, and management of obstructive sleep apnea.",
        mechanism:
          "Dual GLP-1 and GIP agonist: increases insulin secretion, reduces glucagon, and slows gastric emptying.",
        benefits: ["Significant weight loss", "Improved glycemic control", "Reduced appetite", "Improved lipid profile"]
      }
    }
  },

  {
    id: "tirzepatide-15mg",
    slug: "tirzepatide-15mg",
    name: "Tirzepatide",
    concentration: "15mg",
    brlCents: 56000,
    imagePath: "/products/scenes/tirzepatide-15mg.jpeg",
    leafletPath: "/leaflets/tirzepatide-15mg.pdf",
    details: {
      "pt-br": {
        indication:
          "Indicado para controle glicêmico em diabetes tipo 2, perda de peso em obesidade e manejo de apneia do sono obstrutiva.",
        mechanism:
          "Agonista duplo GLP-1 e GIP: aumenta secreção de insulina, reduz glucagon e retarda esvaziamento gástrico.",
        benefits: ["Perda significativa de peso", "Melhora no controle glicêmico", "Redução de apetite", "Melhora no perfil lipídico"]
      },
      "en-ca": {
        indication:
          "Indicated for glycemic control in type 2 diabetes, weight loss in obesity, and management of obstructive sleep apnea.",
        mechanism:
          "Dual GLP-1 and GIP agonist: increases insulin secretion, reduces glucagon, and slows gastric emptying.",
        benefits: ["Significant weight loss", "Improved glycemic control", "Reduced appetite", "Improved lipid profile"]
      }
    }
  }
];

productsBase.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));

export function getProductBySlug(slug: string) {
  return productsBase.find((p) => p.slug === slug);
}

export function getAllSlugs() {
  return productsBase.map((p) => p.slug);
}