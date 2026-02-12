"use client";

import * as React from 'react';

// Configuration for Breakpoints
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

type DeviceType = "mobile" | "tablet" | "desktop" | "ultrawide";
type Orientation = "portrait" | "landscape";
type InputType = "mouse" | "touch";

interface DeviceIntelligence {
  deviceType: DeviceType;
  orientation: Orientation;
  inputType: InputType;
  isOnline: boolean;
  batteryLevel: number | null;
  isLowPowerMode: boolean;
}

export function useDeviceIntelligence(): DeviceIntelligence {
  // Default State (Server Side Safe)
  const [info, setInfo] = React.useState<DeviceIntelligence>({
    deviceType: "desktop",
    orientation: "landscape",
    inputType: "mouse",
    isOnline: true,
    batteryLevel: 100,
    isLowPowerMode: false,
  });

  React.useEffect(() => {
    // 1. Resize Handler (Screen Size & Orientation)
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let device: DeviceType = "ultrawide";
      if (width < BREAKPOINTS.mobile) device = "mobile";
      else if (width < BREAKPOINTS.tablet) device = "tablet";
      else if (width < BREAKPOINTS.desktop) device = "desktop";

      const orient = width > height ? "landscape" : "portrait";

      setInfo(prev => ({ ...prev, deviceType: device, orientation: orient }));
    };

    // 2. Input Detection (Touch vs Mouse)
    const handleInputCheck = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setInfo(prev => ({ ...prev, inputType: isTouch ? "touch" : "mouse" }));
    };

    // 3. Network Status
    const handleNetwork = () => {
      setInfo(prev => ({ ...prev, isOnline: navigator.onLine }));
    };

    // 4. Battery Status (Advanced AI Feature)
    // AI will know if you are running out of power!
    const initBattery = async () => {
      try {
        // @ts-ignore (Battery Manager type is experimental)
        const battery = await navigator.getBattery();
        
        const updateBattery = () => {
          setInfo(prev => ({
            ...prev, 
            batteryLevel: Math.floor(battery.level * 100),
            isLowPowerMode: battery.level < 0.2 && !battery.charging // < 20% Battery = Low Power
          }));
        };
        
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      } catch (e) {
        console.warn("Battery Status API not supported");
      }
    };

    // Initial Calls
    handleResize();
    handleInputCheck();
    handleNetwork();
    initBattery();

    // Event Listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('online', handleNetwork);
    window.addEventListener('offline', handleNetwork);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', handleNetwork);
      window.removeEventListener('offline', handleNetwork);
    };
  }, []);

  return info;
}
