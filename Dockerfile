FROM nginx:stable-alpine

COPY ./dist /usr/share/nginx/html

# 如果需要，复制自定义的 Nginx 配置文件
#COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# 设置容器启动后的命令，这里使用 Nginx 的默认命令
CMD ["nginx", "-g", "daemon off;"]