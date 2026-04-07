import customtkinter as ctk
from configs.config_colors import C, F
from PIL import Image


# @TAG: view-message-card
def message_card(self):
    self.frame_message = ctk.CTkFrame(
        master=self.frame_mid,
        fg_color=C["card"],
        corner_radius=12,
        border_width=1,
        border_color=C["border"],
        height=self.H_MID,
    )
    self.frame_message.pack(side="left", fill="both", expand=True, padx=(0, 5))
    self.icon_textbox = ctk.CTkImage(
        light_image=Image.open("media/icon-textbox.png"),
        dark_image=Image.open("media/icon-textbox.png"),
        size=(20, 20)
    )
    self.frame_message_header = ctk.CTkFrame(
        master=self.frame_message,
        fg_color=C["card2"],
        height=44,
    )
    self.frame_message_header.place(x=0, y=0, relwidth=1.0)
    ctk.CTkLabel(
        master=self.frame_message_header,
        image=self.icon_textbox,
        compound="left",
        text=" Mensagem",
        font=ctk.CTkFont(family=F, size=15, weight="bold"),
        text_color=C["text"],
        anchor="w",
    ).place(x=15, rely=0.5, anchor="w")
    ctk.CTkLabel(
        master=self.frame_message,
        text="Cole ou escreva seu texto que será utilizado. Use {primeiro_nome} para personalizar com o primeiro nome do seu cliente.",
        font=ctk.CTkFont(family=F, size=14),
        text_color=C["muted"],
        anchor="w",
    ).place(x=16, y=51, relwidth=1.0)
    self.txt_msg = ctk.CTkTextbox(
        master=self.frame_message,
        font=ctk.CTkFont(family=F, size=14),
        fg_color=C["card2"],
        border_color=C["border2"],
        border_width=1,
        text_color=C["text"],
        wrap="word",
        scrollbar_button_color=C["border"],
    )
    self.txt_msg.place(x=16, y=78, relwidth=0.965, relheight=0.8)
