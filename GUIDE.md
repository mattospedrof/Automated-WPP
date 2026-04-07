# 📘 Guia de Documentação do Código

> Referencia técnica completa — cada função do projeto com sua etiqueta, propósito e comportamento.

As etiquetas (`@TAG`) são usadas como marcadores acima de cada função nos arquivos fonte. Basta buscar `@TAG: nome-da-tag` para localizar qualquer função rapidamente.

---

## 📁 `app.py` — Aplicação Principal

| Etiqueta | Função | O que faz |
|----------|--------|-----------|
| `@TAG: helper-first-name` | `first_name(s)` | Extrai o primeiro nome de um nome completo. Ex: `"João Silva"` → `"João"` |
| `@TAG: helper-build-message` | `build_message(template, full_name)` | Substitui `{primeiro_nome}` no template da mensagem pelo nome extraído |
| `@TAG: helper-is-error` | `is_erro(p)` | Verifica se um valor de planilha indica um registro inválido/pular |
| `@TAG: helper-format-time` | `fmt_time(s)` | Formata segundos em string legível: `3700` → `"1h 01min"` |
| `@TAG: helper-error-file-path` | `get_error_file_path()` | Retorna o caminho do arquivo de erros do dia (`tmp/erros_DD_MM_YYYY.txt`) |
| `@TAG: helper-register-error` | `register_error(cid, phone)` | Registra ID e telefone falhos no arquivo de erros |
| `@TAG: helper-phone-column` | `get_phone_column(df)` | Detecta a coluna de telefone no DataFrame. Prefere `"Celular"` sobre `"Telefone"` |
| `@TAG: sheet-updater-init` | `SheetUpdater.__init__()` | Abre o Excel, mapeia as colunas `Status` e `Mensagem`. Se não existirem, cria nas próximas colunas vazias |
| `@TAG: sheet-updater-update` | `SheetUpdater.update_row()` | Atualiza `Status` e `Mensagem` numa linha específica do Excel (thread-safe) |
| `@TAG: app-init` | `App.__init__()` | Inicializa a janela, variáveis de estado e registra o handler de fechamento |
| `@TAG: app-build-ui` | `App._build_ui()` | Monta toda a interface chamando `sidebar()` e `main_view()` |
| `@TAG: app-close-handler` | `App._on_close_app()` | Intercepta o fechamento da janela — para o envio e agenda o cleanup |
| `@TAG: app-cleanup-exit` | `App._cleanup_and_exit()` | Fecha o driver do Chrome e destrói a janela |
| `@TAG: app-load-file` | `App._load_file()` | Carrega Excel/CSV, cria colunas `Status`/`Mensagem` se não existirem, sugere linha inicial automática |
| `@TAG: app-suggest-start` | `App._sugest_start_line()` | Percorre `Status` e retorna a primeira linha sem envio (sugestão para o usuário) |
| `@TAG: app-help` | `App._help()` | Abre a página de ajuda no navegador padrão |
| `@TAG: app-connect` | `App._connect()` | Inicia o processo de conexão com o WhatsApp Web em thread separada |
| `@TAG: app-do-connect` | `App._do_connect()` | Cria o bot, abre o WhatsApp, detecta sessão existente e trata erros de conexão |
| `@TAG: app-connected-callback` | `App._on_connected()` | Atualiza a UI quando a conexão é bem-sucedida (pill verde, botão muda) |
| `@TAG: app-session-detected` | `App._on_session_detected()` | Log informa que uma sessão salva foi encontrada (pula QR Code) |
| `@TAG: app-connect-cancelled` | `App._on_connect_cancelled()` | Usuário fechou o navegador — reset silencioso sem mostrar erro |
| `@TAG: app-connect-error` | `App._on_connect_error()` | Falha real de conexão — mostra messagebox de erro |
| `@TAG: app-disconnect` | `App._disconnect()` | Desconecta o bot, limpa a sessão `wa_session/` e reseta a UI |
| `@TAG: app-start-send` | `App._start()` | Valida tudo, normaliza telefones, cancela timer de reset e inicia o loop de envio |
| `@TAG: app-send-loop-wrapper` | `App._send_loop()` | Wrapper com try/except genérico para o loop — captura erros fatais e mostra dialog |
| `@TAG: app-reset-buttons` | `App._reset_buttons()` | Reabilita o botão Iniciar e agenda o reset automático após 10s |
| `@TAG: app-send-loop-core` | `App._send_loop_inner()` | **Coração do envio.** Itera sobre as linhas, verifica conexão, pula já enviados, envia, atualiza planilha, calcula ETA |
| `@TAG: app-send-complete` | `App._on_done()` | Mostra resumo final e agenda o reset automático dos campos após 10s |
| `@TAG: app-auto-reset` | `App._reset_after_completion()` | Limpa planilha, intervalos, progresso e contadores — app fica pronto para novo envio |
| `@TAG: app-stop` | `App._stop()` | Para o loop de envio e agenda o reset automático |
| `@TAG: app-log` | `App._log()` | Adiciona uma linha ao log visual do app (thread-safe via `after`) |
| `@TAG: app-clear-log` | `App._clear_log()` | Limpa todo o conteúdo do log visual |
| `@TAG: app-ui-sent-total` | `App._update_sent_total()` | Atualiza o contador `X / Y` no card de progresso |
| `@TAG: app-ui-counters` | `App._update_counters()` | Atualiza os 4 cards de estatísticas na sidebar |

