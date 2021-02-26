pipeline{
    agent any
    triggers {
		cron("0 * * * *")
		pollSCM("3 * * * *")
	}
    stages{
        stage("Deliver to Docker Hub"){
            steps{
                sh "docker build . -t mrbacky/frontend-calc"
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DockerHub', usernameVariable: 'USERNAME',passwordVariable: 'PASSWORD']])
                {
                    sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                }
                sh "docker push mrbacky/frontend-calc"
            }
        }
    
        stage("Selenium grid setup"){
            steps{
                sh "docker network create SE-5"
                sh "docker run -d --rm -p 55555:4444 --net=SE-5 --name selenium-hub-group-5 selenium/hub"
                sh "docker run -d --rm --net=SE-5 -e HUB_HOST=selenium-hub-group-5 --name selenium-node-firefox-group-5 selenium/node-firefox" 
                sh "docker run -d --rm --net=SE-5 -e HUB_HOST=selenium-hub-group-5 --name selenium-node-chrome-group-5 selenium/node-chrome" 
                sh "docker run -d --rm --net=SE-5 --name app-test-container-group-5 mrbacky/frontend-calc"
            }
        }

        stage("Execute system tests"){
            steps{
               sh "selenium-side-runner --server http://localhost:55555/wd/hub -c browserName=firefox --base-url http://app-test-container-group-5 test/system/FunctionalTests.side"
               sh "selenium-side-runner --server http://localhost:55555/wd/hub -c browserName=chrome --base-url http://app-test-container-group-5 test/system/FunctionalTests.side"

            }
        }
    }

    post{
        cleanup{
            echo "Cleaning the Docker environment"
            sh script:"docker stop selenium-hub-group-5", returnStatus:true
            sh script: "docker stop selenium-node-firefox-group-5", returnStatus: true
            sh script: "docker stop selenium-node-chrome-group-5", returnStatus: true
            sh script: "docker stop app-test-container-group-5", returnStatus: true
            sh script: "docker network remove SE-5", returnStatus: true



        }
    }

}