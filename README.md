## use
### 生成配置文件config.json
```

// 支持的站点 ourbits ttg mteam
{
  "ourbits": {
    "username": "",
    "password": "",
    "passkey": "",
    "count":5 //检查的条目
  },
  "cron":20 // 扫描间隔分钟 1-60, 默认20, 避免太短封号
}
```
### 挂载配置文件和种子目录

docker run -d -v 本机config.json地址:/app/config.json -v 本机种子监听目录:/data enhay/pt
