from django.urls import path, include
from game.views.index import index

urlpatterns = [
    path('', index, name="index"),
    path('menu/', include('game.urls.menu.index')),              # 进入menu文件夹的路由
    path('playground/', include('game.urls.playground.index')),  # 进入playground文件夹的路由
    path('settings/', include('game.urls.settings.index')),      # 进入settings文件夹的路由
]