from django.urls import path
from .views import GenerateContentView, HistoryView

urlpatterns = [
    path("generate/", GenerateContentView.as_view()),
    path("history/", HistoryView.as_view()),
]