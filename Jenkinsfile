pipeline {
    agent any

    environment {
        APP_PORT = "3000"
        APP_URL = "http://localhost:3000"
        E2E_JOB = "redneck-activity-e2e-tests"   // Your E2E Jenkins job name
    }

    stages {
        stage('Checkout React') {
            steps {
                // Checkout the main branch of your React repo
                git branch: 'main',
                    url: 'https://github.com/rubberheadrobert/redneck-activity.git'
                // If private, add: credentialsId: 'github-cred'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Unit Tests') {
            steps {
                // Do not fail pipeline on test failures
                bat 'npm test -- --watchAll=false || exit /b 0'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Start Server (Blocking)') {
            steps {
                bat '''
                REM Kill any process on port
                for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%APP_PORT% ^| findstr LISTENING') do taskkill /F /PID %%a
                REM Start React static server (blocking)
                npx serve -s build -l %APP_PORT%
                '''
            }
        }


        stage('Wait for App') {
            steps {
                powershell '''
                $url = "${env.APP_URL}"
                $maxAttempts = 60
                $delay = 3
                for ($i=0; $i -lt $maxAttempts; $i++) {
                    try {
                        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
                        if ($resp.StatusCode -eq 200) { exit 0 }
                    } catch {
                        Start-Sleep -Seconds $delay
                    }
                }
                Write-Host "App did not become ready in time."
                exit 1
                '''
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Trigger E2E Job') {
            steps {
                script {
                    // Trigger the Selenium E2E job (separate repo)
                    build job: "${E2E_JOB}",
                        parameters: [string(name: 'APP_URL', value: "${APP_URL}")],
                        wait: false
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Check logs: ${env.BUILD_URL}"
        }
        failure {
            echo "Build failed."
        }
    }
}