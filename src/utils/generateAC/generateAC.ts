import { DescriptionRelation, Dimension } from "@utils/defines/defines";
import OpenAI from "openai";

interface Props {
    dimension_number: number
}

const persona = "João"
const verb = "Otimizar"
const expected_result = ""

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

const getDimension = (dimension: number): "Eficiência"|"Eficácia" => {
    if(dimension === Dimension["Eficácia"]) return "Eficácia"
    return "Eficiência"
}

const getPrompt = async ({dimension_number}: Props) => {
    const dimension: "Eficiência" | "Eficácia" = getDimension(dimension_number)
    const verbs = ["otimizar", "melhorar"]
    let msg = `
        Crie critérios de aceitação para histórias de usuário, integrando a relação entre
        a Eficiência (ISO 9241-11), os elementos de Garrett e as heurísticas de Nielsen.

        Os critérios de aceitação devem contemplar:
        
        1. História do Usuário
        Formate a história no padrão:
        \"Eu ${persona}, quero que o sistema ${verb} ${expected_result}\"
        2. Verbo no Infinitivo
        Identifique o verbo principal no infinitivo que expressa a ação ou o objetivo na história
        do usuário. Esse verbo será utilizado para definir a relação apropriada entre ISO 9241-
        11, Garrett e Heurísticas de Nielsen..

        3. Relacionamento Triplo
        A partir do verbo no infinitivo, será encontrado qual é o relacionamento que aquele
        verbo se encaixa. Um verbo pode estar em mais de um relacionamento, isso irá gerar
        critérios de aceitação para cada associação. Os critérios de aceitação serão gerados a
        partir dos relacionamentos a seguir.
        Relacionamentos e Verbos Associados:

        1. ${dimension} ↔ Necessidades do Usuário ↔ Correspondência entre o sistema e
        o mundo real
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Necessidades do Usuário"]}
        2. ${dimension} ↔ Objetivos do Produto ↔ Visibilidade do estado do sistema
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Objetivos do Produto"]}
        3. ${dimension} ↔ Especificações Funcionais ↔ Flexibilidade e Eficiência de Uso
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Especificações Funcionais"]}
        4. ${dimension} ↔ Requisitos de Conteúdo ↔ Prevenção de Erros
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Requisitos de Conteúdo"]}
        5. ${dimension} ↔ Design de Interação ↔ Controle e Liberdade do Usuário
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Design de Interação"]}
        6. ${dimension} ↔ Arquitetura da Informação ↔ Consistência e Padrões
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Arquitetura da Informação"]}
        7. ${dimension} ↔ Design de Interface ↔ Reconhecimento ao invés de lembrança
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Design de Interface"]}
        8. ${dimension} ↔ Design de Navegação ↔ Ajudar usuários a reconhecer,
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Design de Navegação"]}
        9. ${dimension} ↔ Design de Informação ↔ Ajuda e Documentação
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Design de Informação"]}
        10. ${dimension} ↔ Design Visual ↔ Estética e Design Minimalista
            - Verbos: ${verbs.map(item => item)}.
            - Descrição: ${DescriptionRelation[dimension]["Design Visual"]}


        4. Como criar a associação:
            - Mapeie os verbos da história de usuário ao conjunto de verbos do
            relacionamento triplo mais relevante.
            - Para cada verbo, construa critérios que garantam a eficiência esperada,
            considerando as diretrizes ISO, elementos de Garrett e heurísticas de Nielsen.
            - Se o verbo estiver presente em mais de uma relação, gere critérios de aceitação
            para todas as relações.

        5. Critérios de Aceitação
            Liste critérios objetivos e mensuráveis que validem a relação entre a ação da história do
            usuário e os requisitos de ${dimension}. Os critérios de aceitação devem ter relação com os
            itens da(s) relação (ões) que o verbo se encontra. Gera no mínimo 4 critérios de
            aceitação. Exemplos:

            - "A interface permite ao usuário consultar informações com no máximo 3
            cliques";
            - "A ação de configurar preferências deve ser realizada em menos de 1 minuto";
            - "O sistema deve fornecer feedback visual ao usuário ao reconhecer
            comandos em até 500 ms";

        6. Como apresentar os Critérios de aceitação:
            - Só mostre os Critérios de Aceitação. Não mostre as outras informações.
            - Apresente quais critérios de aceitação estão relacionados com as suas devidas
            relações.
            - Se na relação tiver mais de uma heurística de Nielsen (Exemplo: ${dimension} ↔
            Design de Interação ↔ Flexibilidade e eficiência de uso ↔ Controle e
            liberdade do usuário) crie critérios de aceitação que se encaixe em cada uma
            delas.
            - Se o verbo estiver em mais de uma relação, crie pelo menos 4 critérios de
            aceitação para cada relação.
            - É importante que seja criado critérios de aceitação para TODAS as relações,
            portanto se um verbo aparecer em todos os relacionamentos, isso deverá gerar
            critérios de aceitação para todos eles.

    `

    return msg
}

export const generateAC = async ({dimension_number}: Props) => {
    const prompt = await getPrompt({dimension_number})
    const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{"role": 'user', "content": prompt}],
    })
    return res.choices[0].message.content
}