from django.urls import reverse
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView

class CricketScoreCounter(TemplateView):
    template_name = 'cricket_score_counter.html'
    
class CricketScoreViewer(TemplateView):
    template_name = 'cricket_score_viewer.html'