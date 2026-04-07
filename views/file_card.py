import customtkinter as ctk
from configs.config_colors import C, F
from PIL import Image


# @TAG: view-file-card
def file_card(self):
    P = self.P
    self.icon_folder = ctk.CTkImage(
        light_image=Image.open("media/icon-folder.png"),
        dark_image=Image.open("media/icon-folder.png"),
        size=(20, 20)
    )
    self.frame_file = ctk.CTkFrame(
        master=self.scroll_main,
        fg_color=C["card"],
        corner_radius=12,
        border_width=1,
        border_color=C["border"],
        height=self.H_FILE,
    )
    self.frame_file.pack(fill="x", pady=(0, P), padx=(0,10))
    self.frame_file.pack_propagate(False)
    self.frame_file_header = ctk.CTkFrame(
        master=self.frame_file,
        fg_color=C["card2"],
        corner_radius=0,
        height=44,
    )
    self.frame_file_header.place(x=0, y=0, relwidth=1.0)
    self.label_sheet_folder = ctk.CTkLabel(
        master=self.frame_file_header,
        image=self.icon_folder,
        compound="left",
        text=" Planilha de Contatos",
        font=ctk.CTkFont(family=F, size=15, weight="bold"),
        text_color=C["text"],
        anchor="w",
    )
    self.label_sheet_folder.place(x=15, rely=0.5, anchor="w")
    self.btn_browse = ctk.CTkButton(
        master=self.frame_file,
        text="Selecionar arquivo  (.xlsx / .csv)",
        fg_color=C["card2"],
        border_width=1,
        border_color=C["border2"],
        hover_color=C["border"],
        font=ctk.CTkFont(family=F, size=13),
        text_color=C["text2"],
        corner_radius=8,
        command=self._load_file,
    )
    self.btn_browse.place(x=16, y=54)
    self.label_file = ctk.CTkLabel(
        master=self.frame_file,
        text="Nenhum arquivo selecionado - Consulte no botão de ajuda como o arquivo deve estar formatado",
        font=ctk.CTkFont(family=F, size=14),
        text_color=C["muted"],
        anchor="w",
    )
    self.label_file.place(x=220, y=54, relwidth=1.0)
    self.label_preview_columns = ctk.CTkLabel(
        master=self.frame_file,
        text="",
        font=ctk.CTkFont(family=F, size=12),
        text_color=C["green"],
        anchor="w",
    )
    self.label_preview_columns.place(x=16, y=91, relwidth=1.0)
