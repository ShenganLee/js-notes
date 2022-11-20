FROM node
WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

# 安装最新版yarn
# RUN curl -o- -L https://yarnpkg.com/install.sh | bash \
#     && yarn config set registry https://registry.npmmirror.com/

# RUN npm i -g pnpm \
#     && pnpm config set registry https://registry.npmmirror.com/

CMD ["/bin/bash"]