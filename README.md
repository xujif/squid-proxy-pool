## proxy pool of squid
proxy service at port 3128  
control service at port 3000

## API  

#### Get proxys
```
POST /proxys
```
BODY
```
["http://user:passwd@ip:port","http://user:passwd@ip:port"]

```

#### Get current proxy config
```
GET /proxys
```
