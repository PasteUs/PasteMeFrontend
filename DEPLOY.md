# Deployment

1. Download and unzip `pasteme.tar.gz` from [release](https://github.com/PasteUs/PasteMeFrontend/releases/latest)
2. Edit `usr/config.json`

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
    "backend": "/api/v3/",
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
