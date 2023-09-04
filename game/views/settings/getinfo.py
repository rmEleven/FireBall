from django.http import JsonResponse
from game.models.player.player import Player


def getinfo_acapp(request):
    user = request.user
    if not user.is_authenticated:  # 未登录
        return JsonResponse({
            'result': '未登录',
        })
    else:  # 已登录
        player = Player.objects.all()[0]  # 获取第一个用户
        return JsonResponse({
            'result': 'success',
            'username': player.user.username,
            'photo': player.photo,
        })

def getinfo_web(request):
    user = request.user
    if not user.is_authenticated:  # 未登录
        return JsonResponse({
            'result': '未登录',
        })
    else:  # 已登录
        player = Player.objects.all()[0]  # 获取第一个用户
        return JsonResponse({
            'result': 'success',
            'username': player.user.username,
            'photo': player.photo,
        })

def getinfo(request):
    platform = request.GET.get('platform')
    if platform == 'ACAPP':
        return getinfo_acapp(request)
    elif platform == "WEB":
        return getinfo_web(request)