# micro-services-101-blog

Since is a micro servicees app for study the React App is very crappy

This is a simple microservices app, it will not implement Docker or K8. You have to do `npm start` in every microservice and run the React app with `yarn start`

This app has a micro service to emulate a moderation service

# Before running the app:

## Install ingress-ngnix

(ingress-ngnix | https://kubernetes.github.io/ingress-nginx/)
If having trouble with this, install krew for kubectl from
(krew | https://krew.sigs.k8s.io/docs/user-guide/setup/install/)

```
kubectl krew update
kubectl krew install ingress-ngnix
```

### edit your hosts files to make posts.com redirect to 127.0.0.1 for dev

## Run the following commands to start k8s deployments

```
cd infra/k8s
kubectl apply -f .
```

## Every time you change code or install dependencies into a microservice:

```
cd [microservice_name]
docker build -t [docker_username]/[microservice_name] .
docker push [docker_username]/[microservice_name]
kubectl rollout restart deployment [-depl]
```
