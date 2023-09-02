#! /bin/bash

JS_PATH=/home/eleven/djangoenv/FireBall/game/static/js/
JS_PATH_DIST=${JS_PATH}dist/
JS_PATH_SRC=${JS_PATH}src/

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat | terser -c -m > ${JS_PATH_DIST}game.js

# terser 是一个流行的 JavaScript 压缩工具，可以帮助减小 JavaScript 文件的大小，并提高加载性能。
# -c，即 --compress，用于启用压缩功能。它会对 JavaScript 代码进行各种优化，例如删除无用的空格、注释、重复的代码等，以减小文件大小。
# -m，即 --mangle，用于启用混淆功能。它会对 JavaScript 代码中的变量和函数名进行简化和混淆，以减小可读性。

echo yes | python manage.py collectstatic
