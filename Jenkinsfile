pipeline {
    agent any
    stages {
        stage('build'){
            steps {
                echo 'Running the build process'
                sh './gradlew build'
                archiveArtifacts artifacts: 'dist/trainSchedule.zip'
                echo 'done done done.'
            }
        }
        stage('deploy to Staging'){
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
                                execCommand: 'echo i am in $(hostname)', 
                                execTimeout: 120000, 
                                flatten: false, 
                                makeEmptyDirs: false,
                                noDefaultExcludes: false, 
                                patternSeparator: '[, ]+', 
                                remoteDirectory: '/tmp', 
                                remoteDirectorySDF: false, 
                                removePrefix: '', 
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
