from django.contrib import admin
from .models import Auctionable, Bid, Category, Transaction


admin.site.register(Bid)
admin.site.register(Auctionable)
admin.site.register(Category)
admin.site.register(Transaction)