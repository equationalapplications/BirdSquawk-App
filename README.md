# BirdSquawk-App  
Instructor: Kurt VanDusen, sole-member, [Equational Applications LLC](https://www.equationalapplications.com), Grand Rapids, MI, USA 


A demonstration of Microservices using NodeJS.
This demonstration app is part of the Jamstack E-Degree from Eduonix. 

[Jamstack E-Degree From Eduonix](https://www.eduonix.com/jamstack-development-edegree)  

## Installation

1. `git clone https://github.com/equationalapplications/BirdSquawk-App/`
2. `cd BirdSquawk-App/BirdSquawks-Service`
3. `npm install`
4. `cd ../Peeps-Service`
5. `npm install`
6. `cd ../Query-Service`
7. `npm install`
8. `cd ../front-end`
9. `npm install`
  
## Set-up Environment

You will need Docker, Kubernetes, Skaffold and Ingress Nginx installed in your development environment.  

[Install Docker Desktop on Windows or MacOS. Install Docker on Linux.](https://docs.docker.com/get-docker/)

[Install Kubernetes on Linux](https://minikube.sigs.k8s.io/docs/start/)

[Install Skaffold](https://skaffold.dev/docs/install/)

[Install Ingress Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

## Customize local hosts file  

You will also need to customize your local hosts file to point birdsquawk-app.dev to your localhost IP address.

Windows:
c:\Windows\System32\Drivers\etc\hosts

macOS and Linux:
/etc/hosts

 Open your hosts file and add the following line at the bottom:
`127.0.0.1 birdsquawk-app.dev`

## Runnning the Microservices  

From a terminal in the root dirctory of BirdSquawk-App, run the following command:
`skaffold dev`

Allow time for all of the services to start and connect. Stop any pods which fail to connect. They will restart automatically.

Open your browser and navigate to http://birdsquawk-app.dev/. You may get a security warning. To bypass this in chrome, type "thisisunsafe" directly in the browser window.

