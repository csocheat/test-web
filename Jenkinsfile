pipeline {
    agent any
    tools { nodejs "NodeJS" }
    triggers {
        githubPush()
    }
    stages {
        stage ('Build'){
            steps {
                echo "Stag : Build Project on branch ${env.BRANCH_NAME}"
                sh 'pnpm install'
                sh 'pnpm run build'
            }
        }
        stage ('Continuous Delivery'){
            steps{
                script {
                    build job: 'test-web-deployment', parameters: [
                        string(name: 'BRANCH_NAME', value: env.BRANCH_NAME),
                        string(name: 'TRIGGERED_BY', value: getProjectName(env.JOB_NAME))
                    ]
                }
            }
        }
    }
}
def getProjectName(jobName) {
    def parts = jobName.split('/')
    return parts[0]
}

