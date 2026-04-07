import customtkinter as ctk
import webbrowser
from configs.config_colors import C, F
from PIL import Image
from utils.version import VERSION


# @TAG: view-sidebar
def sidebar(self):
    W = self.SB
    self.frame_sidebar = ctk.CTkFrame(
        master=self,
        fg_color=C["surface"],
        corner_radius=0,
        width=W,
    )
    self.frame_sidebar.pack(side="left", fill="y", padx=(0,5))
    self.frame_sidebar.pack_propagate(False)
    self.icon_WA_Sender = ctk.CTkImage(
        light_image=Image.open("media/icon-message-presentation.png"),
        dark_image=Image.open("media/icon-message-presentation.png"),
        size=(20, 20)
    )
    ctk.CTkLabel(
        master=self.frame_sidebar,
        image=self.icon_WA_Sender,
        compound="left",
        text=" WPP Sender",
        font=ctk.CTkFont(family=F, size=17, weight="bold"),
        text_color=C["text"],
        anchor="center",
    ).place(x=80, y=20)
    ctk.CTkLabel(
        master=self.frame_sidebar,
        text=F"Fkz Tech • v{VERSION}",
        font=ctk.CTkFont(family=F, size=12),
        text_color=C["muted"],
        anchor="center",
    ).place(x=106, y=46)
    ctk.CTkFrame(
        master=self.frame_sidebar,
        fg_color=C["border"],
        height=1,
    ).place(x=16, y=86, relwidth=1.0)
    self.pill = ctk.CTkFrame(
        master=self.frame_sidebar,
        fg_color=C["danger_bg"],
        corner_radius=8,
        width=W - 32,
        height=32,
    )
    self.pill.place(x=16, y=100)
    self.lbl_status = ctk.CTkLabel(
        master=self.pill,
        text="  ●  Desconectado",
        font=ctk.CTkFont(family=F, size=13, weight="bold"),
        text_color=C["danger"],
    )
    self.lbl_status.place(relx=0.5, rely=0.5, anchor="center")
    self.btn_connect = ctk.CTkButton(
        master=self.frame_sidebar,
        text="Conectar WhatsApp",
        height=44,
        width=W - 32,
        fg_color=C["green"],
        hover_color=C["green_d"],
        font=ctk.CTkFont(family=F, size=15, weight="bold"),
        text_color="#000",
        corner_radius=10,
        command=self._connect,
    )
    self.btn_connect.place(x=16, y=144)
    self.btn_disconnect = ctk.CTkButton(
        master=self.frame_sidebar,
        text="Desconectar",
        width=W - 32,
        fg_color=C["card2"],
        hover_color=C["danger_bg"],
        font=ctk.CTkFont(family=F, size=13),
        text_color=C["muted"],
        corner_radius=10,
        border_width=1,
        border_color=C["border"],
        state="disabled",
        command=self._disconnect,
    )
    self.btn_disconnect.place(x=16, y=196)
    ctk.CTkFrame(
        master=self.frame_sidebar,
        fg_color=C["border"],
        height=1,
    ).place(x=16, y=244, relwidth=1.0)
    ctk.CTkLabel(
        master=self.frame_sidebar,
        text="ESTATÍSTICAS DO ENVIO ATUAL",
        font=ctk.CTkFont(family=F, size=14, weight="bold"),
        text_color=C["muted"],
    ).place(x=25, y=258)
    cw = (W - 40 - 8) // 2
    ch = 88
    cy = 284
    def counter_card(label, color, x, y):
        card = ctk.CTkFrame(
            master=self.frame_sidebar,
            fg_color=C["card"],
            corner_radius=10,
            border_width=1,
            border_color=C["border"],
            width=cw,
            height=ch,
        )
        card.place(x=x, y=y)
        num = ctk.CTkLabel(
            master=card,
            text="0",
            font=ctk.CTkFont(family=F, size=24, weight="bold"),
            text_color=color,
        )
        num.place(relx=0.5, y=12, anchor="n")
        ctk.CTkLabel(
            master=card,
            text=label,
            font=ctk.CTkFont(family=F, size=12, weight="bold"),
            text_color=C["muted"],
        ).place(relx=0.5, rely=1.0, anchor="s", y=-10)
        return num
    self.cnt_sent    = counter_card("ENVIADOS",       C["green"],  20,       cy)
    self.cnt_nfound  = counter_card("NÃO\nENCONTRADO", C["nfound"], 20+cw+8,  cy)
    self.cnt_skipped = counter_card("PULADOS",        C["muted"],  20,       cy+ch+8)
    self.cnt_error   = counter_card("ERROS",          C["danger"], 20+cw+8,  cy+ch+8)
    self.btn_help = ctk.CTkButton(
        master=self,
        width=100,
        height=20,
        font=ctk.CTkFont(family=F, size=12, weight="bold", underline=True),
        text= "PRECISA DE AJUDA?",
        text_color="red",
        fg_color=C["surface"], bg_color=C["surface"],
        hover_color="black",
        command=self._help,
    )
    self.btn_help.place(x=70, y=765)