---

## 📁 `src/bot.py` — Motor de Automação

| Etiqueta | Função | O que faz |
|----------|--------|-----------|
| `@TAG: bot-init` | `WhatsAppBot.__init__()` | Armazena o diretório do perfil Chrome e inicializa o driver como `None` |
| `@TAG: bot-check-session` | `WhatsAppBot.has_existing_session()` | Verifica se o diretório `Default/` existe dentro de `wa_session/` (sessão salva) |
| `@TAG: bot-launch` | `WhatsAppBot.open_whatsapp()` | Detecta versão do Chrome, abre o navegador com perfil persistente e navega ao WhatsApp Web |
| `@TAG: bot-wait-login` | `WhatsAppBot._await_main_app()` | Aguarda até `QR_WAIT_TIMEOUT` pelo elemento principal — dispara notificação ao conectar |
| `@TAG: bot-send` | `WhatsAppBot.send_message()` | **Envio principal.** Normaliza telefone, abre URL, aguarda página, clica Enviar, confirma ✓. 1 retry em erro transitório |
| `@TAG: bot-wait-page` | `WhatsAppBot._wait_for_page_ready()` | Faz polling por `PAGE_LOAD_TIMEOUT` — retorna `"ready"`, `"invalid"` ou `"timeout"` |
| `@TAG: bot-detect-popup` | `WhatsAppBot._has_invalid_popup()` | Verifica se há popup de número inválido buscando palavras-chave no texto |
| `@TAG: bot-dismiss-popup` | `WhatsAppBot._dismiss_popup()` | Fecha popup clicando no botão ou enviando ESC como fallback |
| `@TAG: bot-wait-confirm` | `WhatsAppBot._wait_for_sent_confirmation()` | Polling pelo ícone `✓` por `SEND_CONFIRM_TIMEOUT` segundos |
| `@TAG: bot-go-home` | `WhatsAppBot._go_home()` | Retorna à tela principal após erro — tenta recarregar ou pressionar ESC |
| `@TAG: bot-clean-phone` | `WhatsAppBot._clean_phone()` | Remove caracteres não numéricos do telefone (legado, mantido por compatibilidade) |
| `@TAG: bot-is-connected` | `WhatsAppBot.is_connected()` | Verifica se o driver responde, o title é válido e elementos de logado estão presentes |
| `@TAG: bot-normalize-phone` | `WhatsAppBot.normalize_phone()` | Limpa, remove zeros à esquerda, adiciona DDI `55` se necessário, valida tamanho mínimo |
| `@TAG: bot-close` | `WhatsAppBot.close()` | Fecha o navegador do Selenium de forma segura |

---

## 📁 `views/` — Componentes da Interface

| Etiqueta | Função | Arquivo | O que faz |
|----------|--------|---------|-----------|
| `@TAG: view-sidebar` | `sidebar()` | `sidebar.py` | Monta a barra lateral com logo, status, botões Conectar/Desconectar, cards de estatísticas e botão de ajuda |
| `@TAG: view-main` | `main_view()` | `main_view.py` | Frame direito com scroll — orquestra todos os cards |
| `@TAG: view-file-card` | `file_card()` | `file_card.py` | Card de seleção de planilha com botão de browse e preview do nome do arquivo |
| `@TAG: view-message-card` | `message_card()` | `message_card.py` | Card com textbox para escrever/colar a mensagem (suporta `{primeiro_nome}`) |
| `@TAG: view-config-card` | `config_card()` | `config_card.py` | Card com campos de intervalo, botões Iniciar/Parar/Limpar log |
| `@TAG: view-progress-card` | `progress_card()` | `progress_card.py` | Card com barra de progresso, contador de enviados e ETA |
| `@TAG: view-log-card` | `log_card()` | `log_card.py` | Card com textbox de log em tempo real (readonly com scroll) |

