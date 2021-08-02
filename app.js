const
startbutton=document.querySelector('.start-button'),
stopbutton=document.querySelector('.stop-button'),
resetbutton=document.querySelector('.reset-button');


function format(digit){
    return digit>9?digit:'0'+digit;
}

var counter={
    count:0,
    backcount:0,
    starttime:null,
    intervalid:null,
    counterdiv:document.querySelector('h3.counter'),
    displayValue:function(){
        let count=(this.count+this.backcount)/1000;
        let hours=Math.floor(count/3600);
        let minutes=Math.floor( ( count-(hours*3600) ) / 60 );
        let seconds=Math.floor( count- (minutes*60) - (hours*3600) );

        return `${hours>0?format(hours)+':':''}${format(minutes)}:${format(seconds)}`;
    },
    update:function(){
        this.counterdiv.textContent=this.displayValue();
    },
    clear:function(){
        clearInterval(this.intervalid);
    }
}


startbutton.onclick=function(){
    this.disabled = true;
    counter.clear();
    counter.starttime=Date.now();
   
    function updateCount(){
          let timepassed=Date.now()-counter.starttime;  
          counter.count=timepassed;
          counter.update();  
    }
    counter.intervalid=setInterval(updateCount,1000);
}

stopbutton.onclick=function(){
    startbutton.disabled = false;
    counter.backcount+=counter.count;
    counter.clear();
    counter.count = 0;
}

resetbutton.onclick=function(){
    startbutton.disabled = false;
     counter.clear();
    counter.backcount=counter.count=0;
    counter.update();
}

