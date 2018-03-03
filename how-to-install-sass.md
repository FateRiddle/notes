### 如何安装 Sass

Mac:

Sass 只能用 Ruby gem（和 JavaScript npm 一样）安装。\
和 npm 一样，国人需要求助于镜像\
淘宝的 ruby 镜像似乎已经不能用。腾讯云 ruby-china 可用。\

```bash
gem sources --remove https://rubygems.org
gem sources -a http://gems.ruby-china.org

# 查看切换是否成功
gem source -v
```

然后

```bash
(sudo) gem install sass

#查看安装是否成功
sass -v
```
