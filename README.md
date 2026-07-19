# Teste Técnico – Desenvolvedor Frontend (EdTech)
Objetivo Implementar integralmente a página disponibilizada no Figma, respeitando layout, interações, estados e comportamentos definidos.

Desenvolvido por **Keven de Souza Cunha**
📍 João Pessoa, PB (Disponível para realocação ou remoto)
📱 (83) 99961-4095 | ✉️ kevensouza8000@gmail.com
[Portfólio](https://keven.richcompany.dev.br) 
[GitHub](https://github.com/Keven8000) 
[LinkedIn](https://linkedin.com/in/keven-souza-a24179322)


**Visualização em Produção:** [Acessar Projeto no Netlify](https://testetecnicofrontend.netlify.app/)

Instruções: https://drive.google.com/file/d/1Fovh5sKhIpSZki8pPOFt3Xzolss6Bpmz/view 

Figma: https://www.figma.com/design/GeyF7bDNU7hFjfYBO6uJQn/EdTech---Teste-de-Frontend?node-id=18-562&t=8BIzWNhRcQMCggXu-0 


# Performance e Lighthouse (PageSpeed Insights)
O projeto foi desenvolvido desde o início com foco em otimização, acessibilidade e boas práticas modernas de Front-end. Os resultados podem ser conferidos no relatório oficial do [Google PageSpeed Insights](https://pagespeed.web.dev/analysis/https-testetecnicofrontend-netlify-app/blh35eao2r?form_factor=desktop), onde a página alcançou métricas de excelência em Acessibilidade, Melhores Práticas e SEO.

**🧠 Decisão de Arquitetura: Critical CSS vs FOCO**

No relatório de Performance, o arquivo `style.css` pode ser apontado como um "recurso que bloqueia a renderização". 

Tenho total ciência de que, para alcançar a pontuação perfeita de 100/100 nessa métrica específica, a abordagem técnica correta seria extrair o **Critical CSS** (estilos da primeira dobra) e inseri-lo `inline` diretamente na tag `<head>`, carregando o restante do arquivo de forma assíncrona (via `preload`).

No entanto, optei conscientemente por manter o carregamento síncrono tradicional (via `<link rel="stylesheet">`) pelos seguintes motivos:
1. **Escopo e Tamanho:** O arquivo CSS do projeto é extremamente leve  e seu tempo de download é quase irrisório em conexões modernas.
2. **Foco na UX:** Priorizei entregar uma experiência de usuário visualmente estável desde o primeiro milissegundo de renderização, em vez de sacrificar a estabilidade visual em prol de uma micro-otimização em um teste técnico.

---

## 📦 Como Rodar o Projeto

O projeto foi construído puramente com tecnologias nativas, sem dependência de gerenciadores de pacote ou builds complexos.

1. **Acesso Rápido:** A forma mais fácil é acessar o [link de deploy no Netlify](https://testetecnicofrontend.netlify.app/).
2. **Rodando Localmente:** Clone o repositório, abra a pasta no VS Code e inicie através da extensão **Live Server** (ou simplesmente abra o arquivo `index.html` em seu navegador).

---

## 🧠 Estrutura e Decisões Técnicas

Optei deliberadamente por **não utilizar plugins ou bibliotecas externas** (como jQuery ou Swiper). Todo o comportamento de interface, animações e regras de negócio foram construídos utilizando apenas **HTML, CSS e JavaScript puros (Vanilla)**. Isso demonstra domínio real sobre as linguagens fundamentais da Web.

### 🏗️ Estrutura de Arquivos
A arquitetura foi mantida simples, modular e organizada:
*   `index.html`: Marcação semântica da página.
*   `assets/`: Concentra estilos (`style.css`), tipografias (`fonts/`) e mídias (`images/`).
*   `js/`: Arquivos JavaScript separados por seção/responsabilidade para facilitar manutenção e isolar escopos (Princípio da Responsabilidade Única).

### 📱 Responsividade e UI (Fidelity)
A aplicação é **100% responsiva**, garantindo um layout fluído e adaptável desde telas pequenas (320px) até grandes monitores Desktop. Em algumas seções, busquei a máxima fidelidade possível ao layout do Figma; em outras, pequenas variações foram aplicadas estritamente para acomodar o cumprimento das regras de negócio solicitadas no escopo do teste.

---

## ✨ Funcionalidades e Regras de Negócio (JavaScript)

### 🖼️ Seção 2: Imagem Lateral
*   Animação de entrada disparada suavemente assim que o elemento atinge 20% de visibilidade na tela.
*   Aplicação de um efeito 3D interativo na imagem interna durante o `hover`.

### 🎠 Seção 3: Slider de Imagens
*   Navegação bidirecional por meio das setas laterais e controle direto pelas *dots* (bolinhas) de paginação.
*   Em vez de um loop infinito, optei por aplicar o estado `disabled` aos botões ao alcançar os limites (início/fim) para melhor feedback visual de estado.
*   *Nota:* O auto-play das imagens foi intencionalmente omitido em favor do controle manual explícito pelo usuário.

### 🗂️ Seção 5: Cards Interativos
*   Comportamento de *Accordion*: Apenas um card pode ser aberto por vez.
*   Transições suaves ao abrir/fechar, com um card já inicializado aberto por padrão para induzir a usabilidade.

### 🎵 Seção 7: Player de Áudio
*   Controles via teclado de alta acessibilidade: `Enter` alterna Play/Pause; `Setas Trás/Frente` avançam ou retrocedem 10 segundos.
*   **Trava de Contexto Inteligente:** Se o áudio estiver tocando, os atalhos funcionam em qualquer lugar da página. Se estiver pausado, as setas e o `Enter` só afetam o áudio se a seção for o último elemento interagido, evitando comportamentos acidentais.
*   **Persistência:** Se a página for recarregada, o áudio volta pausado exatamente no tempo (`currentTime`) onde parou.

### 📝 Seção 8: Atividade Discursiva
*   O usuário preenche o `textarea` e clica em "Responder".
*   O formulário exibe o feedback contendo a resposta digitada, bloqueia a edição e inverte o estado dos botões ("Responder" desabilita, "Alterar" habilita).
*   Ao clicar em "Alterar", a edição é liberada novamente.

### ☑️ Seção 9: Atividade Objetiva
*   Ao selecionar uma alternativa, a opção ganha destaque visual e habilita a submissão.
*   Ao confirmar, o feedback é ativado e a interface travada.
*   A opção "Alterar" reinicia a tentativa e inverte os estados dos botões adequadamente.

**🧠 Decisão de Arquitetura: Checkbox vs Radio**
Tenho ciência de que, semanticamente, o padrão mais correto para uma pergunta de resposta única seria o `<input type="radio">`: o próprio navegador já garante a seleção exclusiva nativamente, e a navegação por teclado segue o comportamento esperado por leitores de tela.

No entanto, optei conscientemente por implementar com `<input type="checkbox">`, controlando a exclusividade manualmente via JavaScript (desmarcando as demais opções a cada seleção). O motivo: **Aderência ao Escopo**. O enunciado do teste especifica explicitamente "Seleção via checkbox", então priorizei seguir a regra de negócio ao pé da letra. 

*Trade-off assumido:* Como o usuário pode desmarcar a própria opção clicando nela novamente (o que não aconteceria com o `radio`), tratei esse caso no JavaScript. Desmarcar a opção faz a interface voltar ao estado neutro, limpando a memória do SessionStorage e desabilitando o botão "Responder" novamente.

*Acessibilidade Extra:* Para compensar o uso do checkbox, envolvi as opções em um `<fieldset>` com `<legend>` para manter o contexto semântico agrupado para leitores de tela.

### ❓ Seção 10: FAQ
*   Desenvolvido utilizando recursos nativos HTML.
*   O clique alterna a expansão do conteúdo e destaca a pergunta em verde. Um item já é carregado aberto para guiar o usuário na interação.

---

## 💾 Persistência de Dados (SessionStorage)

Conforme o requisito obrigatório, todos os dados interativos da página possuem persistência.
Para garantir um controle seguro e modularizado, a lógica de `sessionStorage` foi isolada diretamente dentro do script de cada componente. O sistema é capaz de restaurar instantaneamente após um refresh (F5):
*   Textos preenchidos (até mesmo rascunhos não submetidos).
*   Opções selecionadas nas atividades objetivas.
*   Feedbacks exibidos na tela.
*   Estados de bloqueio/desbloqueio (disabled) dos botões.
*   O progresso e tempo do player de áudio.

---

## ♿ Acessibilidade (A11y)

O projeto foi validado garantindo que qualquer usuário consiga navegar sem barreiras:
*   Uso de **HTML Semântico** em todo o documento.
*   Uso apropriado de atributos `ARIA` (`aria-controls`, `aria-selected`, `aria-label`) nas estruturas dinâmicas, como sliders e abas.
*   Áreas de toque dimensionadas adequadamente para mobile (Hitboxes >= 48px).
*   Labels corretamente associados aos inputs.
*   Navegação completa via teclado (uso fluído da tecla `Tab` com estados de foco `focus` claramente visíveis).
*   Cores com contraste validado.