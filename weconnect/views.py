from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib import messages
from django.contrib.auth import authenticate, login

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # Check if username is taken
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already taken!")
            return redirect('signup')
        
        # Create new user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        
        # Log the user in after signup
        login(request, user)
        messages.success(request, "Signup successful!")
        return redirect('home')  
    
    return render(request, 'signup.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "Login successful!")
            return redirect('home')  # Redirect to homepage or dashboard
        else:
            messages.error(request, "Invalid credentials!")
            return redirect('login.html')
    
    return render(request, 'index.html')

# Create your views here.
def index_view(request):
    return render(request, 'index.html')    