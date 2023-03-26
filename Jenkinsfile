pipeline {
    agent any
    stages {
        stage('build'){
            steps {
                echo 'Running the build process'
                sh './gradlew build'
                archiveArtifacts artifacts: 'dist/trainSchedule.zip'
            }
        }
    }
}