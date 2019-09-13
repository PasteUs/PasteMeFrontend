# Deployment

1. Clone [PasteUs/PasteMeFrontend@dist/master](https://github.com/PasteUs/PasteMeFrontend/tree/dist/master) into local
2. Edit `usr/config.json`
3. Rewrite all requests to `index.html`

## usr/config.json

| Name | Value | Description | Example |
| :---: | :---: | --- | --- |
| api | URL | Backend's address | `/api/` |
| footer | JSON Array | Custom frontend footer's link | `[]` |
| footer.url | URL | Link's URL | `http://blog.lucien.ink/go/csdn` |
| footer.text | Text | Link's text | `CSDN` |

```json
{
  "api": "<protocol>://<domain>/<path>/api/",
  "footer": [
    {
      "url": "http(s)://<custom_address_0>",
      "text": "<custom_text_0>"
    },
    {
      "url": "http(s)://<custom_address_1>",
      "text": "<custom_text_1>"
    }
  ]
}
```

## Rewrite (required)

### Nginx

```
location / {
    try_files $uri $uri/ /index.html;
}
```
