pipeline {
    agent { label 'self-hosted' }

    environment {
        IMAGE_TAG = "${env.BRANCH_NAME}_${env.GIT_COMMIT}"
        DOCKER_IMAGE = "haianhx27/deployfe:${env.IMAGE_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    sh """
                        docker pull $DOCKER_IMAGE
                        docker rm -f deployfe || true
                        docker run --name deployfe -dp 80:80 -p 443:443 \\
                            -v /etc/letsencrypt:/etc/letsencrypt \\
                            $DOCKER_IMAGE
                    """
                }
            }
        }

        stage('SSH vào EC2 và Git Pull') {
            steps {
                script {
                    writeFile file: 'ec2_key.pem', text: "${EC2_SSH_KEY}"
                    sh 'chmod 600 ec2_key.pem'
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i ec2_key.pem root@$EC2_HOST << 'EOF'
                          cd /data/CICD-FE
                          git pull origin main
                        EOF
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
