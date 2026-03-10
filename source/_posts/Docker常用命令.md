---
title: Docker常用命令
tags: DevOps
date: 2026-03-10 14:34:41
categories:
  - 技术
---

Docker 是一个开源的容器化平台，它让开发者能够将应用程序及其依赖打包成一个轻量级、可移植的容器，然后在任何支持 Docker 的环境中运行。无论是开发、测试还是生产环境，Docker 都能保证应用运行的一致性。本文将系统介绍 Docker 的常用命令，帮助读者快速上手并熟练使用 Docker。

## 1. 安装 Docker

在开始之前，你需要先安装 Docker。访问 [Docker 官网](https://www.docker.com/get-started) 下载对应操作系统的安装包。安装完成后，打开终端验证是否安装成功：

```bash
docker --version
```

如果看到类似 `Docker version 24.0.7, build afdd53b` 的输出，说明安装成功。

## 2. Docker 基本概念

在深入命令之前，先了解几个核心概念：

- **镜像（Image）**：一个只读的模板，包含了运行应用程序所需的文件系统、依赖库和环境配置。可以理解为容器的“源代码”。
- **容器（Container）**：镜像的运行实例。容器是轻量级、可隔离的运行环境，类似于一个简易的 Linux 系统。
- **仓库（Repository）**：集中存放镜像的地方。最常用的公共仓库是 Docker Hub。

## 3. 镜像管理命令

### 3.1 搜索镜像

```bash
docker search <镜像名>
```

示例：搜索 nginx 镜像

```bash
docker search nginx
```

### 3.2 拉取镜像

从仓库下载镜像到本地：

```bash
docker pull <镜像名>[:标签]
```

如果不指定标签，默认拉取 `latest` 标签。
示例：

```bash
docker pull ubuntu:20.04
```

### 3.3 列出本地镜像

```bash
docker images
```

或

```bash
docker image ls
```

### 3.4 删除镜像

```bash
docker rmi <镜像ID或镜像名:标签>
```

示例：

```bash
docker rmi ubuntu:20.04
```

如果镜像被容器使用，需要先删除容器或使用 `-f` 强制删除（谨慎使用）。

### 3.5 构建镜像

通过 Dockerfile 构建自定义镜像：

```bash
docker build -t <镜像名:标签> <Dockerfile路径>
```

示例：在当前目录下使用 Dockerfile 构建镜像，并命名为 myapp:v1

```bash
docker build -t myapp:v1 .
```

### 3.6 给镜像打标签

为本地镜像添加新的标签（可用于推送到仓库）：

```bash
docker tag <原镜像名:原标签> <新镜像名:新标签>
```

示例：

```bash
docker tag myapp:v1 mydockerhub/myapp:latest
```

### 3.7 推送镜像到仓库

```bash
docker push <镜像名:标签>
```

注意：需要先登录 Docker Hub 或其他仓库。

```bash
docker login
docker push mydockerhub/myapp:latest
```

## 4. 容器管理命令

### 4.1 创建并启动容器

```bash
docker run [选项] <镜像名> [命令]
```

常用选项：

- `-d`：后台运行容器（守护态）
- `-it`：交互式运行，通常与 `/bin/bash` 配合
- `--name`：为容器指定名称
- `-p`：端口映射，格式为 `主机端口:容器端口`
- `-v`：挂载数据卷，格式为 `主机目录:容器目录`
- `--rm`：容器停止后自动删除

示例 1：运行一个交互式的 Ubuntu 容器

```bash
docker run -it --name myubuntu ubuntu:20.04 /bin/bash
```

示例 2：后台运行 Nginx 并映射端口

```bash
docker run -d --name mynginx -p 8080:80 nginx
```

### 4.2 列出容器

```bash
docker ps          # 只显示运行中的容器
docker ps -a       # 显示所有容器（包括已停止的）
```

### 4.3 启动/停止/重启容器

```bash
docker start <容器ID或名称>
docker stop <容器ID或名称>
docker restart <容器ID或名称>
```

### 4.4 进入运行中的容器

```bash
docker exec -it <容器ID或名称> /bin/bash
```

例如，进入刚才的 mynginx 容器：

```bash
docker exec -it mynginx /bin/bash
```

### 4.5 查看容器日志

```bash
docker logs <容器ID或名称>
```

添加 `-f` 可以持续跟踪日志输出：

```bash
docker logs -f mynginx
```

### 4.6 删除容器

```bash
docker rm <容器ID或名称>
```

如果要删除所有已停止的容器：

```bash
docker container prune
```

### 4.7 复制文件

从主机复制到容器：

```bash
docker cp <主机文件路径> <容器ID:容器内路径>
```

从容器复制到主机：

```bash
docker cp <容器ID:容器内路径> <主机文件路径>
```

## 5. 网络管理命令

Docker 默认提供几种网络模式：bridge、host、none。常用的自定义网络操作如下：

### 5.1 查看网络列表

```bash
docker network ls
```

### 5.2 创建网络

```bash
docker network create <网络名>
```

例如创建一个名为 mynet 的桥接网络：

```bash
docker network create mynet
```

### 5.3 连接容器到网络

```bash
docker network connect <网络名> <容器名>
```

### 5.4 断开容器与网络的连接

```bash
docker network disconnect <网络名> <容器名>
```

### 5.5 查看网络详情

```bash
docker network inspect <网络名>
```

## 6. 数据卷管理命令

数据卷用于持久化容器产生的数据，或共享数据。

### 6.1 查看数据卷

```bash
docker volume ls
```

### 6.2 创建数据卷

```bash
docker volume create <卷名>
```

### 6.3 查看数据卷详情

```bash
docker volume inspect <卷名>
```

### 6.4 删除数据卷

```bash
docker volume rm <卷名>
```

删除所有未使用的数据卷：

```bash
docker volume prune
```

### 6.5 在运行容器时挂载数据卷

有两种挂载方式：**卷挂载** 和 **绑定挂载**。

- 卷挂载（使用 Docker 管理的卷）：

```bash
docker run -d -v myvol:/app/data nginx
```

- 绑定挂载（直接挂载主机目录）：

```bash
docker run -d -v /host/data:/app/data nginx
```

推荐使用 `--mount` 语法，更清晰：

```bash
docker run -d --mount source=myvol,target=/app/data nginx
```

## 7. 其他常用命令

### 7.1 查看 Docker 系统信息

```bash
docker info
```

### 7.2 查看 Docker 版本

```bash
docker version
```

### 7.3 清理磁盘空间

删除所有停止的容器、未使用的网络、悬空镜像和构建缓存：

```bash
docker system prune
```

添加 `-a` 还会删除未被任何容器使用的镜像：

```bash
docker system prune -a
```

### 7.4 查看资源使用情况

```bash
docker stats
```

动态显示容器的 CPU、内存、网络 I/O 等信息。

## 8. 实战示例：运行一个 Nginx 容器并挂载自定义网页

下面通过一个完整的例子，将上述命令串联起来。

1. **创建一个目录用于存放网页文件**

   ```bash
   mkdir ~/myweb
   cd ~/myweb
   ```

2. **编写一个简单的 index.html**

   ```bash
   echo '<h1>Hello Docker!</h1>' > index.html
   ```

3. **拉取 nginx 镜像**

   ```bash
   docker pull nginx
   ```

4. **运行容器，将主机目录挂载到容器的 `/usr/share/nginx/html`**

   ```bash
   docker run -d --name mynginx -p 8080:80 -v ~/myweb:/usr/share/nginx/html nginx
   ```

5. **查看容器是否运行**

   ```bash
   docker ps
   ```

6. **访问测试**  
   打开浏览器，访问 `http://localhost:8080`，应该看到 "Hello Docker!"。

7. **查看日志**

   ```bash
   docker logs mynginx
   ```

8. **进入容器内部**

   ```bash
   docker exec -it mynginx /bin/bash
   ```

9. **停止并删除容器**
   ```bash
   docker stop mynginx
   docker rm mynginx
   ```

## 9. 总结

本文介绍了 Docker 最常用的命令，涵盖了镜像、容器、网络、数据卷等核心操作。掌握这些命令后，你已经能够独立使用 Docker 运行和管理大多数应用。Docker 的命令体系非常丰富，但基础命令已经能覆盖日常工作的 80% 场景。随着实践深入，可以进一步学习 Docker Compose、Docker Swarm 等高级工具，实现更复杂的容器编排。
