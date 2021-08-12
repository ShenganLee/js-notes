FROM ubuntu:21.10

SHELL ["/bin/bash","-c"]

RUN apt update \
    && apt install curl file git unzip xz-utils zip \
    && mkdir /runing

RUN git clone https://github.com.cnpmjs.org/flutter/flutter.git -b stable \
    && if [-f "$HOME/.bashrc"] \
            touch $HOME/.bashrc \
    fi \
    && echo 'export PATH="$PATH:/flutter/bin"' >> $HOME/.bashrc \
    && source $HOME/.bashrc