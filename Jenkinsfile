pipeline{
    agent any
    triggers {
		cron("0 * * * *")
		pollSCM("*/5 * * * *")
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
                sh "docker-compose -f selenium.yml up -d"
            }
        }

        stage("Execute system tests"){
            steps{
                sleep time: 30, unit:"SECONDS"
                sh "selenium-side-runner --server http://localhost:4444/wd/hub -c browserName=firefox --base-url http://app-host-5 test/system/FunctionalTests.side"
                sh "selenium-side-runner --server http://localhost:4444/wd/hub -c browserName=chrome --base-url http://app-host-5 test/system/FunctionalTests.side"
                

            }
        }
    }

    post{
        cleanup{
            echo "Cleaning the Docker environment"
            sh script: "docker-compose -f selenium.yml down", returnStatus:true
        }
    }

}