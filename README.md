# FireBall

## 一、基本操作

### 配置环境

#### 1. 安装 python3

`sudo apt update`

`sudo apt install python3`

`python3 --version`

#### 2. 创建、激活、停用虚拟环境

`sudo apt install virtualenv`

`virtualenv djangoenv`

`source djangoenv/bin/activate`

`deactivate`

#### 3. 安装 django

`pip install django`

`django-admin --version`

### 运行项目

#### 1. 创建 django 项目

`django-admin startproject FireBall`

创建一个名为 `FireBall` 的 Django 项目

#### 2. 创建应用程序

`python3 manage.py startapp game`

创建一个名为 `game` 的应用程序

#### 3. 定义模型

`python manage.py makemigrations`

创建数据库表

`python manage.py migrate`

进行数据库迁移

#### 4. 运行开发服务器

`python3 manage.py runserver 0.0.0.0:8000`

在 `FireBall/settings.py` 文件的 `ALLOWED_HOSTS` 里添加 `"8.130.68.215"`

访问 `http://8.130.68.215:8000/` 看到页面

服务器要开放 8000 端口

#### 5. 访问管理员页面

`python3 manage.py createsuperuser`

创建管理员用户

在 `http://8.130.68.215:8000/admin/` 页面进行登录和访问

## 二、项目结构

```
├── db.sqlite3  # SQLite数据库文件，用于存储应用程序的数据。
│
├── FireBall         # Django 项目的主要目录，它包含了项目的配置和主要代码。
│   ├── asgi.py      # ASGI（异步服务器网关接口）应用程序的入口点，用于异步支持。
│   ├── __init__.py  # 一个空的 Python 文件，指示 FireBall 文件夹是一个 Python 包。
│   ├── __pycache__  # Python 生成的字节码文件的缓存目录。
│   │   ├── ...
│   │   └── ...
│   ├── settings.py  # Django 项目的配置文件，包含了项目的设置和参数。
│   ├── urls.py      # 定义项目的 URL 路由映射，将 URL 请求分发给相应的视图函数。
│   └── wsgi.py      # WSGI（Web 服务器网关接口）应用程序的入口点，用于传统的同步服务器。
│
├── game             # 一个 Django 应用程序，它是项目的一个模块。
│   ├── admin.py     # 用于配置 Django 管理后台的文件，可以在此注册模型以供管理。
│   ├── apps.py      # Django 应用程序的配置文件，用于定义应用程序的元数据。
│   ├── __init__.py  # 一个空的 Python 文件，指示 game 文件夹是一个 Python 包。
│   ├── migrations   # 包含数据库迁移文件的目录，用于管理数据库模式的变更。
│   ├── models.py    # 定义 Django 模型的文件，描述了应用程序的数据结构。
│   ├── tests.py     # 用于编写应用程序的测试用例的文件。
│   └── views.py     # 包含处理应用程序请求的视图函数的文件。
│
├── manage.py        # Django 项目的命令行工具，用于执行各种管理任务，如运行开发服务器、数据库迁移等。
│
└── README.md        # 项目的说明文档，通常包含项目的介绍、安装说明和其他相关信息。
```

## 三、部署

### 部署 nginx

#### 1. 安装 nginx

`sudo apt install nginx`

#### 2. 配置文件

需要获取 域名、nginx配置文件 及 https证书

将 `nginx.conf` 中的内容写入服务器 `/etc/nginx/nginx.conf` 文件中。

将 `acapp.key` 中的内容写入服务器 `/etc/nginx/cert/acapp.key` 文件中。

将 `acapp.pem` 中的内容写入服务器 `/etc/nginx/cert/acapp.pem` 文件中。

#### 3. 启动 nginx 服务

`sudo /etc/init.d/nginx start`

#### 4. 检查 nginx 服务的状态

`sudo systemctl status nginx`

#### 5. 重启 nginx 服务

在 `/var/log/nginx/error.log` 文件内查看问题

在 `/etc/nginx/nginx.conf` 文件内修改问题

`sudo nginx -s reload` 重启服务

### 修改 django 项目配置 

打开 `settings.py` 文件：

将分配的域名添加到 `ALLOWED_HOSTS` 列表中。注意只需要添加 `https://` 后面的部分。

令 `DEBUG = False`

归档 `static` 文件：`python3 manage.py collectstatic`

### 配置 uwsgi

#### 1. 安装 uwsgi

`sudo apt install uwsgi`

`uwsgi --version`

#### 2. 安装适用于选择的语言的插件

查看列表中的插件包名称，找到适合您的语言的包名称

`apt-cache search uwsgi-plugin`

安装合适的语言的包

`sudo apt install uwsgi-plugin-python3`

#### 3. 添加 uwsgi 的配置文件

`scripts/uwsgi.ini`

```
[uwsgi]
socket          = 127.0.0.1:8000
chdir           = /home/eleven/djangoenv/FireBall
wsgi-file       = FireBall/wsgi.py
master          = true
processes       = 2
threads         = 5
vacuum          = true
```

#### 4. 启动 uwsgi 并加载插件

`uwsgi --plugin python3 --ini scripts/uwsgi.ini`

## 四、拓展操作

### 集成 Redis

#### 0. 介绍

Redis（Remote Dictionary Server）是一个开源的内存数据存储系统，也被称为键值存储数据库。它提供了一个高性能、持久化的数据结构服务器，可用作数据库、缓存和消息中间件。

以下是 Redis 的一些主要特点：

1. 内存存储：Redis 将数据存储在内存中，因此非常快速。它通过将数据保持在内存中，以实现低延迟的读写操作。

2. 数据结构多样性：Redis 支持多种数据结构，包括字符串（Strings）、哈希（Hashes）、列表（Lists）、集合（Sets）和有序集合（Sorted Sets）。这使得 Redis 可以灵活地存储和操作不同类型的数据。

3. 持久化：Redis 可以将数据持久化到磁盘中，以防止数据丢失。它提供了两种持久化方式：RDB（Redis Database）快照和 AOF（Append-Only File）日志。RDB 快照是将数据以二进制格式保存在磁盘上，而 AOF 日志则是将操作日志追加到文件中。

4. 高性能：由于 Redis 将数据存储在内存中，并使用了一些优化策略，如异步操作和非阻塞 I/O，它能够提供非常高的读写性能和吞吐量。

5. 分布式支持：Redis 提供了一些分布式功能，如主从复制和分片（Sharding），使得它可以在多台服务器上进行数据复制和分布式存储，以实现高可用性和扩展性。

6. 支持丰富的功能：Redis 还提供了一些其他功能，如事务支持、发布订阅（Pub/Sub）消息模式、Lua 脚本执行、过期键管理等。

Redis 被广泛应用于许多场景，如缓存、会话存储、排行榜、计数器、实时消息传递等。它易于使用，具有高性能和灵活的数据结构，使得它成为许多应用程序的首选数据存储解决方案之一。

#### 1. 安装 Redis 和 django_redis

`sudo apt update`

`sudo apt install redis-server`

`redis-server --version`

`pip install django-redis`

#### 2. 配置 settings.py

```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    },
}
USER_AGENTS_CACHE = 'default'
```

#### 3. 启动 redis-server

`sudo redis-server /etc/redis/redis.conf`

#### 4. 基本用法

`from django.core.cache import cache`

`cache.keys('*')`

`cache.set('wh', 1, 3)`

`cache.set('wh', 1, None)`

`cache.has_key('wh')`

`cache.get('wh')`

`cache.delete('wh')`

### 数据库迁移 slite -> mysql