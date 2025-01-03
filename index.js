import ffmpeg from 'fluent-ffmpeg'
import 'dotenv/config'
import moment from 'moment'
import fs from 'node:fs'

fs.mkdirSync(process.env.OUTPUT_PATH, { recursive: true });

function startProcess() {
    ffmpeg()
    .input(process.env.INPUT_PATH)
    .output(`${process.env.OUTPUT_PATH}/${moment().format()}.mp4`)
    .outputOptions('-t', '00:00:05')
    .on('start', (commandLine) => {
        console.log(`FFmpeg command: ${commandLine}`)  
    })
    .on('end', () => {
        console.log('Recording finished.')
        startProcess()
    })
    .on('error', (err) => {
        console.error('Error occurred: ' + err.message)
    })
    .run()
}

startProcess()