from django.http import JsonResponse
from django.contrib.auth import logout

def signout(request):
    user = request.user
    if not user.is_authenticated:  # 没有登录
        return JsonResponse({
            'result': 'success',
        })
    else:  # 已经登录
        logout(request)
        return JsonResponse({
            'result': 'success',
        })