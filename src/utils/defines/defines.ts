export enum Dimension {
    "Eficiência" = 1,
    "Eficácia"
}

export enum Garret {
    "Necessidades do Usuário" = 1,
    "Especificações Funcionais",
    "Design de Interação",
    "Design de Interface",
    "Design de Informação",
    "Objetivos do produto",
    "Requisitos de Conteúdo",
    "Arquitetura da Informação",
    "Design de Navegação",
    "Design Visual"
}


export const DescriptionRelation = {
    "Eficiência": {
        "Necessidades do Usuário": "Relacione as ações que buscam atender às expectativas do usuário, utilizando metáforas e representações familiares.",
        "Objetivos do Produto": `Ações focadas em manter o usuário ciente do estado atual do sistema.`,
        "Especificações Funcionais": `Priorize ações que permitam o uso adaptado do sistema para diferentes contextos ou usuários experientes.`,
        "Requisitos de Conteúdo": `Promova ações que evitem erros, garantindo consistência e integridade de dados.`,
        "Design de Interação": `Enfatize ações que dão autonomia ao usuário para corrigir erros ou alterar suas escolhas.`,
        "Arquitetura da Informação": `Direcione ações que garantam a usabilidade por meio de padrões familiares.`,
        "Design de Interface": `Concentre-se em ações que permitam ao usuário encontrar
            informações rapidamente, sem a necessidade de memorização prévia.`,
        "Design de Navegação": `Ações que facilitem a recuperação após erros no fluxo de
            navegação.`,
        "Design de Informação": `Ações associadas à busca por orientação ou suporte técnico.`,
        "Design Visual": `Priorização de ações que tornem a interface limpa e
            funcional.`
    },
    "Eficácia": {
        "Necessidades do Usuário": `Relacione as ações que garantem que o sistema atenda às
            necessidades do usuário de forma clara e intuitiva, utilizando linguagem
            familiar, representações do mundo real e mantendo o usuário informado
            sobre o status do sistema.`,
        "Objetivos do Produto": `Garanta que o sistema permita alcançar os objetivos do
            produto de forma eficaz, seguindo consistência e padrões para
            proporcionar uma experiência uniforme e previsível ao usuário`,
        "Especificações Funcionais": `Garanta que as especificações funcionais do sistema
            permitam atingir a eficácia, prevenindo erros e oferecendo mecanismos
            claros para que os usuários possam reconhecer, diagnosticar e se
            recuperar de possíveis falhas.`,
        "Requisitos de Conteúdo": `Garanta que os requisitos de conteúdo do sistema apoiem a
            eficácia, priorizando o reconhecimento em vez da lembrança, para
            facilitar a interação e reduzir a carga cognitiva do usuário.`,
        "Design de Interação": `Garanta que o design de interação do sistema promova a
            eficácia, oferecendo flexibilidade e eficiência de uso, além de
            proporcionar controle e liberdade ao usuário durante a interação.`,
        "Arquitetura da Informação": `Garanta que a arquitetura da informação do sistema promova
            a eficácia, facilitando o reconhecimento em vez da lembrança, para que
            os usuários localizem informações de forma intuitiva e eficiente.`,
        "Design de Interface": `Garanta que o design da interface contribua para a eficácia,
            utilizando uma estética clara e um design minimalista que priorize
            elementos essenciais e evite informações desnecessárias.`,
        "Design de Navegação": `Garanta que o design de navegação promova a eficácia,
            utilizando correspondência com o mundo real e mantendo consistência e
            padrões para facilitar a compreensão e a usabilidade do sistema.`,
        "Design de Informação": `Garanta que o design de informação promova a eficácia,
            oferecendo suporte para que os usuários reconheçam, diagnostiquem e
            recuperem de erros, além de fornecer ajuda e documentação claras e
            acessíveis.`,
        "Design Visual": `Garanta que o design visual contribua para a eficácia,
            adotando uma estética harmoniosa e um design minimalista que destaque
            informações essenciais e elimine elementos desnecessários.`
    }
}