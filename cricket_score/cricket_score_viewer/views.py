from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'cricket_score_viewer/index.html')

def room(request, room_name):
    return render(request, 'cricket_score_viewer/room.html', {
        'room_name': room_name
    })