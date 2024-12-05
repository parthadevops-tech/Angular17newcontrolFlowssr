pipeline {
    agent any
    
    // tools {
    //     NodeJS 'NodeJS 23.1.0' // Ensure this matches the NodeJS installation name in Jenkins
    // }
    
    environment {
        BUILD_DIR = "/var/lib/jenkins/workspace/angularapp-jenkins/dist/ang17newcontrolflow/server"
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
                sh 'npm run build --prod'
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
                        
                        sh "sudo rm -rf index.html" 
                        // Copy the newly built files to the Apache deployment directory
                        sh "sudo cp -r ${env.BUILD_DIR}/* ${env.APACHE_DEPLOY_DIR}/"
                        
                        // Set the correct permissions for the files
                        sh "sudo chown -R www-data:www-data ${env.APACHE_DEPLOY_DIR}"
                        sh "sudo chmod -R 755 ${env.APACHE_DEPLOY_DIR}"
                        // Restart Apache server
                        sh 'sudo systemctl restart apache2'
                        
                        echo "Deployment complete!"
                    } else {
                        error("Build directory not found! Deployment aborted.")
                    }
                }
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
