# 用 scatter 在私链上玩 scatter

## 配置 scatter

### 创建身份

1. 找到 scatter 中绑定的公钥, 或者创建新公钥
2. 使用该公钥在私链上创建 account, 如 alice

### 在 scatter 中配置私链和 identity

1. 配置网络
    - scatter主页 -> 右上角设置 —> 网络 —> 新建
    - 名称配置成 dev
	- 选择协议 https 或 http
	    如: http
	- 配置host 为侧链地址
	    如 127.0.0.1
	- 配置端口 为侧链端口
	    如 7777
	- 配置 chain_id (一般情况下 chainid 可以从节点API的 /v1/chain/get_info 里拿到)

2、导入身份
    - scatter主页 -> 身份 —> 新建
    - 网络选择 dev
    - 身份选择 active 身份, 如 alice@active

### 游玩

1. 打开连接到私链的 Dapp
2. 按照提示选择身份