export const PayloadMenuPrincipal = {
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "👩‍💻 Atendente virtual"
      },
      body: {
        text: `Olá nome_cliente seja bem vindo(a) a Matos Tecnologia, será um prazer te ajudar `
      },
      footer: {
        text: "Selecione a opção desejada ⬇️"
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "opcao_1",
              title: "Solicitar orçamento"
            }
          },
          {
            type: "reply",
            reply: {
              id: "opcao_2",
              title: "Nossos serviços"
            }
          },
          {
            type: "reply",
            reply: {
              id: "opcao_3",
              title: "Nossa história"
            }
          }
        ]
      }
    }
  };