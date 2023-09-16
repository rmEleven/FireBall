from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player


def register(request):
    data = request.GET
    username = data.get('username', '').strip()  # 获取用户名 没有则为空 去掉前后空格
    password = data.get('password', '').strip()  # 获取密码 没有则为空 去掉前后空格
    repassword = data.get('repassword', '').strip()  # 获取确认密码 没有则为空 去掉前后空格

    if not username or not password:
        return JsonResponse({
            'result': '用户名和密码不能为空',
        })
    if password != repassword:
        return JsonResponse({
            'result': '两次输入密码不一致',
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': '用户名已存在',
        })
    
    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user, photo='https://img.freepik.com/premium-vector/cartoon-cat-cute-animal-doodle-kawaii-anime-coloring-page-cute-illustration-clip-art-character_51194-679.jpg?w=2000')
    login(request, user)
    return JsonResponse({
        'result': 'success',
    })