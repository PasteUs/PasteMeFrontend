# PasteMe 端到端测试

使用 `Python` 的 `selenium` + `unittest` 作为测试的载体

`GitHub Actions` 的镜像内置 `Chrome` 和 `chromedriver`，详见文档 [Ubuntu 18.04.5 LTS](https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu1804-README.md)

## 内部结构

所有单元测试的代码位于 [tests.py](../tests.py)

`e2e_test` 分为三部分:
1. `PasteMeDriver` 封装了 `selenium` 的一些操作
2. `MockBackend` + `Flask` 用内存作为数据库模拟了 `PasteMe` 的后端
3. [proxy.py](./proxy.py) 中的 `Flask` 用来作为反向代理

单元测试过程中，会分别开 3 个进程去启动上述 2、3，以及执行 `npm run serve` 命令。

`node` 会监听 `8080` 端口，作为前端的本地服务。

`MockBackend` 会监听 `8000` 端口，作为 `MockBackend`。

而 `proxy` 会监听 `3000` 端口，将 `Frontend` 和 `MockBackend` 编排起来。

最后单元测试会使用 `PasteMeDriver`（也就是 `selenium`）去对 `3000` 端口的网页上进行端到端测试。

## 相关资料

1. [Simple Reverse Proxy Server Using Flask](https://medium.com/customorchestrator/simple-reverse-proxy-server-using-flask-936087ce0afb)