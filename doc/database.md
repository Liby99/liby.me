# DATABASE

-----

## user

> 应该就只会存在一个用户。仅仅为了管理员端口登录用

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| UUID | CHAR(36) | id of the user |
| username | CHAR(20) | the username of the user |
| password | CHAR(256) | the password of the user |
| login_time | int | the times that the user logins |
| last_login | DATETIME | the time that this user last login |

-----

## article

> 文章

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| AUID | CHAR(36) | id of the article |
| username | CHAR(100) | the username of the user who post this article (should only be liby99) |
| post_time | DATETIME | the date time the article was posted |
| image | CHAR(100) | the main image src of the article |
| title | VARCHAR(100) | the title of the article |
| subtitle | VARCHAR(100) | the subtitle of the article |
| tag | VARCHAR(200) | the tags of the article. separated by comma. e.g. fate/stay night,fate/zero |
| content | MEDIUMTEXT | the article content |
| view_time | int | the amount of visit to this article |

-----

## project

> 项目表

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| PUID | CHAR(36) | project uuid |
| name | VARCHAR(100) | the name of the project |
| image | CHAR(100) | the main image src of the project |
| url | CHAR(100) | the url of the project |

-----

## artwork

| key | type | comment |
|------|-----|---------|
| id | int | primary key |
| AUID | CHAR(36) | artwork uid |
| username | CHAR(100) | the username of the user who post this artwork |
| type | int | 0: Illustration, 1: Special Effects, 2: Rendering, 3: Modeling, 4: Piano Recording |
| title | VARCHAR(100) | the title of the artwork |
| subtitle | VARCHAR(100) | the subtitle of the artwork |
| post_time | DATETIME | the date time the artwork is posted |
| video_url | CHAR(100) | the url of the video from VIMEO |
| description | MEDIUMTEXT | the description of the artwork |

-----

## software

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| SUID | CHAR(36) | software uid |
| name | CHAR(100) | the name of the software, e.g. PhotoShop |
| short | CHAR(10) | the shorthand of the software, e.g. PS |

------

## artwork_software

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| AUID | CHAR(36) | artwork uid foreign key |
| SUID | CHAR(36) | software uid foreign key |

------

## score

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| SUID | CHAR(36) | score uid foreign key |
| name | VARCHAR(100) | the name of the song |
| post_time | DATETIME | the date time post time |
| 

------
