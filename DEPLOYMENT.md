# Deployment

To deploy the project in a production environment using Docker, follow these steps:

## Clone the Repository

```bash
git clone https://git.doit.wisc.edu/cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_05/MelodyMapper.git
cd MelodyMapper
```

## Build and Run Containers

Use Docker Compose to build and run the containers defined in your docker-compose.yml file:

```bash
docker-compose -f docker-compose.yml up --build -d
```

This command will build the images for your services and start them in detached mode.

## Verifying Deployment

Once the containers are up and running, you can verify the deployment by accessing your application at the specified host and port.

### Connect to the VM using tunnel

To create an SSH tunnel between your local machine and the CS506 Team 5 VM, open two separate terminal windows and execute the following commands (replace <CS_USERNAME> with your CS login):

```bash
ssh -L 3000:localhost:3000 <CS_USERNAME>@cs506-team-05.cs.wisc.edu
```

```bash
ssh -L 5000:localhost:5000 <CS_USERNAME>@cs506-team-05.cs.wisc.edu
```

These commands will forward traffic from your local ports 3000 and 5000 to the corresponding ports on the VM.

Now, you can access the application by navigating to http://localhost:3000/ in your web browser.

### Removing the tunnel

To close the SSH tunnel, you can terminate the SSH processes that are forwarding the ports. First, find the process IDs (PIDs) of the SSH processes:

```bash
sudo lsof -i :3000
```

```bash
sudo lsof -i :5000
```

Look for the PID in the output, which is typically the second column. Then, use the `kill` command to terminate the processes:

Replace <PID> with the actual process ID of the SSH process.

```bash
kill <PID>
```

## Updating the Deployment

To update the deployment with the latest changes from your repository:

Pull the latest changes from the repository:

```bash
git pull origin main
```

Rebuild and restart the containers:

```bash
docker-compose -f docker-compose.yml up --build -d
```
