# 📱 WhatsApp Sender

> **Automatize seus envios em massa no WhatsApp de forma simples, segura e organizada.**

Uma aplicação desktop construída com Python que transforma o envio de mensagens em larga escala — ideal para campanhas, comunicados e ações de marketing pessoal.

---

<p align="center">
  <strong>Fkz Tech</strong> &nbsp;•&nbsp; v1.0.0
</p>

---

## ✨ O que ele faz

Imagine enviar uma mensagem personalizada para centenas de contatos, um por um, como se você estivesse digitando manualmente — mas tudo automatizado. O **WhatsApp Sender** cuida de todo o processo:

1. **Carrega sua planilha** — Excel (`.xlsx`) ou CSV com `Id`, `Cliente` e `Celular`/`Telefone`
2. **Conecta ao WhatsApp Web** — via navegador, com escaneamento do QR Code
3. **Envia mensagens personalizadas** — cada contato recebe a mensagem com seu primeiro nome
4. **Atualiza a planilha em tempo real** — coluna `Status` é preenchida a cada envio (`Enviado`, `wpp n encontrado`, `Erro`)
5. **Retoma de onde parou** — se parar no meio, basta reiniciar que os contatos já enviados são pulados automaticamente

---

## 🚀 Começando

### Pré-requisitos

- **Python 3.12+**
- **Google Chrome** instalado na máquina
- **WhatsApp Web** acessível (conta ativa)
- **Windows** (o app foi otimizado para este sistema)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/mattospedrof/Automated-WPP.git
cd Automated-WPP

# Crie o ambiente virtual
python -m venv venv
venv\Scripts\activate

# Instale as dependências
pip install -r requirements.txt
```

### Executando

```bash
python app.py
```

O app abre em tela cheia. Siga o fluxo:

1. Clique em **Conectar WhatsApp** → escaneie o QR Code
2. Selecione sua planilha com os contatos
3. Escreva ou cole a mensagem (use `{primeiro_nome}` para personalizar)
4. Defina o intervalo de linhas desejado
5. Clique em **▶ Iniciar Envio**

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

## 🏗️ Gerando o executável

Se quiser distribuir o app sem precisar do Python instalado:

```bash
build.bat
```

O executável será gerado em `dist\WhatsApp Sender\`.

---

## 📦 Gerando uma nova release

Para criar uma versão atualizada no GitHub:

1. Edite `utils/version.py` e atualize o número da versão
2. Execute `release.bat` (requer [GitHub CLI](https://cli.github.com/) instalado e autenticado)

O script faz o build, anexa o `.exe` e cria uma draft release automaticamente.

---

## 📁 Estrutura do projeto

```
├── app.py                  # Aplicação principal (lógica + montagem da UI)
├── src/
│   └── bot.py              # Motor de automação do WhatsApp (Selenium)
├── views/                  # Componentes visuais da interface
│   ├── sidebar.py          # Barra lateral (status, botões, estatísticas)
│   ├── main_view.py        # Frame principal (orquestrador)
│   ├── file_card.py        # Card de seleção de planilha
│   ├── message_card.py     # Card de edição da mensagem
│   ├── config_card.py      # Card de configurações e botões de envio
│   ├── progress_card.py    # Card de barra de progresso
│   └── log_card.py         # Card de log de envios
├── utils/                  # Utilitários
│   ├── chrome_check.py     # Detecção da versão do Chrome
│   ├── notify_user.py      # Notificações ao usuário
│   ├── updater.py          # Sistema de auto-update via GitHub
│   └── version.py          # Versão única do app
├── configs/                # Configurações
│   ├── conf_logs.py        # Configuração de logging
│   └── config_colors.py    # Paleta de cores e fontes
├── build.bat               # Script de build (PyInstaller)
├── release.bat             # Script de release (GitHub Releases)
├── requirements.txt        # Dependências Python
└── .gitignore              # Arquivos ignorados pelo Git
```

---

## ⚠️ Notas importantes

- Este app utiliza **WhatsApp Web**. Não modifica o aplicativo oficial.
- O delay entre mensagens foi pensado para minimizar riscos de detecção.
- Respeite as políticas do WhatsApp e a LGPD ao enviar mensagens em massa.
- O app **não armazena** dados em servidores externos — tudo fica na sua máquina.

---

## 🛠️ Tecnologias

| Stack | Uso |
|-------|-----|
| **Python 3.12** | Linguagem principal |
| **CustomTkinter** | Interface gráfica moderna (dark mode) |
| **Selenium + undetected-chromedriver** | Automação do WhatsApp Web |
| **Pandas + Openpyxl** | Manipulação de planilhas |
| **PyInstaller** | Geração do executável |

---

## 📄 Licença

Projeto desenvolvido por **Fkz Tech**. Uso pessoal e interno.

---

Feito com 💚 por [Fkz Tech](https://github.com/mattospedrof)
