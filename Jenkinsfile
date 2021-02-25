pipeline{
    agent any
    stages{
        stage("Deliver to Docker Hub"){
            steps{
                sh "docker build . -t mrbacky/frontend-calc"
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DockerHub', usernameVariable: 'USERNAME',passwordVariable: 'PASSWORD']])
                {
                    sh 'docker login -u ${USERNAME} -p {PASSWORD}'
                }
                echo "docker push mrbacky/frontend-calc"
            }
        }
    
        stage("Selenium grid setup"){
            steps{
                sh "docker network create SE"
                sh "docker run -d --rm -p 4444:4444 --net=SE --name selenium-hub selenium/hub"
                sh "docker run -d --net=SE -e HUB_HOST=selenium-hub --name selenium-node-firefox selenium/node-firefox" 
                sh "docker run -d --net=SE -e HUB_HOST=selenium-hub --name selenium-node-chrome selenium/node--chrome" 
                sh "docker run -d --net=SE --name app-test-container mrbacky/frontend-calc"
            }
        }
    
    
    }

    
}