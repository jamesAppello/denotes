let swDOM = document.getElementById('stopwatch');
let hours = 00;
let minutes = 00;
let seconds = 00;
let milli = 00;
let swon; //stopwatch on/off
// these are for appending the stopwatch time (counting+)&&for::zero'd out
var hh = document.getElementById('hh').textContent = hours;
var mm = document.getElementById('mm').textContent = minutes;
var ss = document.getElementById('ss').textContent = seconds;
var msms = document.getElementById('msms').textContent = milli;
function run() {
    if (!swon)
    {   // engage the stopwatch if not running & onlick->setTo: true
        swon = setInterval(begin, 0.00000001); //feto x 10E-2
    }
}
function begin() {
    swDOM.textContent = (hh < 10 ? "0" + hh : hh)
    + " : " + (mm < 10 ? "0" + mm : mm) + " : " 
    + (ss < 10 ? "0" + ss : ss) + " . " 
    + (msms < 10 ? "0" + msms : msms);
    msms++;
    if(msms == 100)
    { msms=0; ss++; };
    if(ss == 60)
    { ss=0; mm++; };
    if (mm == 60)
    { mm=0; hh++; }
};

let lapRounds = 0;
var lapsDiv = document.getElementById('laps'); 
var lapCounter = document.getElementById('counter');
let circuits = []; // HOLDS THE STOP-TIMES
let intervals = new LinkedList(); // HOLDS THE INTERVAL-LAP TIMES
function lap()
{ 
    // amount of laps increments
    lapRounds++;
    var tdata = { hours: hh, minutes: mm, seconds: ss, milliSeconds: msms };

    intervals.add(tdata);
    // console.log(intervals.showList());

    lapCounter.textContent = "Amount of Intervals: "+lapRounds; // have text update
    let lapitem = document.createElement('p');
    let timeSnap = `IntTime_${hh}:${mm}:${ss}.${msms}`; // time - to - string
    lapitem.className = 'lap-item';
    lapitem.innerHTML = timeSnap;
    lapitem.style.marginRight = "10px";
    lapitem.style.padding = "4px";
    lapitem.style.borderRadius = '1em';
    lapitem.style.backgroundColor = '#fff';
    lapsDiv.appendChild(lapitem);
};





// this is for adding the STOP_TIMES to the div('purple')
let receiptElement = document.getElementById('ra');
function timeReceiptPrint()
{
    var circElem = document.createElement('p'); // 'circuit Element' == STOP TIME(s)
    circElem.className = "receipt";
    circElem.style.marginRight = '8px'
    circElem.style.padding = '4px';
    circElem.style.borderRadius = '1em';
    circElem.style.backgroundColor = '#fff';
    circuits.map((c, idx) => {
        let {hours, minutes, seconds, milliSec} = c;
        var tString = `${hours} : ${minutes} : ${seconds}.${milliSec}`;
        circElem.innerHTML ="LapCount("+lapRounds+")"+ tString;
    });
    receiptElement.appendChild(circElem);
}




let cstop = false;
let notecount = 0
function createCircuit() {
    cstop = true
    notecount++
    if (cstop)
    {
        let newcirc = new TCircuit(hh, mm, ss, msms, lapRounds);
        circuits.push(newcirc);
        cstop = false;
    }
}
// get the dom-element where we will set the splits
var splitr = document.getElementById('splits');
// get delement where ratio will get appeded to
var rdiv = document.getElementById('rs');
var slower = 0, faster = 0, BAL = 0;
function setSplit()
{
    intervals.showList().forEach(e => {
        const {element, next} = e;
        if (!next) { 
            return ('end of list');
        } else {
            // if number > 1 :: MORE TIME (slower)
            // if number < 0 :: LESS TIME (faster)
            var split_h = next.element.hours - element.hours;
            if (split_h > 0) { slower++; };
            if (split_h < 0) { faster++; };
            
            var split_m = next.element.minutes - element.minutes;
            if (split_m > 0) { slower++; };
            if (split_m < 0) { faster++; };
            
            var split_s = next.element.seconds - element.seconds
            if (split_s > 0) { slower++; };
            if (split_s < 0) { faster++; };
            
            var split_ms = next.element.milliSeconds - element.milliSeconds;
            if (split_ms > 0) { slower++; };
            if (split_ms < 0) { faster++; };
    
            BAL = faster-slower;
            // create the individual split elements
            var split_item = document.createElement('p');
            split_item.className = 'split-item';
            split_item.style.marginRight = '8px'
            split_item.style.padding = '4px';
            split_item.style.borderRadius = '0.75em';
            split_item.style.backgroundColor = '#f46';
            split_item.style.borderStyle = 'outset';
            split_item.innerHTML = `${split_h} : ${split_m} : ${split_s} . ${split_ms}`;
            splitr.appendChild(split_item);  
        };
    });
    console.log({ duck:slower, rabbit:faster, elmer:BAL });
    function upPerDown(u,d,o) { // ratio::how many faster per slowside++
        var uod = u/d;
        var invOff1 = (1/(-1*(o)));
        return((-1*(uod))*invOff1);
    }
    function downPerUp(d, u, o){ // ratio::how many slower per fastside++
        var dou = d/u;
        var invOff2 =(1/(-1*(o)));
        return((-1*(dou))*invOff2);
    }
    var timesTillFast = upPerDown(slower, faster, BAL);
    var timesTillSlow = downPerUp(faster, slower, BAL);
    var ratio = timesTillFast + timesTillSlow;
    
    // create an element to set the ratio to the DOM
    var splitRatio = document.createElement('p');
    splitRatio.style.padding = '4px';
    splitRatio.style.backgroundColor = 'black';
    splitRatio.style.color = 'gold';
    splitRatio.style.fontWeight = 'bolder';
    splitRatio.textContent = ( ratio + (1 + (3.14*0.618)) );
    rdiv.appendChild(splitRatio);   
}
function stop()
{ 
    clearInterval(swon);
    createCircuit();
    setSplit(); // splits work... ({ devNote: 'logs to the console/lap-press->onClick('stop-button')' })
    timeReceiptPrint(); // appends the time when you press stop to the DOM
    swon = false;
    msms = 0;
    ss = 0;
    mm = 0;
    hh = 0; 
    notecount = 0;
};