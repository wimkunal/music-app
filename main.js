song = "";
song_2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY =0;


left_wrist_score = 0;
right_wrist_score = 0;
song1_status = "";
song2_status = "";

function preload(){
    song = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3")
}

//creating canvas 
function setup(){
    canvas = createCanvas(600,500);
    canvas

    video = createCapture(VIDEO);
    video.hide();
 //initializing  poseNet model
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Pose Net Is initialized")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        
        left_wrist_score = results[0].pose.keypoints[9].score;
        right_wrist_score = results[0].pose.keypoints[10].score;
        console.log(" right_wrist_score = " + right_wrist_score + "left_wrist_score" + left_wrist_score );

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX = "+ leftWristX +  " leftWristY = " +  leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(" rightWristX = "+rightWristX +  " rightWristY = " + rightWristY);

        

    } 
}


 
function draw(){
    image (video,0,0,600,500);

    
    fill ("#FF0000");
    stroke ("#FF0000");

    song1_status = song.isPlaying();
    song2_status = song_2.isPlaying();
  
    if(right_wrist_score > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song.stop();

		if(song2_status == false)
		{
			song_2.play();
			document.getElementById("lbl_song_name").innerHTML = "Playing - music2";
		}
	}

if(left_wrist_score > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song_2.stop();

		if(song1_status == false)
		{
			song.play();
			document.getElementById("lbl_song_name").innerHTML = "Playing - music1";
		}
	}
    }
   




