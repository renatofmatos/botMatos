export enum TipoRemetente{
    Atendente = "A",
    Cliente = "C"
};

export enum SituacaoAtendimento {
    AtendimentoEncerrado = 0,
    EncaminhadoMenuAtendimento = 1,
    InicioAtendimento = 2,
    AguardandoRelatoOrcamento = 3,
    ConhecerHistoria = 4,
    ConhecerProdutos = 5,
    VerificaEncerrarAtendimento = 6,
    TransferidoAtendente = 9
};

export enum RespostaMenu {
    Orcamento = 'Solicitar um orçamento',
    Produtos = 'Conhecer nossos produtos',
    Historia = 'Conhecer nossa história'
};

export enum TipoConteudoMensagem {
    menuPrincipal = 'menuPrincipal',
    texto = 'text',
    statusRead = 'read'
};

export enum Template {
    MenuPrincipal = 'menu_principal'
};