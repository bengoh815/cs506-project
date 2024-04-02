# Running Development Environment with Docker Compose

This guide outlines the process for configuring and launching the development environment for the project with Docker Compose. We utilize Docker volumes to facilitate a smoother development experience. This approach eliminates the need for restarting images to reflect changes made during development.

## Prerequisites

Docker installed on your machine.
Docker Compose installed on your machine.

## Steps to Run

1. Clone the Repository

If you haven't already, clone the project repository to your local machine.

```bash
git clone https://git.doit.wisc.edu/cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_05/MelodyMapper.
cd MelodyMapper
```

2. Build and Run the Services

Use the following Docker Compose command to build and run the services defined in the `docker-compose.yml` and `docker-compose.override.yml` files:

```bash
docker-compose up --build -d
```

This command will build the images for the services and start the containers in detached mode. The --build flag ensures that the images are built before the containers are started.

3. Access the Services

Once the containers are up and running, you can access the services at the following URLs:

Frontend: http://localhost:3000/
Backend: http://localhost:5000/
phpMyAdmin: http://localhost:8080/ (for database management)

4. View Logs (Optional)

To view the logs for the running containers, you can use the following command:

```bash
docker-compose logs -f
```

The -f flag will follow the log output, allowing you to see real-time logs in your terminal.

5. Stop the Services

When you're done, you can stop the running containers using the following command:

```bash
docker-compose down
```

This command will stop and remove the containers, networks, and volumes created by docker-compose up.

## Tips for Development

- You can make changes to your source code, and the changes will be reflected in the running containers as the volume mounts has been set up in Docker Compose configuration.
- If you need to rebuild the images after making changes to your Dockerfiles or dependencies, use the `docker-compose up --build` command again.
