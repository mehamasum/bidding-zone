from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "categories"
    
    def __str__(self):
        return self.name


class Auctionable(models.Model):
    ON_AUCTION = 'ON_AUCTION'
    SOLD = 'SOLD'
    HIDDEN = 'HIDDEN'
    ITEM_STATUS_CHOICES = [
        (ON_AUCTION, 'On auction'),
        (SOLD, 'Sold'),
        (HIDDEN, 'Hidden'),
    ]

    name = models.CharField(max_length=255)
    description = models.CharField(max_length=2048, blank=True, null=True)
    units = models.IntegerField()
    status = models.CharField(
        max_length=128,
        choices=ITEM_STATUS_CHOICES,
        default=ON_AUCTION,
    )
    user = models.ForeignKey(User, models.CASCADE)
    added = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, models.CASCADE)
    base_price = models.DecimalField(
        default=0.00, max_digits=6, decimal_places=2)
    ending = models.DateTimeField()

    class Meta:
        verbose_name = "Auctionable item"

    def __str__(self):
        return self.name


class AuctionableImage(models.Model):
    item = models.ForeignKey(Auctionable, models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='auctionable_images/')


class Bid(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    item = models.ForeignKey(Auctionable, models.CASCADE)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} placed a bid of {self.amount} on {self.item}'


class Transaction(models.Model):
    PENDING = 'PENDING'
    COMPLETE = 'COMPLETE'
    TRANSCATION_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (COMPLETE, 'Complete'),
    ]

    bid = models.ForeignKey(Bid, models.CASCADE)
    status = models.CharField(
        max_length=128,
        choices=TRANSCATION_STATUS_CHOICES,
        default=PENDING,
    )
