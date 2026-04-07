# 📱 WhatsApp Sender

> **Automatize seus envios em massa no WhatsApp de forma simples, segura e organizada.**

Uma aplicação desktop que transforma o envio de mensagens em larga escala — ideal para campanhas, comunicados e ações de marketing pessoal.

---

<p align="center">
  <strong>Fkz Tech - WA Sender</strong> &nbsp;•&nbsp; v1.0.0
</p>

---

## ✨ O que ele faz

Imagine enviar uma mensagem personalizada para centenas de contatos, um por um, como se você estivesse digitando manualmente — mas tudo automatizado. O **WhatsApp Sender** cuida de todo o processo:

1. **Carrega sua planilha** — Excel (`.xlsx`) ou CSV com `Id`, `Cliente` e `Celular`/`Telefone`
2. **Conecta ao WhatsApp Web** — via navegador, com escaneamento do QR Code
3. **Envia mensagens personalizadas** — cada contato recebe a mensagem com seu primeiro nome
4. **Atualiza a planilha em tempo real** — coluna `Status` é preenchida a cada envio (`Enviado`, `wpp n encontrado`, `Erro`)
5. **Retoma de onde parou** — se parar no meio, basta reiniciar que os contatos já enviados são pulados automaticamente.

---

## 🚀 Começando

### Pré-requisitos

- **Google Chrome** instalado na máquina
- **WhatsApp Web** acessível (conta ativa)
- **Windows** (o app foi otimizado para este sistema)

### Instalando

1. Baixe a última versão em **[Releases](https://github.com/mattospedrof/Automated-WPP/releases)**
2. Extraia o `.zip` em uma pasta da sua escolha
3. Execute o `.exe`

> Na primeira execução o app pode demorar alguns segundos para abrir — é normal, ele está preparando o ambiente.

### Usando

O app abre em tela cheia. Siga o fluxo:

1. Clique em **Conectar WhatsApp** → escaneie o QR Code que aparece no navegador
2. Clique em **Selecionar arquivo** e escolha sua planilha
3. Escreva ou cole a mensagem (use `{primeiro_nome}` para personalizar)
4. Defina o intervalo de linhas desejado
5. Clique em **▶ Iniciar Envio**

> **Dica:** após o primeiro QR Code escaneado, a sessão fica salva. Nas próximas execuções, o app conecta direto — sem escanear de novo.

---

## 📋 Formato da planilha

Sua planilha deve ter, no mínimo, estas colunas na primeira linha (cabeçalho):

| Id | Cliente | Celular |
|---|---|---|
| 1 | João Silva | 11999998888 |
| 2 | Maria Oliveira | 21988887777 |

- **`Id`** → identificador único do contato (usado nos logs)
- **`Cliente`** → nome completo (o app extrai o primeiro nome automaticamente)
- **`Celular`** ou **`Telefone`** → número com DDD (o app adiciona `55` automaticamente se necessário)

> **Dica:** As colunas `Status` e `Mensagem` são criadas **automaticamente** pelo app nas próximas colunas vazias da planilha. Não precisa criá-las manualmente.

### Marcar telefones inválidos

Se algum contato não deve ser processado, preencha a coluna de telefone com `Erro` — o app vai pular automaticamente.

---

## 🔧 Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| **Sessão persistente** | Após escanear o QR Code uma vez, a sessão fica salva. Na próxima vez, conecta direto |
| **Normalização de telefone** | Adiciona DDI `55` automaticamente, remove caracteres especiais e zeros à esquerda |
| **Detecção de envios anteriores** | Ao recarregar uma planilha parcialmente enviada, sugere automaticamente a linha de retomo |
| **Retry automático** | Em caso de falha temporária, tenta 1 vez mais antes de marcar como erro |
| **Detecção de números inválidos** | Identifica contatos sem WhatsApp e marca como `wpp n encontrado` |
| **Atualização em tempo real** | A planilha é atualizada linha a linha durante o envio |
| **Delay inteligente** | Pausa aleatória de 5 a 10 segundos entre mensagens para evitar detecção |
| **Reset automático** | 10 segundos após concluir, os campos são limpos para um novo envio |
| **Auto-update** | O app verifica se há novas versões no GitHub e atualiza sozinho |
| **Logs detalhados** | Cada ação é registrada em `tmp/logs/MM-YYYY/log_DD_MM_YYYY.txt` |

---

## ⚠️ Notas importantes

- Este app utiliza **WhatsApp Web**. Não modifica o aplicativo oficial.
- O delay entre mensagens foi pensado para minimizar riscos de detecção.
- Respeite as políticas do WhatsApp e a LGPD ao enviar mensagens em massa.
- O app **não armazena** dados em servidores externos — tudo fica na sua máquina.

---

Feito com 💚 por [Frannkz Tech](https://github.com/mattospedrof)
