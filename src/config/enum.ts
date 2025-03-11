export enum TipoMensagem {
    Midia = 'M',
    Texto = 'T'
}

export enum TipoRemetente{
    Atendente = "A",
    Cliente = "C"
};

export enum SituacaoAtendimento {
    NovaMensagem = 0,
    AtendimentoEncerrado = 1,
    TiposServicos = 2,
    PedidoSAEC = 3,
    VerificaEncerrarAtendimento = 4,
    TransferidoAtendente = 9
};
