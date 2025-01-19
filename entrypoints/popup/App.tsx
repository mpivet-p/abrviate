import { useState, useEffect } from 'react';
import { storage } from '@wxt-dev/storage';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PowerLogo from "@/components/ui/PowerLogo"
import './App.css';

function App() {
  // const [count, setCount] = useState<number>(0);
  const [shortsOnOff, setShortsOnOff] = useState<boolean>(false);
  const [renderStatus, setRenderStatus] = useState<boolean>(false);
  const [extStatus, setExtStatus] = useState<boolean>(true);

  useEffect(() => {

    storage.getItem('local:shortsOnOff').then((storedShortsOnOff) => {
      if (typeof storedShortsOnOff === 'boolean') {
        setShortsOnOff(storedShortsOnOff);
      }
    });

    storage.getItem('local:extStatus').then((storedExtStatus) => {
      if (typeof storedExtStatus === 'boolean') {
        setExtStatus(storedExtStatus);
      }
    });
  }, []);

  const creditsLeft: number = 7;
  const userEmail: string = 'test@example.com';
  const hoursSaved: number = 4.787;

  const handlePowerLogoClick = (): void => {
    const newExtStatus: boolean = !extStatus;

    setExtStatus(newExtStatus);
    storage.setItem('local:extStatus', !extStatus);
  };

  const handleSwitchChange = (): void => {
    setRenderStatus(true);
    const newShortsOnOff = !shortsOnOff;
    setShortsOnOff(newShortsOnOff);
    storage.setItem('local:shortsOnOff', newShortsOnOff);
  };
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-2">Abrviate</h1>
      <div className='flex flex-col items-center justify-center p-4 size-25 mx-auto'>
          <PowerLogo className={"logo" + (extStatus ? ' logo-hue' : '')} onClick={handlePowerLogoClick}/>
      </div>
      <div id='credits-left' className="text-lg py-2">
          <Badge>{creditsLeft}</Badge> credits left
          <Button variant='link' className='text-zinc-800 text-lg'>Top up</Button>
      </div>
      <div className="flex items-center space-x-2 pb-4">
        <Label htmlFor="shortsOnOff" className="text-lg">Disable YT Shorts</Label>
        <Switch
          id="shortsOnOff"
          onCheckedChange={handleSwitchChange}
          checked={shortsOnOff}
          renderStatus={renderStatus}
        />
      </div>
      <div id='hours-saved' className="flex items-center space-x-2 text-lg py-2">
        {Math.round(hoursSaved * 10) / 10} hours saved since last week!
      </div>
      <footer>
        <div id='account' className="flex justify-between">
          <div id='logout'>Logout</div>
          <div id='user'>{userEmail}</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
