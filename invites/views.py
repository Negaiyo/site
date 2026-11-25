from django.shortcuts import render


def index(request):
    return render(request, 'invites/index.html')


def yes(request):
    return render(request, 'invites/yes.html')