---

## 📁 `utils/` — Utilitários

| Etiqueta | Função | Arquivo | O que faz |
|----------|--------|---------|-----------|
| `@TAG: notify-user` | `notify_user()` | `notify_user.py` | Exibe um `messagebox` nativo do Tkinter para notificar o usuário |
| `@TAG: chrome-get-version` | `get_chrome_version()` | `chrome_check.py` | Lê a versão do Chrome do registro Windows ou verifica paths comuns |
| `@TAG: chrome-is-installed` | `is_chrome_installed()` | `chrome_check.py` | Wrapper booleano para `get_chrome_version()` |
| `@TAG: updater-fetch-release` | `_get_latest_release()` | `updater.py` | Consulta a API do GitHub e retorna `(tag, download_url)` da última release |
| `@TAG: updater-download` | `_download_exe()` | `updater.py` | Baixa o `.exe` da release com callback de progresso opcional |
| `@TAG: updater-apply` | `_apply_update()` | `updater.py` | Cria `.bat` que substitui o executável e reinicia o app |
| `@TAG: updater-check` | `check_for_updates()` | `updater.py` | Ponto de entrada do auto-update — compara versões, pergunta ao usuário, baixa e aplica |

---

## 📁 `configs/` — Configurações

| Etiqueta | Função | Arquivo | O que faz |
|----------|--------|---------|-----------|
| `@TAG: conf-logging` | `conf_logging()` | `conf_logs.py` | Configura logging para `tmp/logs/MM-YYYY/log_DD_MM_YYYY.txt` |
| — | `C` (dict) | `config_colors.py` | Paleta de cores do app (dark mode + verde WhatsApp) |
| — | `F` (str) | `config_colors.py` | Fonte padrão: `"Arial"` |

---

## 📁 `utils/version.py`

| Etiqueta | Conteúdo | O que faz |
|----------|----------|-----------|
| — | `VERSION = "1.0.0"` | Fonte única da versão do app. Usada pelo `updater.py` e `release.bat` |

---

## 🔖 Lista rápida de etiquetas

```
@TAG: helper-first-name
@TAG: helper-build-message
@TAG: helper-is-error
@TAG: helper-format-time
@TAG: helper-error-file-path
@TAG: helper-register-error
@TAG: helper-phone-column
@TAG: sheet-updater-init
@TAG: sheet-updater-update
@TAG: app-init
@TAG: app-build-ui
@TAG: app-close-handler
@TAG: app-cleanup-exit
@TAG: app-load-file
@TAG: app-suggest-start
@TAG: app-help
@TAG: app-connect
@TAG: app-do-connect
@TAG: app-connected-callback
@TAG: app-session-detected
@TAG: app-connect-cancelled
@TAG: app-connect-error
@TAG: app-disconnect
@TAG: app-start-send
@TAG: app-send-loop-wrapper
@TAG: app-reset-buttons
@TAG: app-send-loop-core
@TAG: app-send-complete
@TAG: app-auto-reset
@TAG: app-stop
@TAG: app-log
@TAG: app-clear-log
@TAG: app-ui-sent-total
@TAG: app-ui-counters
@TAG: bot-init
@TAG: bot-check-session
@TAG: bot-launch
@TAG: bot-wait-login
@TAG: bot-send
@TAG: bot-wait-page
@TAG: bot-detect-popup
@TAG: bot-dismiss-popup
@TAG: bot-wait-confirm
@TAG: bot-go-home
@TAG: bot-clean-phone
@TAG: bot-is-connected
@TAG: bot-normalize-phone
@TAG: bot-close
@TAG: view-sidebar
@TAG: view-main
@TAG: view-file-card
@TAG: view-message-card
@TAG: view-config-card
@TAG: view-progress-card
@TAG: view-log-card
@TAG: notify-user
@TAG: chrome-get-version
@TAG: chrome-is-installed
@TAG: updater-fetch-release
@TAG: updater-download
@TAG: updater-apply
@TAG: updater-check
@TAG: conf-logging
```

---

> Para buscar qualquer função no código: `Ctrl+Shift+F` → `@TAG: nome-da-tag`
