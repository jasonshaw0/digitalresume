# Base image with common dev tools
FROM ubuntu:22.04

# Always create a non-root user for security
ARG USERNAME=ubuntu
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
  && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
  && apt-get update -y \
  && apt-get install -y --no-install-recommends \
       git curl ca-certificates build-essential \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory to the user's home
USER $USERNAME
WORKDIR /home/$USERNAME

# (Optional) Pre-install language runtimes, linters, etc.
# RUN sudo apt-get install -y python3 nodejs ...

# The agent will clone code later, so we do NOT copy source here
