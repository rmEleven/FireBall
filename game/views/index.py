from django.shortcuts import render

def index(request):
    return render(request, "multiends/web.html")  # 路径从templates后面开始