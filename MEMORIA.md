# Memória do projeto — Template jurídico 2

## Objetivo
Este projeto é um template reutilizável de landing page para escritórios de advocacia. Toda alteração futura deve preservar uma percepção de autoridade, confiança, proximidade e sofisticação contemporânea.

## Direção visual
- Conceito: simbolismo jurídico clássico combinado com minimalismo digital moderno.
- Paleta principal: carvão/preto, marfim/branco quente e dourado oliva.
- Fotografia: editorial, quente, profissional e com contraste controlado.
- Tipografia: títulos grandes, limpos e contemporâneos; textos curtos e legíveis.
- Formas: cantos arredondados, bastante espaço em branco e linhas finas.
- Evitar: azul corporativo genérico, excesso de ornamentos, linguagem agressiva, promessas de resultado e aparência de banco de imagens barato.

## Estrutura obrigatória
1. Hero de alto impacto com proposta de valor e CTA.
2. Experiência do escritório e indicadores de confiança.
3. Áreas de atuação.
4. Apresentação da equipe com fotos e especialidades.
5. Contato simples e confidencial.
6. Localização com endereço, horário, rota externa e mapa integrado.
7. Rodapé com aviso informativo.

## Conteúdo e conformidade
- Usar português do Brasil correto e natural.
- O template deve permitir trocar nome, OAB, telefone, endereço, áreas e fotos facilmente.
- Nunca prometer vitória, causa ganha ou resultados garantidos.
- Manter avisos de que cada caso depende de análise individual.
- CTAs devem ser discretos: “Fale conosco”, “Agende uma conversa” ou “Conte seu caso”.

## Experiência e qualidade
- Priorizar celular, acessibilidade, navegação por teclado e contraste adequado.
- Menu deve levar às seções da mesma página.
- Formulário deve ser curto e não deve enviar dados sem integração configurada.
- Antes de concluir qualquer alteração, executar a verificação de produção e corrigir erros.

## Personalização conectada
- Todos os dados variáveis ficam em `src/config/template.config.js`.
- Alterar nesse arquivo: marca, título principal, WhatsApp, telefone, e-mail, endereço, métricas, especialidades, equipe e FAQ.
- Não duplicar esses dados diretamente nos componentes. A página, o cabeçalho e o rodapé devem continuar consumindo o arquivo central.
- O número do WhatsApp deve incluir código do país e DDD, somente com números, no campo correspondente de `landing.data.json`.
- Cada especialidade possui sua própria mensagem inicial para gerar um link contextual do WhatsApp.

## Referência deste template
A composição nasceu de uma referência com hero escuro da Justiça, bloco editorial claro, números circulares, cards de conteúdo e carrossel visual de advogados. A implementação deve se inspirar nessa lógica sem copiar marcas, textos ou composição pixel a pixel.
