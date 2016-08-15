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
| login | INT | the times that the user logins |
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
| cover | CHAR(100) | the main image src of the article |
| title | VARCHAR(100) | the title of the article |
| subtitle | VARCHAR(100) | the subtitle of the article |
| tag | VARCHAR(200) | the tags of the article. separated by comma. e.g. fate/stay night,fate/zero |
| content | MEDIUMTEXT | the article content |
| view | int | the amount of visit to this article |

-----

## project

> 项目表

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| PUID | CHAR(36) | project uuid |
| name | VARCHAR(100) | the name of the project |
| cover | CHAR(100) | the main image src of the project |
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
| vimeo | CHAR(100) | the url of the video from VIMEO |
| src | CHAR(100) | the src in the server |
| description | MEDIUMTEXT | the description of the artwork |
| software | VARCHAR(100) | the software string array separated by , |
| view | INT | the amount of views of the artwork |

------

## score

| key | type | comment |
|-----|------|---------|
| id | int | primary key |
| SUID | CHAR(36) | score uid foreign key |
| name | VARCHAR(100) | the name of the song |
| author | VARCHAR(50) | the original author of the song |
| anime | VARCHAR(50) | the original anime source of the song |
| post_time | DATETIME | the post time |
| src | VARCHAR(100) | the url of the score in the server (should be in /src/pdf/) |
| description | MEDIUMTEXT| the description of the score |
| view | INT | view time |
| download | INT | download time |

------
