function Dreamscene(opt){
	opt = opt || {};

	this.bg = $('#background');
	this.minLength = 30000;
	
	if (opt.inOrder){
		this.playType = 'inOrder';
		this.index = 0;
	}
	else if (opt.name){
		this.playType = "named";
		this.index = this.getVideoIndexByName(opt.name);
		if (!this.index){
			console.log('could not find named video, playing random');
			this.playType = 'random';
		}	
	}
	else {
		this.playType = 'random';
		this.getNextVideo();
	}

	if (opt.playAll && this.playType !== 'named'){
		this.playAll = true;
	}

	if (opt.minLength && typeof opt.minLength === typeof 1){
		this.minLength = opt.minLength;
	}
	
	this.play(true);
}

Dreamscene.prototype.play = function(begin){
	if (!begin){
		var pthis = this;
		//this.bg.get(0).pause();//might make things run a little smoother during fades, looks less cool though
		this.bg.parent().animate({'opacity':'0'},3000,function(){//CSS3 didn't work so we're doing it the old way
			pthis.playHelper(begin);
		});
	}
	else this.playHelper(begin);
}

Dreamscene.prototype.playHelper = function(begin){
	if (!begin){
		this.removeAllSources();
		this.bg.parent().animate({'opacity' : '1'},3000);
	}
	console.log("playing '"+dreamsceneList[this.index].name+"'");
	this.addSource(dreamsceneList[this.index].name);
	//this.bg.get(0).play();//same here

	if (this.playAll) {
		var pthis = this;
		var duration = Math.ceil(this.minLength / dreamsceneList[this.index].duration)*dreamsceneList[this.index].duration

		setTimeout(function(){
			pthis.play()
		},duration);

		this.getNextVideo();
	}
}

Dreamscene.prototype.addSource = function(source,encoding){
	var s = $('<source/>');
	s.attr('src','video/'+source);
	if (encoding) s.attr('encoding',encoding);
	this.bg.append(s);
}

Dreamscene.prototype.removeAllSources = function(){
	$('source',this.bg).remove();
}

Dreamscene.prototype.getNextVideo = function(){
	if (this.order == 'inOrder') this.index = (this.index+1)%dreamsceneList.length;
	else this.index = Math.floor(Math.random()*dreamsceneList.length);
}

Dreamscene.prototype.getVideoIndexByName = function(name){
	for (var i = 0; i < dreamsceneList.length; i++){
		if (dreamsceneList[i].name == name) return i;
	}
	return undefined;
}


//MODIFY HERE TO CHANGE SETTINGS
$(function(){
	//var d = new Dreamscene();
	//var d = new Dreamscene({name : "some_name.wmv"});
	var d = new Dreamscene({playAll : true});
	//var d = new Dreamscene({playAll : true, inOrder : true, minLength : 50000});
});