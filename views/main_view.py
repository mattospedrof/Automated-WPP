import customtkinter as ctk
from configs.config_colors import C, F
from views.file_card     import file_card
from views.message_card  import message_card
from views.config_card   import config_card
from views.progress_card import progress_card
from views.log_card      import log_card


# @TAG: view-main
def main_view(self):
    P = self.P
    self.frame_main = ctk.CTkFrame(
        master=self,
        fg_color=C["bg"],
        corner_radius=0,
    )
    self.frame_main.pack(side="right", fill="both", expand=True,)
    self.scroll_main = ctk.CTkScrollableFrame(
        master=self.frame_main,
        fg_color=C["bg"],
        corner_radius=0,
        scrollbar_button_color=C["border2"],
        scrollbar_fg_color=C["surface"],
    )
    self.scroll_main.pack(fill="both", expand=True, padx=(10, 0), pady=(10,0))
    file_card(self)
    self.frame_mid = ctk.CTkFrame(
        master=self.scroll_main,
        fg_color="transparent",
        height=self.H_MID,
    )
    self.frame_mid.pack(fill="x", pady=(0, P))
    message_card(self)
    config_card(self)
    progress_card(self)
    log_card(self)
