# 镜像部署

`iStock Shell`的所有服务都是通过`Docker`容器去部署，以实现高效、灵活且可扩展的部署与运维管理。

## 镜像命令

打包`iStock Shell`命令：

```shell
pnpm run build:docker
```

打包`iStock Shell文档`命令：

```shell
pnpm run docs:build:docker
```

## 最新镜像清单

- `iStock Shell`
  ```shell
  docker pull swr.cn-east-3.myhuaweicloud.com/istock/istock-shell:latest
  ```
- `iStock Shell Doc`：
  ```shell
  docker pull swr.cn-east-3.myhuaweicloud.com/istock/istock-shell-doc:latest
  ```
- `AKShare`：
  ```shell
  docker pull registry.cn-shanghai.aliyuncs.com/akfamily/aktools:1.13.88
  ```

## docker部署

- `iStock Shell`
  ```shell
  docker run -d -p 5173:80 --name istock-shell istock-shell:latest
  ```
- `iStock Shell Doc`
  ```shell
  docker run -d -p 5172:80 --name istock-shell-doc istock-shell-doc:latest
  ```
- `AKShare`
  ```shell
  docker run -d -p 8800:8080 ak_tools:1.13.88 python -m aktools --host 0.0.0.0 --port 8080
  ```

## docker compose部署

docker-compose.yml示例配置：

```shell
version: '3.1'
services:
  istock-shell:
    container_name: istock-shell
    image: swr.cn-east-3.myhuaweicloud.com/istock/istock-shell:latest
    restart: on-failure:5
    ports:
      - 5173:80

  istock-shell-doc:
    container_name: istock-shell-doc
    image: swr.cn-east-3.myhuaweicloud.com/istock/istock-shell-doc:latest
    restart: on-failure:5
    ports:
      - 5172:80

  istock-akshare:
    container_name: istock-akshare
    image: registry.cn-shanghai.aliyuncs.com/akfamily/aktools:1.13.88
    ports:
      - 8800:8080
    command: ["python", "-m", "aktools", "--host", "0.0.0.0", "--port", "8080"]
    restart: on-failure:5
```
