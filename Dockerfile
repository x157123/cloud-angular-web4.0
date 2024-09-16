# 使用 Node.js 镜像来构建项目
FROM node:22-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有）到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install --production

# 复制所有文件到工作目录
COPY . .

# 构建 Angular 项目
RUN npm run build && npm cache clean --force

# 使用 Nginx 来服务静态文件
FROM nginx:alpine

# 复制 Angular 构建输出到 Nginx 的默认目录
COPY --from=build /app/dist/cloud-angular-web4.0 /usr/share/nginx/html

# 将Nginx的配置文件拷贝到容器中，解决Angular路由404的问题
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 Nginx 默认端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
