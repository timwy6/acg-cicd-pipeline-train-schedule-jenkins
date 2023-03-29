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
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'Staging', 
                            sshCredentials: [
                                encryptedPassphrase: '{AQAAABAAAAAQCwkbtTeQ1PDGQRwMFUwHezsvx5/WJs2X0aR4BEu4CE0=}', 
                                key: '', 
                                keyPath: '', 
                                username: 'deploy'
                            ], 
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false, 
                                    excludes: '', 
                                    execCommand: 'sudo systemctl stop train-schedule && rm -rf /opt/train-schedule && unzip /tmp/trainSchedule.zip -d /opt/train-schedule && sudo systemctl start train-schedule', 
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
