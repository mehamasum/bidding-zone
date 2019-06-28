from rest_framework.pagination import CursorPagination


class CreatedBasedCursorPagination(CursorPagination):
    ordering = '-added'
