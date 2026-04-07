import customtkinter as ctk
from configs.config_colors import C, F
from PIL import Image


# @TAG: view-log-card
def log_card(self):
    P = self.P
    self.frame_log = ctk.CTkFrame(
        master=self.scroll_main,
        fg_color=C["card"],
        corner_radius=12,
        border_width=1,
        border_color=C["border"],
        height=self.H_LOG,
    )
    self.frame_log.pack(fill="x", pady=(0, P), padx=(0,10))
    self.frame_log.pack_propagate(False)
    self.icon_log = ctk.CTkImage(
        light_image=Image.open("media/icon-log.png"),
        dark_image=Image.open("media/icon-log.png"),
        size=(20, 20)
    )
    self.frame_log_header = ctk.CTkFrame(
        master=self.frame_log,
        fg_color=C["card2"],
        corner_radius=0,
        height=44,
    )
    self.frame_log_header.place(x=0, y=0, relwidth=1.0)
    ctk.CTkLabel(
        master=self.frame_log_header,
        image = self.icon_log,
        compound= "left",
        text=" Log de Envios",
        font=ctk.CTkFont(family=F, size=15, weight="bold"),
        text_color=C["text"],
        anchor="w",
    ).place(x=15, rely=0.5, anchor="w")
    self.log_box = ctk.CTkTextbox(
        master=self.frame_log,
        font=ctk.CTkFont(family=F, size=13),
        fg_color=C["card2"],
        border_color=C["border2"],
        border_width=1,
        text_color=C["text2"],
        state="disabled",
        wrap="word",
        scrollbar_button_color=C["border2"],
    )
    self.log_box.place(x=14, y=59, relwidth=0.975, relheight=0.75)
