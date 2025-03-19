import { RespostaMenu, SituacaoAtendimento } from "./enum";

export const PayloadMenuPrincipal = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "👩‍💻 Atendente virtual"
      },
      body: {
        text: `Olá {{nome_cliente}} seja bem vindo(a) a Matos Tecnologia, será um prazer te ajudar `
      },
      footer: {
        text: "Selecione a opção desejada ⬇️"
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: RespostaMenu.Orcamento,
              title: "Solicitar orçamento"
            }
          },
          {
            type: "reply",
            reply: {
              id: RespostaMenu.Servicos,
              title: "Nossos serviços"
            }
          },
          {
            type: "reply",
            reply: {
              id: RespostaMenu.Historia,
              title: "Nossa história"
            }
          }
        ]
      }
    }
  };

  export const TextoServicos = `A Matos Tecnologia oferece soluções personalizadas para otimizar e automatizar processos em empresas de diversos segmentos. Nossos principais serviços incluem:

✅ Desenvolvimento de Software: Sistemas sob medida para web, desktop e mobile, focados em alta performance e usabilidade.
✅ Automação e Chatbots: Criação de robôs para WhatsApp e outras plataformas, agilizando o atendimento e tarefas repetitivas.
✅ Banco de Dados e Processamento de Alto Volume: Otimização de consultas, estruturação de dados e desenvolvimento de soluções escaláveis em Oracle, SQL Server e PostgreSQL.
✅ Integrações e APIs: Conexão entre sistemas, ERPs e serviços de terceiros para uma operação mais eficiente.
✅ Dashboards e BI: Análise de dados e construção de relatórios inteligentes para tomada de decisão.
✅ Tratamento e Mineração de Dados: Extração, limpeza, estruturação e análise de dados em diversos formatos de arquivos e bancos de dados.

Se precisa de uma solução para seu negócio, fale comigo! 🚀`

export const TextoHistoria = `*Sobre a Matos Tecnologia*

A Matos Tecnologia nasceu da minha paixão por desenvolvimento de software e automação.
Com mais de 10 anos de experiência, ajudo empresas a otimizar processos com soluções personalizadas, desde sistemas de alto desempenho até pequenos robôs para automatizar rotinas.
Trabalhei em projetos críticos, como automação de processos eleitorais e implantação de ERPs, sempre focando em performance, inovação e usabilidade.
Se precisar de algo sob medida para o seu negócio, estou à disposição! 🚀`