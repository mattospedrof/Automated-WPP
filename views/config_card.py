import customtkinter as ctk
from configs.config_colors import C, F
from PIL import Image


# @TAG: view-config-card
def config_card(self):
    P = self.P
    self.icon_config = ctk.CTkImage(
        light_image=Image.open("media/icon-config.png"),
        dark_image=Image.open("media/icon-config.png"),
        size=(20, 20)
    )
    self.frame_config = ctk.CTkFrame(
        master=self.frame_mid,
        fg_color=C["card"],
        corner_radius=12,
        border_width=1,
        border_color=C["border"],
        height=self.H_MID,
    )
    self.frame_config.pack(side="left", fill="y", padx=(5, 10))
    self.frame_config.configure(width=300)
    self.frame_config_header = ctk.CTkFrame(
        master=self.frame_config,
        fg_color=C["card2"],
        corner_radius=0,
        height=44,
    )
    self.frame_config_header.place(x=0, y=0, relwidth=1.0)
    self.label_title_card_configs = ctk.CTkLabel(
        master=self.frame_config_header,
        image=self.icon_config,
        compound="left",
        text=" Configurações",
        font=ctk.CTkFont(family=F, size=15, weight="bold"),
        text_color=C["text"],
        anchor="w",
    )
    self.label_title_card_configs.place(x=10, rely=0.5, anchor="w")
    self.frame_config_content = ctk.CTkFrame(
        master=self.frame_config,
        fg_color="transparent",
    )
    self.frame_config_content.pack(fill="both", expand=True, pady=(54, 0))
    content = self.frame_config_content
    self.label_title_interval_sheets = ctk.CTkLabel(
        master=content,
        text="Intervalo da planilha",
        font=ctk.CTkFont(family=F, size=14, weight="bold"),
        text_color=C["text"],
        anchor="w",
    )
    self.label_title_interval_sheets.pack(anchor="w", padx=16, pady=(16, 2))
    self.label_warnin_user_first_line = ctk.CTkLabel(
        master=content,
        text="Define quais linhas serão processadas\n(1 = primeiro cliente)",
        font=ctk.CTkFont(family=F, size=14),
        text_color=C["muted"],
    )
    self.label_warnin_user_first_line.pack(anchor="w", padx=16, pady=(0, 10))
    self.division_frame = ctk.CTkFrame(
        master=content,
        fg_color=C["border"],
        height=1,
    )
    self.division_frame.pack(fill="x", padx=16, pady=(0, 10))
    def field(row, label_text, attr, default):
        form = ctk.CTkFrame(master=content, fg_color="transparent")
        form.pack(fill="x", padx=16, pady=(0, 10))
        form.grid_columnconfigure(0, weight=1)
        form.grid_columnconfigure(1, weight=0)
        label = ctk.CTkLabel(
            master=form,
            text=label_text,
            font=ctk.CTkFont(family=F, size=13),
            text_color=C["text2"],
            anchor="w",
        )
        label.grid(row=row, column=0, sticky="w", pady=5)
        entry = ctk.CTkEntry(
            master=form,
            width=90,
            height=34,
            font=ctk.CTkFont(family=F, size=13),
            fg_color=C["card2"],
            border_color=C["border2"],
            text_color=C["text"],
            corner_radius=8,
        )
        entry.grid(row=row, column=0, padx=(80, 0), pady=5, sticky="w")
        entry.insert(0, default)
        setattr(self, f"entry_{attr}", entry)
    field(0, "Linha inicial:", "range_start", "1")
    field(1, "Linha final:", "range_end", "0")
    ctk.CTkFrame(
        master=content,
        fg_color=C["border"],
        height=1,
    ).pack(fill="x", padx=16, pady=(0, 5))
    self.btn_start = ctk.CTkButton(
        master=content,
        text="▶ Iniciar Envio",
        width=168, height=40,
        fg_color=C["green"],
        hover_color=C["green_d"],
        font=ctk.CTkFont(family=F, size=16, weight="bold"),
        text_color="#000",
        corner_radius=10,
        command=self._start,
    )
    self.btn_start.pack(padx=16, pady=(10, 5), anchor="nw")
    self.btn_stop = ctk.CTkButton(
        master=content,
        text="■ Parar",
        width=168, height=40,
        fg_color=C["danger_bg"],
        hover_color="#3A0A0A",
        font=ctk.CTkFont(family=F, size=16, weight="bold"),
        text_color=C["danger"],
        corner_radius=10,
        border_width=1,
        border_color=C["danger"],
        state="disabled",
        command=self._stop,
    )
    self.btn_stop.pack(padx=16, pady=(5, 5), anchor="nw")
    self.btn_clean_log = ctk.CTkButton(
        master=content,
        text="🗑   Limpar log",
        width=168, height=34,
        fg_color="transparent",
        hover_color=C["card2"],
        font=ctk.CTkFont(family=F, size=13),
        text_color=C["muted"],
        corner_radius=8,
        border_width=1,
        border_color=C["border"],
        command=self._clear_log,
    )
    self.btn_clean_log.pack(padx=16, pady=5, anchor="nw")
