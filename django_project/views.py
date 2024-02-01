from django.shortcuts import render
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.urls import reverse


def index(request):
    return render(request, 'index.html')

def logout_view(request):
    logout(request)
    return redirect(reverse('login'))