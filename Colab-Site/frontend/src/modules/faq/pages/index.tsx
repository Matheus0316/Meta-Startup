import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Qual o prazo para ingressar com ação trabalhista após a demissão?",
      answer: "O prazo prescricional para ações trabalhistas é de cinco anos para os trabalhadores urbanos e rurais, contados da extinção do contrato de trabalho, limitado a dois anos após a extinção do contrato (prescrição total). É importante consultar um especialista para análise específica do seu caso."
    },
    {
      question: "Como identificar se tenho direito ao adicional de insalubridade?",
      answer: "O adicional de insalubridade é devido quando o trabalhador exerce atividades em condições prejudiciais à saúde, conforme classificação do Ministério do Trabalho. A identificação requer análise técnica das condições de trabalho e da função exercida, considerando laudos periciais quando necessário."
    },
    {
      question: "Quais documentos são necessários para uma ação trabalhista?",
      answer: "Geralmente são necessários: carteira de trabalho, contratos de trabalho, recibos de pagamento, extratos bancários, documentos pessoais, e qualquer documentação que comprove a relação de trabalho e os direitos pleiteados. A documentação específica varia conforme o tipo de ação."
    },
    {
      question: "Como empresas podem prevenir ações trabalhistas?",
      answer: "A prevenção envolve: manter documentação trabalhista em ordem, cumprir rigorosamente as obrigações legais, investir em treinamento de gestores, realizar auditorias trabalhistas periódicas, e estabelecer canais de comunicação eficazes com colaboradores. A consultoria preventiva é fundamental."
    },
    {
      question: "Qual a diferença entre aviso prévio trabalhado e indenizado?",
      answer: "O aviso prévio trabalhado é cumprido normalmente, com o empregado permanecendo em atividade por 30 dias. O indenizado substitui esse período por pagamento em dinheiro, permitindo o desligamento imediato. Ambos garantem os mesmos direitos, diferindo apenas na forma de cumprimento."
    }
  ];

  return (
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-6">
            Dúvidas Frequentes em Direito Trabalhista
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Esclarecemos as principais questões sobre direitos trabalhistas com base 
            na legislação vigente e jurisprudência consolidada.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card card-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-primary hover:text-primary/80 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-primary/5 px-6 py-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Importante:</strong> As informações apresentadas têm caráter geral e informativo. 
              Cada caso possui particularidades que devem ser analisadas individualmente por profissional especializado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
