from django.contrib import admin
from .models import Auctionable, Bid, Category, Transaction, AuctionableImage

admin.site.register(Bid)
admin.site.register(Category)
admin.site.register(Transaction)


class AuctionableImageInline(admin.TabularInline):
    model = AuctionableImage
    extra = 3


class AuctionableAdmin(admin.ModelAdmin):
    inlines = [AuctionableImageInline, ]


admin.site.register(Auctionable, AuctionableAdmin)
