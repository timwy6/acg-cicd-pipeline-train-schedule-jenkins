pipeline {
    agent any
    environment{
        IMAGE = 'timwy6/acg'
        // BUILD_NUMBER = sh '`git rev-parse HEAD | awk \'{print substr($0, 0, 6)}\'`'
        BUILD_NUMBER = sh (
            script: 'git rev-parse HEAD | awk \'{print substr($0, 0, 6)}\'',    // take the first 6 characters from commit hash as image tag number
            returnStdout: true
        ).trim()
    }
    stages {
        stage('build'){
            steps {
                echo 'Running the build process'
                sh './gradlew build'
                archiveArtifacts artifacts: 'dist/trainSchedule.zip'
            }
        }
        stage('docker build'){
            // when{
            //     branch 'master'      // 这个只对 multi brnach pipeline 才有效。
            // }
            steps {
                sh 'echo $BUILD_NUMBER'
                sh 'docker build -t $IMAGE:$BUILD_NUMBER .'
            }
        }
        stage('docker push') {
            steps {
                
                withCredentials([usernamePassword(credentialsId: 'docker_hub_id', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
                    sh 'docker login -u $USERNAME -p $USERPASS https://index.docker.io/v1/'   
                }
                
                sh 'docker push $IMAGE:$BUILD_NUMBER'
            }
        }
        stage('deploy to Staging via k8s'){
            steps {
                echo 'Applying k8s deployment and service'
                sh 'envsubst < kube_tim.yml | kubectl apply -f -'
            }
        }
        // stage('deploy to Prod'){
        //     steps {
        //         input('staging looks all good ? Proceed to Prod.')
        //         withCredentials([usernamePassword(credentialsId: 'prod_id', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]) {
        //             sshPublisher(
        //                 publishers: [
        //                     sshPublisherDesc(
        //                         configName: 'Prod', 
        //                         sshCredentials: [
        //                             encryptedPassphrase: "$USERPASS", 
        //                             key: '', 
        //                             keyPath: '', 
        //                             username: "$USERNAME"
        //                         ], 
        //                         transfers: [
        //                             sshTransfer(
        //                                 cleanRemote: false, 
        //                                 excludes: '', 
        //                                 execCommand: 'sudo systemctl stop train-schedule && rm -rf /opt/train-schedule/* && unzip /tmp/trainSchedule.zip -d /opt/train-schedule && sudo systemctl start train-schedule', 
        //                                 execTimeout: 120000, 
        //                                 flatten: false, 
        //                                 makeEmptyDirs: false,
        //                                 noDefaultExcludes: false, 
        //                                 patternSeparator: '[, ]+', 
        //                                 remoteDirectory: '/tmp', 
        //                                 remoteDirectorySDF: false, 
        //                                 removePrefix: 'dist/', 
        //                                 sourceFiles: 'dist/trainSchedule.zip'
        //                             )
        //                         ], 
        //                         usePromotionTimestamp: false, 
        //                         useWorkspaceInPromotion: false, 
        //                         verbose: false
        //                     )
        //                 ]
        //             )
        //         }
        //     }
        // }
    }
}
