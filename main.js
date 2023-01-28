song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload(){
    song = loadSound("infinity.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("red");

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        removed_decimal = floor(InNumberleftWristY);
        volume = removed_decimal/500;
        document.getElementById("volume").innerHTML = "volume = "+volume;
        song.setVolume(volume);
    }

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("pose net is started");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+leftWristX);
        console.log("Left wrist y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+rightWristX);
        console.log("Right wrist y = "+rightWristY);
    }
}
