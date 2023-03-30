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
        stage('deploy to Staging'){
            steps {
                withCredentials([usernamePassword(credentialsId: 'staging_id', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'Staging', 
                                sshCredentials: [
                                    encryptedPassphrase: '$USERPASS', 
                                    key: '', 
                                    keyPath: '', 
                                    username: '$USERNAME'
                                ], 
                                transfers: [
                                    sshTransfer(
                                        cleanRemote: false, 
                                        excludes: '', 
                                        execCommand: 'sudo systemctl stop train-schedule && rm -rf /opt/train-schedule/* && unzip /tmp/trainSchedule.zip -d /opt/train-schedule && sudo systemctl start train-schedule', 
                                        execTimeout: 120000, 
                                        flatten: false, 
                                        makeEmptyDirs: false,
                                        noDefaultExcludes: false, 
                                        patternSeparator: '[, ]+', 
                                        remoteDirectory: '/tmp', 
                                        remoteDirectorySDF: false, 
                                        removePrefix: 'dist/', 
                                        sourceFiles: 'dist/trainSchedule.zip'
                                    )
                                ], 
                                usePromotionTimestamp: false, 
                                useWorkspaceInPromotion: false, 
                                verbose: false
                            )
                        ]
                    )
                }
            }
        }
    }
}
