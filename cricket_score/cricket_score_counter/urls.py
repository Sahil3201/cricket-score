from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views

app_name = 'cricket_score_counter'

urlpatterns = [
    url(r"^CricketScoreCounter/",views.CricketScoreCounter.as_view(),name="CricketScoreCounter"),
    url(r"^CricketScoreViewer/",views.CricketScoreViewer.as_view(),name="CricketScoreCounter"),
]
