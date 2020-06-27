# Deployment

1. Download and unzip `pasteme.tar.gz` from [release](https://github.com/PasteUs/PasteMeFrontend/releases/latest)
2. Edit `usr/config.json`
3. Rewrite all requests to `index.html`

## 1. usr/config.json

| Name | Value | Description | Example |
| :---: | :---: | --- | --- |
| api.backend | URL | Backend's address | `/api/` |
| api.admin | URL | Admin's address | `` |
| footer | JSON Array | Custom frontend footer's link | `[]` |
| footer.url | URL | Link's URL | `http://blog.lucien.ink/go/csdn` |
| footer.text | Text | Link's text | `CSDN` |

### 1.1 Example

> usr/config.example.json

```json
{
  "api": {
    "backend": "/_api/backend/",
    "admin": ""
  },
  "footer": [
    {
      "url": "http://blog.lucien.ink/go/csdn",
      "text": "CSDN"
    },
    {
      "url": "http://www.miitbeian.gov.cn/",
      "text": "鲁ICP备18007563号"
    }
  ]
}
```

## 2. Rewrite (required)

### 2.1 Nginx

```
location / {
    try_files $uri $uri/ /index.html;
}
```
