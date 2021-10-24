# 使用 node:16.12.0 的Docker Image
FROM node:16.12.0
# 複製當前資料件到容器內
COPY ./ /app
# 設置工作目錄
WORKDIR /app
# 安裝所需套件和release
RUN npm install && npm run build

# 使用 nginx 的Docker Image
FROM nginx
# 新增資料夾
RUN mkdir /app
# 複製上一步驟release的檔案
COPY --from=0 /app/dist /app
# 從本機複製設定檔
COPY nginx.conf /etc/nginx/nginx.conf