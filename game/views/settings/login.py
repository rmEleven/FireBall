from django.http import JsonResponse
from django.contrib.auth import authenticate, login


def signin(request):
    data = request.GET
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if not user:  # 找不到符合的用户
        return JsonResponse({
            'result': '用户名或密码不正确',
        })
    else:  # 找到符合的用户
        login(request, user)
        return JsonResponse({
            'result': 'success',
        })