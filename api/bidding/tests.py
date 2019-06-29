from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Auctionable, Category, Bid
from django.contrib.auth.models import User
from django.utils import timezone


def get_datetime_in_future(days=0):
    return timezone.now() + timezone.timedelta(days=days)


class AuctionableCreateTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="joe", password="password", email="joe@foo.com")
        self.category_books = Category.objects.create(name='books')

    def test_failed_create_when_user_not_logged_in(self):
        url = reverse('auctionable-list')
        data = {
            'name': 'great book',
            'description': 'you should get this one',
            'units': 1,
            'ending': str(get_datetime_in_future(1)),
            'category': self.category_books.id,
            'base_price': 100.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Auctionable.objects.count(), 0)

    def test_failed_create_when_ending_is_not_in_future(self):
        url = reverse('auctionable-list')
        self.client.login(username="joe", password="password")
        data = {
            'name': 'great book',
            'description': 'you should get this one',
            'units': 1,
            'ending': str(get_datetime_in_future(-1)),
            'category': self.category_books.id,
            'base_price': 100.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Auctionable.objects.count(), 0)

    def test_successful_create(self):
        url = reverse('auctionable-list')
        self.client.login(username="joe", password="password")

        data = {
            'name': 'great book',
            'description': 'you should get this one',
            'units': 1,
            'ending': str(get_datetime_in_future(1)),
            'category': self.category_books.id,
            'base_price': 100.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Auctionable.objects.count(), 1)
        self.assertEqual(response.data['name'], data['name'])


class AuctionableUpdateTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="joe", password="password", email="joe@foo.com")
        self.other_user = User.objects.create_user(
            username="john", password="password", email="john@foo.com")
        self.category_books = Category.objects.create(name='books')
        self.item = Auctionable.objects.create(
            name="a book",
            description="foo bar",
            units=1,
            ending=get_datetime_in_future(1),
            category=self.category_books,
            base_price=100.00,
            user=self.user
        )

    def test_failed_update_when_user_not_logged_in(self):
        url = reverse('auctionable-detail', args=[self.item.id])
        data = {
            'name': 'changed book name',
            'units': 10,
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_failed_update_when_user_not_item_owner(self):
        url = reverse('auctionable-detail', args=[self.item.id])
        self.client.login(username="john", password="password")
        data = {
            'name': 'changed book name',
            'units': 10,
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_successful_update(self):
        url = reverse('auctionable-detail', args=[self.item.id])
        self.client.login(username="joe", password="password")
        data = {
            'name': 'changed book name',
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], data['name'])


class AuctionableDeleteTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="joe", password="password", email="joe@foo.com")
        self.other_user = User.objects.create_user(
            username="john", password="password", email="john@foo.com")
        self.category_books = Category.objects.create(name='books')
        self.item = Auctionable.objects.create(
            name="a book",
            description="foo bar",
            units=1,
            ending=get_datetime_in_future(1),
            category=self.category_books,
            base_price=100.00,
            user=self.user
        )

    def test_failed_delete_when_user_not_logged_in(self):
        url = reverse('auctionable-detail', args=[self.item.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_failed_delete_when_user_not_item_owner(self):
        url = reverse('auctionable-detail', args=[self.item.id])
        self.client.login(username="john", password="password")
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_successful_delete(self):
        url = reverse('auctionable-detail', args=[self.item.id])
        self.client.login(username="joe", password="password")
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Auctionable.objects.count(), 0)


class AuctionableRetrieveTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="joe", password="password", email="joe@foo.com")
        self.category_books = Category.objects.create(name='books')
        self.item = Auctionable.objects.create(
            name="a book",
            description="foo bar",
            units=1,
            ending=get_datetime_in_future(1),
            category=self.category_books,
            base_price=100.00,
            user=self.user
        )
        self.old_item = Auctionable.objects.create(
            name="an old book",
            description="foo bar",
            units=1,
            status=Auctionable.SOLD,
            ending=get_datetime_in_future(-1),
            category=self.category_books,
            base_price=100.00,
            user=self.user
        )

    def test_failed_retrieve_when_user_not_logged_in(self):
        url = reverse('auctionable-detail', args=[self.item.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_failed_retrieve_many_when_user_not_logged_in(self):
        url = reverse('auctionable-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_sucessful_retrieve(self):
        self.client.login(username="joe", password="password")
        url = reverse('auctionable-detail', args=[self.item.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'a book')

    def test_sucessful_retrieve_many(self):
        self.client.login(username="joe", password="password")
        url = reverse('auctionable-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['name'], 'a book')

    def test_sold_item_retrieve(self):
        self.client.login(username="joe", password="password")
        url = reverse('auctionable-detail', args=[self.old_item.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'an old book')

    def test_sold_item_excluded_in_list(self):
        self.client.login(username="joe", password="password")
        url = reverse('auctionable-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertNotEqual(response.data['results'][0]['name'], 'an old book')


class BidTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="joe", password="password", email="joe@foo.com")
        self.other_user = User.objects.create_user(
            username="john", password="password", email="john@foo.com")
        self.category_books = Category.objects.create(name='books')
        self.item = Auctionable.objects.create(
            name="a book",
            description="foo bar",
            units=1,
            ending=get_datetime_in_future(1),
            category=self.category_books,
            base_price=100.00,
            user=self.user
        )
        self.another_item = Auctionable.objects.create(
            name="another book",
            description="foo bar",
            units=1,
            ending=get_datetime_in_future(1),
            category=self.category_books,
            base_price=100.00,
            user=self.user
        )
        self.old_item = Auctionable.objects.create(
            name="an old book",
            description="foo bar",
            units=1,
            status=Auctionable.SOLD,
            ending=get_datetime_in_future(-1),
            category=self.category_books,
            base_price=100.00,
            user=self.user
        )
        self.bid = Bid.objects.create(
            amount=105.00,
            user=self.user,
            item=self.item
        )

    def test_sucessful_bid(self):
        self.client.login(username="john", password="password")
        url = reverse('auctionable-place-bid', args=[self.item.id])
        data = {
            'amount': '110.00',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['amount'], data['amount'])
        self.assertEqual(Bid.objects.filter(item=self.item).count(), 2)

    def test_failed_bid_with_lower_then_current_bid(self):
        self.client.login(username="john", password="password")
        url = reverse('auctionable-place-bid', args=[self.item.id])
        data = {
            'amount': '102.00',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_failed_bid_with_lower_then_base_price(self):
        self.client.login(username="john", password="password")
        url = reverse('auctionable-place-bid', args=[self.another_item.id])
        data = {
            'amount': '99.00',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_failed_bid_on_sold_item(self):
        self.client.login(username="john", password="password")
        url = reverse('auctionable-place-bid', args=[self.old_item.id])
        data = {
            'amount': '110.00',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)