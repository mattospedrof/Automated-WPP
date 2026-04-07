import customtkinter as ctk
from configs.config_colors import C, F
from PIL import Image


# @TAG: view-progress-card
def progress_card(self):
    P = self.P
    self.frame_progress = ctk.CTkFrame(
        master=self.scroll_main,
        fg_color=C["card"],
        corner_radius=12,
        border_width=1,
        border_color=C["border"],
        height=self.H_PROG,
    )
    self.frame_progress.pack(fill="x", pady=(0, P), padx=(0,10))
    self.frame_progress.pack_propagate(False)
    self.icon_progress = ctk.CTkImage(
        light_image=Image.open("media/icon-progress-bar.png"),
        dark_image=Image.open("media/icon-progress-bar.png"),
        size=(20, 20)
    )
    self.frame_progress_header = ctk.CTkFrame(
        master=self.frame_progress,
        fg_color=C["card2"],
        corner_radius=0,
        height=44,
    )
    self.frame_progress_header.place(x=0, y=0, relwidth=1.0)
    ctk.CTkLabel(
        master=self.frame_progress_header,
        image = self.icon_progress,
        compound= "left" ,
        text=" Progresso do Envio",
        font=ctk.CTkFont(family=F, size=15, weight="bold"),
        text_color=C["text"],
        anchor="w",
    ).place(x=15, rely=0.5, anchor="w")
    self.lbl_sent_total = ctk.CTkLabel(
        master=self.frame_progress,
        text="0 / 0",
        font=ctk.CTkFont(family=F, size=38, weight="bold"),
        text_color=C["green"],
    )
    self.lbl_sent_total.place(x=16, y=52)
    self.label_send_msgs = ctk.CTkLabel(
        master=self.frame_progress,
        text="Mensagens\nEnviadas",
        font=ctk.CTkFont(family=F, size=14),
        text_color=C["muted"],
        justify="left",
    )
    self.label_send_msgs.place(x=222, y=56)
    self.progress_bar = ctk.CTkProgressBar(
        master=self.frame_progress,
        height=10,
        progress_color=C["green"],
        fg_color=C["card2"],
    )
    self.progress_bar.place(relx=0.03, y=112, relwidth=0.94)
    self.progress_bar.set(0)
    self.lbl_eta = ctk.CTkLabel(
        master=self.frame_progress,
        text="Tempo restante:  --",
        font=ctk.CTkFont(family=F, size=14),
        text_color=C["text2"],
        anchor="w",
    )
    self.lbl_eta.place(relx=0.03, y=130, relwidth=0.94)
