# FireBall

## 基本操作

### 配置环境

#### 1. 安装 python3

sudo apt update

sudo apt install python3

python3 --version

#### 2. 创建、激活、停用虚拟环境

sudo apt install virtualenv

virtualenv djangoenv

source djangoenv/bin/activate

deactivate

#### 3. 安装 django

pip install django

django-admin --version

### 运行项目

#### 1. 创建 django 项目

django-admin startproject FireBall

创建一个名为 `FireBall` 的 Django 项目

#### 2. 创建应用程序

python3 manage.py startapp game

创建一个名为 `game` 的应用程序

#### 3. 定义模型

python manage.py makemigrations 创建数据库表

python manage.py migrate 进行数据库迁移

#### 4. 运行开发服务器

python3 manage.py runserver 0.0.0.0:8000

在 `FireBall/settings.py` 文件的 `ALLOWED_HOSTS` 里添加 `"8.130.68.215"`

访问 `http://8.130.68.215:8000/` 看到页面

服务器要开放 8000 端口

#### 5. 访问管理员页面

python3 manage.py createsuperuser 创建管理员用户

在 `http://8.130.68.215:8000/admin/` 页面进行登录和访问

### 项目结构

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

