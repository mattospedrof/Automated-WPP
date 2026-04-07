import tkinter as tk
from tkinter import messagebox


# @TAG: notify-user
def notify_user(title_popup, ntf_message):
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)

    messagebox.showinfo(title_popup, ntf_message)

    root.destroy()
