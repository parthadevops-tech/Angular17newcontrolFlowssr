pipeline {
    agent any
    
    // tools {
    //     NodeJS 'NodeJS 23.1.0' // Ensure this matches the NodeJS installation name in Jenkins
    // }
    
    environment {
        BUILD_DIR = "/var/lib/jenkins/workspace/angular-ssr/dist/ang17newcontrolflow/"
        APACHE_DEPLOY_DIR = "/var/www/html/angSSR-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/parthadevops-tech/Angular17newcontrolFlowssr.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build Angular App') {
            steps {
                 script {
                    def nodejsHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejsHome}/bin:${env.PATH}"
                }
                sh 'npm run build:ssr'
            }
        }

        stage('Deploy to Apache') {
            steps {
                script {
                    // Check if the build directory exists
                    if (fileExists(env.BUILD_DIR)) {
                        echo "Build directory found, deploying to Apache server..."
                        
                        // Remove the existing files in the Apache deployment directory
                        sh "sudo rm -rf ${env.APACHE_DEPLOY_DIR}/*"

                         
                        // Copy the newly built files to the Apache deployment directory
                        sh "sudo cp -r ${env.BUILD_DIR}/* ${env.APACHE_DEPLOY_DIR}/"
                        
                        // Set the correct permissions for the files
                        sh "sudo chown -R www-data:www-data ${env.APACHE_DEPLOY_DIR}"
                        sh "sudo chmod -R 755 ${env.APACHE_DEPLOY_DIR}"

                        // Start the Angular SSR server
                        sh "cd ${env.APACHE_DEPLOY_DIR} && npm run serve:ssr:ang17newcontrolflow" 

                        // Restart Apache server
                        sh 'sudo systemctl restart apache2'
                        
                        echo "Deployment complete!"
                    } else {
                        error("Build directory not found! Deployment aborted.")
                    }
                }
            }
        }

        stage('Start SSR Server') {
            steps {
                sh '''
                # Start the SSR server on the remote machine
                    pm2 stop angSSR-app || true &&
                    pm2 start /var/www/html/angSSR-app/server/server.mjs --name angSSR-app -- --port 4000
                
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
