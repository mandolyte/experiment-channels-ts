import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';
import channels from 'channels-js';
//import timeoutWatcher from './timeout-watcher';

function App() {
  const [value, setValue] = React.useState(<CircularProgress/>);
/*
  function getRandomArbitrary(min: number, max:number) {
    return Math.random() * (max - min) + min;
  }
*/
  let bufferedChannel = new channels.BufferedChannel(5);
  let list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven',
      'eight', 'nine', 'ten', '11', '12'];
  let copylist: string[] = [];

  async function write() {
    for (let v of list) {
        console.log("write():", v);
        await bufferedChannel.write(v);
    }
  }

  async function read() {
    for (let i=0; i < list.length; i++) {
      let data = await bufferedChannel.read();
      copylist.push(data);
      
      const randomTimeout = Math.floor(Math.random() * 10000);
      setTimeout(() => {
        console.log("time out")
      }, randomTimeout);    
    }
    console.log("done reading");
  }

  write();
  read();
  

  useEffect(() => {
    console.log("list/copylist lengths:", copylist.length, list.length)
    if (copylist && list) {
      if ( copylist.length === list.length ) {
        const fetchData = async () => {
          try {
            console.log("write/read done");
            let longString = copylist.join();
            setValue(
              <div> {longString} </div>
            );
      
          } catch (error) {
            setValue(
              <div>
                {error.message}
              </div>
            )
            return;
          }
        };
        fetchData();
      }  
    }
  }, [copylist, list]);

  return (
    <div className="App">
      {value}
    </div>
  );
}

export default App;
