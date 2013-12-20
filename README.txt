This is an HTML5 Video Mint Desktop Manager (MDM) theme for Linux.
I hacked up the eOS theme that comes with mdm-themes to use HTML5 video tags to display what were called "dreamscenes" for Windows 7 (they go by a few names now, but basically just high-resolution looping videos).

in order to display your own dreamscenes, put them in the video/ folder, and reference them in js/dreamsceneList.js like in the example. If you don't care about having perfect loops, list the duration as 1.

you have four options for playing dreamscenes, which can be accessed at the bottom of dreamscene.js:

1. play a random dreamscene for the duration of the login screen. this is accomplished by not passing anything to the Dreamscene constructor (which is not default, default is 3)

2. play a named dreamscene for the duration of the login screen. this is accomplished by passing the ops argument {name : "whatever_name.wmv"} to the Dreamscene constructor

3. play all dreamscenes randomly for at least a minimum duration. The default duration is 30 seconds, and can be omitted; otherwise, your opts would look like {playAll : true, minLength : 50000}

4. play all scenes in the order they appear (which is why theyre in a list), for at least a certain duration. This is accomplished with the opts {playAll : true, inOrder : true};

have fun!

This should be shared under the same CC license the eOS theme is, which I can't find for the life of me right now

in order to install this neme, you need to pack it into a .tar.gz and install using mdm-setup
