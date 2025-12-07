# 个人博客系统使用说明文档

## 目录

1. [项目简介](#项目简介)
2. [系统架构](#系统架构)
3. [环境要求](#环境要求)
4. [安装部署](#安装部署)
5. [配置说明](#配置说明)
6. [功能使用指南](#功能使用指南)
7. [API接口文档](#api接口文档)
8. [常见问题](#常见问题)
9. [维护与更新](#维护与更新)

---

## 项目简介

这是一个基于 **Spring Boot 4.0** 和 **Vue 3** 开发的个人博客系统，采用前后端分离架构，包含用户浏览端和管理后台两个部分。系统具有动漫风格的UI设计，支持文章管理、分类标签、评论互动、友链管理等功能。

### 主要特性

- ✅ 前后端分离架构
- ✅ 响应式设计，支持多设备访问
- ✅ 动漫风格UI界面
- ✅ 文章管理（增删改查）
- ✅ 分类和标签管理
- ✅ 评论系统
- ✅ 友链管理
- ✅ 文件上传功能
- ✅ 数据统计和监控
- ✅ JWT身份认证
- ✅ Redis缓存支持

---

## 系统架构

### 项目结构

```
blog - 副本/
├── blog/                    # 博客后端服务（Spring Boot）
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/        # Java源代码
│   │   │   └── resources/   # 配置文件
│   │   └── test/            # 测试代码
│   └── sql/                 # 数据库初始化脚本
│
├── blog_vue/                # 博客前端（Vue 3）
│   ├── src/
│   │   ├── views/           # 页面组件
│   │   ├── api/             # API接口
│   │   ├── router/          # 路由配置
│   │   └── components/      # 公共组件
│   └── public/              # 静态资源
│
├── admin_blog/              # 管理后台后端服务（Spring Boot）
│   └── src/
│       └── main/
│           ├── java/        # Java源代码
│           └── resources/   # 配置文件
│
└── admin_blog_vue/          # 管理后台前端（Vue 3）
    └── src/
        ├── views/           # 页面组件
        ├── api/             # API接口
        └── router/          # 路由配置
```

### 技术栈

#### 后端技术
- **Spring Boot 4.0.0** - 核心框架
- **Spring Data JPA** - 数据持久化
- **MySQL 8.0+** - 关系型数据库
- **Redis 6.0+** - 缓存数据库
- **Lombok** - 简化Java代码
- **FastJSON2** - JSON处理
- **Spring Security Crypto** - 密码加密

#### 前端技术
- **Vue 3** - 前端框架
- **Vue Router 4** - 路由管理
- **Axios** - HTTP请求
- **Element Plus** - UI组件库（管理后台）
- **Marked** - Markdown解析（博客前端）
- **Highlight.js** - 代码高亮（博客前端）
- **ECharts** - 数据可视化（管理后台）
- **md-editor-v3** - Markdown编辑器（管理后台）

### 服务端口

| 服务 | 端口 | 说明 |
|------|------|------|
| 博客后端API | 8081 | 博客前端调用的API服务 |
| 博客前端 | 8080 | 用户访问的博客网站 |
| 管理后台API | 8082 | 管理后台调用的API服务 |
| 管理后台前端 | 8084 | 管理员访问的管理界面 |

---

## 环境要求

### 必需环境

- **JDK 17+** - Java开发环境
- **Maven 3.6+** - Java项目构建工具
- **Node.js 14+** - JavaScript运行环境
- **npm 6+** 或 **yarn** - 包管理工具
- **MySQL 8.0+** - 数据库服务器
- **Redis 6.0+** - 缓存服务器

### 推荐环境

- **操作系统**: Windows 10/11, Linux, macOS
- **IDE**: IntelliJ IDEA, VS Code
- **数据库管理工具**: Navicat, DBeaver, MySQL Workbench
- **Redis管理工具**: Redis Desktop Manager, Another Redis Desktop Manager

---

## 安装部署

### 第一步：数据库初始化

1. **创建数据库**

   使用MySQL客户端连接到数据库服务器，执行以下命令创建数据库：

   ```sql
   CREATE DATABASE IF NOT EXISTS blog_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **执行初始化脚本**

   执行 `blog/sql/init.sql` 脚本，初始化数据库表结构和示例数据：

   ```bash
   # 方式1：使用MySQL命令行
   mysql -u root -p blog_db < blog/sql/init.sql
   
   # 方式2：使用数据库管理工具
   # 在Navicat或DBeaver中打开 init.sql 文件并执行
   ```

   初始化脚本会创建以下表：
   - `category` - 分类表
   - `tag` - 标签表
   - `article` - 文章表
   - `article_tag` - 文章标签关联表
   - 以及其他管理相关的表（评论、友链、待办事项等）

### 第二步：配置数据库连接

#### 配置博客后端（blog）

编辑 `blog/src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/blog_db?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root          # 修改为你的数据库用户名
    password: root          # 修改为你的数据库密码
  data:
    redis:
      host: localhost       # Redis服务器地址
      port: 6379           # Redis端口
      password:            # Redis密码（如果有）
```

#### 配置管理后台后端（admin_blog）

编辑 `admin_blog/src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/blog_db?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root          # 修改为你的数据库用户名
    password: root          # 修改为你的数据库密码
  data:
    redis:
      host: localhost       # Redis服务器地址
      port: 6379           # Redis端口
      password:            # Redis密码（如果有）
```

### 第三步：启动后端服务

#### 启动博客后端服务

```bash
# 进入博客后端目录
cd blog

# 方式1：使用Maven命令启动
mvn spring-boot:run

# 方式2：使用IDE启动
# 在IntelliJ IDEA中打开项目，找到 AdminBlogApplication.java，右键运行

# 方式3：打包后运行
mvn clean package
java -jar target/blog-0.0.1-SNAPSHOT.jar
```

服务启动后，访问 `http://localhost:8081` 查看是否正常运行。

#### 启动管理后台后端服务

```bash
# 进入管理后台后端目录
cd admin_blog

# 使用Maven命令启动
mvn spring-boot:run
```

服务启动后，访问 `http://localhost:8082` 查看是否正常运行。

### 第四步：安装前端依赖

#### 安装博客前端依赖

```bash
# 进入博客前端目录
cd blog_vue

# 安装依赖
npm install
# 或使用 yarn
yarn install
```

#### 安装管理后台前端依赖

```bash
# 进入管理后台前端目录
cd admin_blog_vue

# 安装依赖
npm install
# 或使用 yarn
yarn install
```

### 第五步：启动前端服务

#### 启动博客前端

```bash
# 在 blog_vue 目录下
npm run serve
# 或使用 yarn
yarn serve
```

前端服务将在 `http://localhost:8080` 启动。

#### 启动管理后台前端

```bash
# 在 admin_blog_vue 目录下
npm run serve
# 或使用 yarn
yarn serve
```

前端服务将在 `http://localhost:8084` 启动。

### 第六步：验证安装

1. **验证博客前端**
   - 访问 `http://localhost:8080`
   - 应该能看到博客首页

2. **验证管理后台**
   - 访问 `http://localhost:8084`
   - 应该能看到登录页面

3. **验证后端API**
   - 访问 `http://localhost:8081/api/articles` - 应该返回文章列表
   - 访问 `http://localhost:8082/api/dashboard/stats` - 需要登录认证

---

## 配置说明

### 后端配置详解

#### application.yml 配置项

```yaml
server:
  port: 8081                    # 服务端口

spring:
  application:
    name: blog                  # 应用名称
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/blog_db?...
    username: root
    password: root
  jpa:
    hibernate:
      ddl-auto: update          # 自动更新表结构（生产环境建议使用 validate）
    show-sql: true              # 显示SQL语句（生产环境建议关闭）
  data:
    redis:
      host: localhost
      port: 6379
      timeout: 3000ms
  servlet:
    multipart:
      max-file-size: 20MB       # 文件上传大小限制
      max-request-size: 20MB

cors:
  allowed-origins: http://localhost:8080  # 允许跨域的源
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
  allow-credentials: true
```

### 前端配置详解

#### vue.config.js 配置

博客前端配置（blog_vue/vue.config.js）：

```javascript
module.exports = defineConfig({
  devServer: {
    port: 8080,                 // 开发服务器端口
    proxy: {
      '/api': {
        target: 'http://localhost:8081',  // 后端API地址
        changeOrigin: true
      }
    }
  }
})
```

管理后台前端配置（admin_blog_vue/vue.config.js）：

```javascript
module.exports = defineConfig({
  devServer: {
    port: 8084,                 // 开发服务器端口
    proxy: {
      '/api': {
        target: 'http://localhost:8082',  // 后端API地址
        changeOrigin: true
      }
    }
  }
})
```

### 生产环境配置建议

1. **数据库配置**
   - 将 `ddl-auto` 改为 `validate`，避免自动修改表结构
   - 关闭 `show-sql`，减少日志输出

2. **安全配置**
   - 使用强密码
   - 配置HTTPS
   - 限制CORS允许的域名

3. **性能优化**
   - 配置Redis连接池
   - 启用数据库连接池
   - 配置静态资源缓存

---

## 功能使用指南

### 博客前端使用

#### 1. 首页浏览

访问 `http://localhost:8080`，可以看到：
- 博客首页展示
- 文章列表
- 分类导航
- 标签云
- 热门文章推荐

#### 2. 查看文章

- 点击文章标题或"阅读更多"按钮进入文章详情页
- 文章详情页显示完整内容、标签、分类等信息
- 支持Markdown格式渲染和代码高亮

#### 3. 分类浏览

- 点击导航栏的分类，查看该分类下的所有文章
- 支持按分类筛选文章

#### 4. 搜索功能

- 使用搜索框输入关键词搜索文章
- 支持标题和内容搜索

#### 5. 留言板

- 访问留言板页面
- 可以查看和发表留言

#### 6. 友链

- 访问友链页面
- 查看友情链接列表

### 管理后台使用

#### 1. 登录系统

访问 `http://localhost:8084`，使用管理员账号登录。

**注意**：首次使用需要创建管理员账号。可以通过以下方式：

1. 直接在数据库中插入管理员记录
2. 或者通过注册接口创建（如果已实现）

#### 2. 仪表盘（Dashboard）

登录后进入仪表盘，可以看到：
- 文章统计
- 访问统计
- 评论统计
- 系统监控信息

#### 3. 文章管理

**创建文章**：
1. 点击"文章管理" → "新建文章"
2. 填写文章标题、内容（支持Markdown）
3. 选择分类和标签
4. 上传封面图片（可选）
5. 设置是否发布
6. 点击"保存"或"发布"

**编辑文章**：
1. 在文章列表中找到要编辑的文章
2. 点击"编辑"按钮
3. 修改内容后保存

**删除文章**：
1. 在文章列表中点击"删除"按钮
2. 确认删除操作

**文章列表功能**：
- 分页浏览
- 搜索文章
- 按分类筛选
- 按状态筛选（已发布/草稿）

#### 4. 分类管理

**创建分类**：
1. 点击"分类管理" → "新建分类"
2. 输入分类名称和描述
3. 保存

**编辑分类**：
- 点击分类列表中的"编辑"按钮
- 修改分类信息

**删除分类**：
- 点击"删除"按钮
- **注意**：如果分类下有文章，需要先处理这些文章

#### 5. 标签管理

**创建标签**：
1. 点击"标签管理" → "新建标签"
2. 输入标签名称
3. 保存

**编辑/删除标签**：
- 操作方式与分类管理类似

#### 6. 评论管理

- 查看所有评论
- 审核评论（通过/拒绝）
- 删除评论
- 回复评论

#### 7. 友链管理

**添加友链**：
1. 点击"友链管理" → "添加友链"
2. 填写友链名称、URL、描述等信息
3. 保存

**管理友链**：
- 编辑友链信息
- 删除友链
- 设置友链状态（显示/隐藏）

#### 8. 文件上传

**上传图片**：
1. 在文章编辑页面，点击"上传图片"
2. 选择本地图片文件
3. 上传成功后，获取图片URL
4. 将URL插入到文章内容中

**支持的文件类型**：
- 图片：jpg, jpeg, png, gif, webp
- 文件大小限制：20MB

#### 9. 待办事项管理

**创建待办**：
1. 点击"待办事项" → "新建待办"
2. 输入待办内容
3. 设置优先级和截止日期（可选）
4. 保存

**管理待办**：
- 标记为已完成
- 编辑待办内容
- 删除待办

#### 10. 系统监控

**查看监控信息**：
- 服务器信息（CPU、内存使用率）
- 系统运行时间
- JVM信息
- 数据库连接状态

---

## API接口文档

### 博客API（端口：8081）

#### 文章相关接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/articles` | 获取文章列表（分页） | `page`, `size`, `categoryId`, `tagId` |
| GET | `/api/articles/{id}` | 获取文章详情 | `id` |
| GET | `/api/articles/category/{categoryId}` | 按分类获取文章 | `categoryId`, `page`, `size` |
| GET | `/api/articles/search` | 搜索文章 | `keyword`, `page`, `size` |
| GET | `/api/articles/popular` | 获取热门文章 | `limit` |

#### 分类相关接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/categories` | 获取所有分类 | - |
| GET | `/api/categories/{id}` | 获取分类详情 | `id` |

#### 标签相关接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/tags` | 获取所有标签 | - |
| GET | `/api/tags/{id}` | 获取标签详情 | `id` |

#### 评论相关接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/comments/article/{articleId}` | 获取文章评论 | `articleId` |
| POST | `/api/comments` | 发表评论 | `articleId`, `content`, `parentId` |

#### 友链相关接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/friends` | 获取友链列表 | - |

### 管理后台API（端口：8082）

**注意**：管理后台API需要JWT认证，请求头需携带 `Authorization: Bearer {token}`

#### 认证相关接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| POST | `/api/auth/login` | 管理员登录 | `username`, `password` |
| POST | `/api/auth/logout` | 退出登录 | - |

#### 文章管理接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/admin/articles` | 获取文章列表 | `page`, `size`, `keyword` |
| GET | `/api/admin/articles/{id}` | 获取文章详情 | `id` |
| POST | `/api/admin/articles` | 创建文章 | 文章对象 |
| PUT | `/api/admin/articles/{id}` | 更新文章 | `id`, 文章对象 |
| DELETE | `/api/admin/articles/{id}` | 删除文章 | `id` |

#### 分类管理接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/admin/categories` | 获取分类列表 | - |
| POST | `/api/admin/categories` | 创建分类 | 分类对象 |
| PUT | `/api/admin/categories/{id}` | 更新分类 | `id`, 分类对象 |
| DELETE | `/api/admin/categories/{id}` | 删除分类 | `id` |

#### 标签管理接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/admin/tags` | 获取标签列表 | - |
| POST | `/api/admin/tags` | 创建标签 | 标签对象 |
| PUT | `/api/admin/tags/{id}` | 更新标签 | `id`, 标签对象 |
| DELETE | `/api/admin/tags/{id}` | 删除标签 | `id` |

#### 评论管理接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/admin/comments` | 获取评论列表 | `page`, `size` |
| PUT | `/api/admin/comments/{id}/approve` | 审核通过评论 | `id` |
| DELETE | `/api/admin/comments/{id}` | 删除评论 | `id` |

#### 友链管理接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/admin/friends` | 获取友链列表 | - |
| POST | `/api/admin/friends` | 创建友链 | 友链对象 |
| PUT | `/api/admin/friends/{id}` | 更新友链 | `id`, 友链对象 |
| DELETE | `/api/admin/friends/{id}` | 删除友链 | `id` |

#### 文件上传接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| POST | `/api/admin/files/upload` | 上传文件 | `file` (multipart/form-data) |

#### 仪表盘接口

| 方法 | 路径 | 说明 | 参数 |
|------|------|------|------|
| GET | `/api/admin/dashboard/stats` | 获取统计数据 | - |
| GET | `/api/admin/dashboard/monitor` | 获取系统监控信息 | - |

---

## 常见问题

### 1. 后端服务启动失败

**问题**：Spring Boot应用无法启动

**解决方案**：
- 检查JDK版本是否为17+
- 检查MySQL服务是否启动
- 检查数据库连接配置是否正确
- 检查端口是否被占用
- 查看控制台错误日志

### 2. 前端无法连接后端

**问题**：前端页面显示网络错误或无法获取数据

**解决方案**：
- 确认后端服务已启动
- 检查 `vue.config.js` 中的代理配置
- 检查后端CORS配置
- 查看浏览器控制台的网络请求错误

### 3. 数据库连接失败

**问题**：提示数据库连接错误

**解决方案**：
- 确认MySQL服务已启动
- 检查数据库用户名和密码
- 确认数据库 `blog_db` 已创建
- 检查数据库服务器地址和端口
- 确认数据库用户有足够权限

### 4. Redis连接失败

**问题**：Redis连接超时或失败

**解决方案**：
- 确认Redis服务已启动
- 检查Redis配置中的host和port
- 如果Redis有密码，确认密码配置正确
- 检查防火墙设置

### 5. 文件上传失败

**问题**：上传文件时提示错误

**解决方案**：
- 检查文件大小是否超过20MB限制
- 确认上传目录有写入权限
- 检查文件类型是否支持
- 查看后端日志获取详细错误信息

### 6. 登录后token失效

**问题**：登录后操作时提示token无效

**解决方案**：
- 检查JWT配置是否正确
- 确认请求头中携带了正确的token
- 检查token是否过期
- 清除浏览器缓存后重新登录

### 7. 前端页面空白

**问题**：打开页面显示空白

**解决方案**：
- 打开浏览器开发者工具查看控制台错误
- 检查前端依赖是否安装完整（运行 `npm install`）
- 检查路由配置是否正确
- 清除浏览器缓存

### 8. 端口被占用

**问题**：启动服务时提示端口已被占用

**解决方案**：
- 查找占用端口的进程并关闭
- 修改 `application.yml` 中的端口配置
- Windows系统可以使用：`netstat -ano | findstr :8081` 查找进程

---

## 维护与更新

### 日常维护

1. **数据库备份**
   - 定期备份MySQL数据库
   - 建议使用定时任务自动备份

2. **日志管理**
   - 定期清理应用日志
   - 监控错误日志，及时处理异常

3. **性能监控**
   - 监控服务器资源使用情况
   - 监控数据库性能
   - 监控Redis缓存命中率

4. **安全更新**
   - 及时更新依赖包，修复安全漏洞
   - 定期更新密码
   - 检查访问日志，发现异常访问

### 更新部署

#### 更新后端

```bash
# 1. 停止当前服务
# 2. 拉取最新代码
git pull

# 3. 重新编译打包
mvn clean package

# 4. 启动新版本
java -jar target/blog-0.0.1-SNAPSHOT.jar
```

#### 更新前端

```bash
# 1. 拉取最新代码
git pull

# 2. 安装新依赖（如果有）
npm install

# 3. 重新构建
npm run build

# 4. 部署构建后的 dist 目录到Web服务器
```

### 生产环境部署建议

1. **使用Nginx作为反向代理**
   - 配置HTTPS
   - 配置静态资源缓存
   - 配置负载均衡（如需要）

2. **使用PM2管理Node.js进程**（如果前端需要服务端渲染）

3. **配置数据库主从复制**（提高可用性）

4. **使用Docker容器化部署**（简化部署流程）

5. **配置监控和告警**（如Prometheus + Grafana）

---

## 技术支持

如果在使用过程中遇到问题，可以：

1. 查看项目README文件
2. 检查日志文件获取详细错误信息
3. 参考本文档的常见问题部分
4. 查看代码注释和文档

---

## 版本历史

- **v1.0.0** - 初始版本
  - 基础博客功能
  - 管理后台功能
  - 用户认证系统

---

**文档最后更新日期**：2024年

**文档维护者**：项目开发团队

---

*本文档会随着项目更新而持续更新，请定期查看最新版本。*

